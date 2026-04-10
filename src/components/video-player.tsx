"use client";

import ReactPlayer from "react-player";

interface VideoPlayerProps {
  url: string;
  className?: string;
}

export function VideoPlayer({ url, className }: VideoPlayerProps) {
  return (
    <div className={className} style={{ maxWidth: 800, margin: "0 auto" }}>
      <div className="relative pt-[56.25%] overflow-hidden">
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          controls
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>
    </div>
  );
}
