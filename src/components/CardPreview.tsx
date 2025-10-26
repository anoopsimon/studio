'use client';

import * as React from 'react';
import Image from 'next/image';
import { CardTemplate } from '@/lib/templates';
import { cn } from '@/lib/utils';

interface CardPreviewProps {
  template: CardTemplate;
  headline: string;
  message: string;
  image: string | null;
}

const CardPreview = React.forwardRef<HTMLDivElement, CardPreviewProps>(
  ({ template, headline, message, image }, ref) => {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-headline text-2xl text-foreground">Live Preview</h2>
        <div
          ref={ref}
          className="aspect-[5/7] w-full max-w-[500px] overflow-hidden rounded-lg bg-card shadow-lg transition-all duration-300"
          style={{ backgroundColor: template.layout.backgroundColor }}
        >
          <div className="flex h-full w-full flex-col">
            <div className={cn("relative h-3/5 w-full", template.layout.imageContainerClass)}>
              {image && (
                <Image
                  src={image}
                  alt="Custom card image"
                  fill
                  className="object-cover"
                  unoptimized={image.startsWith('data:image')}
                />
              )}
            </div>
            <div className={cn("flex h-2/5 flex-col justify-center", template.layout.textContainerClass)} style={{ color: template.layout.textColor }}>
              <h3 className={cn("text-4xl", template.layout.headlineFont)}>{headline}</h3>
              <p className={cn("mt-2 text-lg", template.layout.bodyFont)}>{message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CardPreview.displayName = 'CardPreview';

export default CardPreview;
