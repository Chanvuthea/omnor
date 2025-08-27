import React, { useMemo } from "react";

interface MasonryProps {
  children: React.ReactNode;
  columnCount?: number;
  gap?: number;
  className?: string;
  maxItemHeight?: number;
}

const maxItemHeight = innerHeight < 720 ? 280 : 480;

function Masonry({
  children,
  columnCount = 2,
  gap = 16,
  className = "",
}: MasonryProps) {
  return (
    <div
      className={className}
      style={{ columnCount, columnGap: gap } as React.CSSProperties}
    >
      {React.Children.map(children, (child, i) => (
        <div
          key={i}
          className="break-inside-avoid mb-4 inline-block w-full align-top"
          style={
            {
              marginBottom: gap,
              maxHeight: maxItemHeight,
              overflow: "hidden",
            } as React.CSSProperties
          }
        >
          {child}
        </div>
      ))}
    </div>
  );
}

interface Item {
  id: number;
  h: number;
}

function useRandomItems(count: number): Item[] {
  return useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i + 1,
        h: Math.floor(Math.random() * (maxItemHeight - 180 + 1)) + 180, // Random height between 180 and 280
      })),
    [count]
  );
}
export default function MasonryTwoColumnDemo({ photoBoothUrls }: any) {
  const items = useRandomItems(photoBoothUrls.length - 1);

  return (
    <Masonry
      columnCount={2}
      gap={16}
      maxItemHeight={maxItemHeight}
      className={"md:w-1/2 w-full"}
    >
      {items.map((item) => (
        <div
          key={item.id}
          style={{ height: item.h } as React.CSSProperties}
          className="bg-amber-50/50 w-full rounded-xl ring-1 ring-black/5"
          aria-label={`Random-height block ${item.id}`}
        >
          <img
            src={photoBoothUrls[item.id - 1]?.image}
            alt={""}
            className="h-full w-full object-cover rounded-xl"
          />
        </div>
      ))}
    </Masonry>
  );
}
