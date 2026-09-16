import React from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import { ScreenshotItem } from '@/data/caseStudies';

interface ProjectScreenshotGalleryProps {
  screenshots: ScreenshotItem[];
}

export function ProjectScreenshotGallery({
  screenshots,
}: ProjectScreenshotGalleryProps) {
  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  const isPortrait = screenshots[0]?.aspectRatio === '9/16';

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 font-mono text-xs text-[#C8FF00] tracking-wider uppercase font-semibold">
          <Camera className="w-3.5 h-3.5" />
          <span>INTERFACE GALLERY</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F5F0E8]">
          Production Interface & Interactions
        </h2>
        <p className="text-sm sm:text-base text-[#9E988F] max-w-3xl leading-relaxed">
          Direct captures from running native builds demonstrating core user flows, playback controllers, and responsive layout states.
        </p>
      </div>

      {/* Gallery Grid */}
      <div
        className={
          isPortrait
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "grid grid-cols-1 lg:grid-cols-2 gap-6"
        }
      >
        {screenshots.map((item, idx) => (
          <figure
            key={item.src}
            className="group rounded-2xl bg-[#0D0D0D] border border-[rgba(245,240,232,0.08)] p-4 sm:p-5 space-y-4 hover:border-[rgba(245,240,232,0.22)] transition-all overflow-hidden flex flex-col justify-between"
          >
            {/* Image Box */}
            <div
              className={`relative w-full rounded-xl overflow-hidden bg-[#070707] border border-[rgba(245,240,232,0.06)] ${
                isPortrait ? 'aspect-[9/16]' : 'aspect-[16/9]'
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                sizes={
                  isPortrait
                    ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    : '(max-width: 1024px) 100vw, 50vw'
                }
              />
            </div>

            {/* Caption */}
            <figcaption className="space-y-1 pt-1">
              <div className="font-mono text-[10px] text-[#68635B] uppercase tracking-wider">
                CAPTURE // 0{idx + 1}
              </div>
              <p className="text-xs text-[#9E988F] leading-relaxed font-normal">
                {item.caption}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
