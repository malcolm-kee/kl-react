import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import sharp from "sharp";

interface Speaker {
  id: string;
  name: string;
  image?: string;
  github?: string;
}

interface ImageEntry {
  sm: string;
  lg: string;
}

type ImageManifest = Record<string, ImageEntry>;

const ROOT = process.cwd();
const SPEAKER_YML = path.join(ROOT, "src", "data", "speaker.yml");
const OUT_DIR = path.join(ROOT, "public", "images", "speakers");
const MANIFEST_PATH = path.join(ROOT, "src", "data", "image-manifest.json");

const SM_SIZE = 80; // 2x for 40px avatars
const LG_WIDTH = 640; // 2x for 320px speaker cards
const LG_HEIGHT = 768; // 2x for 384px max-h

function getImageUrl(speaker: Speaker): string | null {
  if (speaker.image) return speaker.image;
  if (speaker.github) return `https://github.com/${speaker.github}.png`;
  return null;
}

async function downloadImage(url: string): Promise<Buffer> {
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": "kl-react-build" },
  });
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: ${res.status}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

async function processSpeaker(
  speaker: Speaker,
  url: string
): Promise<ImageEntry | null> {
  const smPath = path.join(OUT_DIR, `${speaker.id}-sm.webp`);
  const lgPath = path.join(OUT_DIR, `${speaker.id}-lg.webp`);

  try {
    console.log(`  Downloading ${speaker.id} (${url})`);
    const buffer = await downloadImage(url);

    await Promise.all([
      sharp(buffer)
        .resize(SM_SIZE, SM_SIZE, { fit: "cover" })
        .webp({ quality: 80 })
        .toFile(smPath),
      sharp(buffer)
        .resize(LG_WIDTH, LG_HEIGHT, { fit: "cover", withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(lgPath),
    ]);

    return {
      sm: `/images/speakers/${speaker.id}-sm.webp`,
      lg: `/images/speakers/${speaker.id}-lg.webp`,
    };
  } catch (err) {
    console.warn(`  WARN: Failed to process ${speaker.id}: ${err}`);
    return null;
  }
}

async function main() {
  console.log("Optimizing speaker images...\n");

  const speakers: Speaker[] = parse(
    fs.readFileSync(SPEAKER_YML, "utf-8")
  );

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const manifest: ImageManifest = {};
  const concurrency = 5;

  for (let i = 0; i < speakers.length; i += concurrency) {
    const batch = speakers.slice(i, i + concurrency);
    const results = await Promise.all(
      batch.map((speaker) => {
        const url = getImageUrl(speaker);
        if (!url) {
          console.log(`  Skipping ${speaker.id} (no image)`);
          return null;
        }
        return processSpeaker(speaker, url);
      })
    );

    for (let j = 0; j < batch.length; j++) {
      const result = results[j];
      if (result != null) {
        manifest[batch[j].id] = result;
      }
    }
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");

  const count = Object.keys(manifest).length;
  console.log(`\nDone! Optimized ${count} speaker images.`);
  console.log(`  Output: ${OUT_DIR}`);
  console.log(`  Manifest: ${MANIFEST_PATH}`);
}

main().catch((err) => {
  console.error("Image optimization failed:", err);
  process.exit(1);
});
