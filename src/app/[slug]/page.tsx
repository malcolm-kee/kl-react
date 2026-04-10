import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Link } from "@/components/link";
import { Note } from "@/components/note";
import { ReactClinicDrawing } from "@/components/react-clinic-drawing";

const contentDir = path.join(process.cwd(), "src", "content", "pages");

const mdxComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link to={props.href ?? "#"} {...props} />
  ),
  ReactClinicDrawing,
};

interface ContentFrontmatter {
  title: string;
  description?: string;
  image?: string;
}

function getContentFiles(): { slug: string; filePath: string }[] {
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => ({
      slug: f.replace(/\.mdx?$/, ""),
      filePath: path.join(contentDir, f),
    }));
}

interface SlugPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return getContentFiles().map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const file = getContentFiles().find((f) => f.slug === slug);
  if (!file) return {};

  const source = fs.readFileSync(file.filePath, "utf-8");
  const { frontmatter } = await compileMDX<ContentFrontmatter>({
    source,
    options: { parseFrontmatter: true },
  });

  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export default async function ContentPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const file = getContentFiles().find((f) => f.slug === slug);
  if (!file) notFound();

  const source = fs.readFileSync(file.filePath, "utf-8");
  const { content, frontmatter } = await compileMDX<ContentFrontmatter>({
    source,
    components: mdxComponents,
    options: { parseFrontmatter: true },
  });

  return (
    <Note title={frontmatter.title}>
      {content}
    </Note>
  );
}
