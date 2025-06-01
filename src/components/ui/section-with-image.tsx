import type React from 'react';
import { Badge } from './badge';

/**
 * SectionWithImage is designed to create visually balanced, flexible content blocks that highlight key information alongside a supporting image.
 *
 * Use this component to:
 * - Draw attention to important sections with a strong visual and textual pairing
 * - Alternate image/text alignment for visual rhythm and engagement
 * - Support additional content (e.g., actions, links) in a consistent layout
 *
 * The 'reverse' prop enables alternating layouts for better scanning ability and to avoid visual monotony.
 */
export interface SectionWithImageProps {
  /**
   * Used for anchor navigation and section identification, enabling deep linking and accessibility.
   */
  sectionId: string;
  /**
   * Conveys the main message or focus of the section, helping users quickly understand the section's purpose.
   */
  title: string;
  /**
   * Provides supporting context or detail, encouraging users to engage with the section's content.
   */
  description: string;
  /**
   * Visual reinforcement for the section's message, making the content more memorable and engaging.
   */
  imageSrc: string;
  /**
   * Ensures accessibility and SEO by describing the image's purpose or content.
   */
  imageAlt: string;
  /**
   * Alternates the layout to keep the page visually interesting and avoid repetitive patterns.
   */
  reverse?: boolean;
  /**
   * Allows for extensibility, such as adding actions or extra details below the description.
   */
  children?: React.ReactNode;
}

/**
 * General section with image and text, supporting left/right alignment.
 */
function SectionWithImage({ sectionId, title, description, imageSrc, imageAlt, reverse = false, children }: SectionWithImageProps) {
  // The order classes enable alternating layouts for visual rhythm and to prevent monotony on long pages.
  const textOrder = reverse ? 'md:order-2' : 'md:order-1';
  const imageOrder = reverse ? 'md:order-1' : 'md:order-2';

  return (
    <section id={sectionId} className="mx-auto max-w-screen-lg px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-16">
        <div className={`max-w-lg md:max-w-none ${textOrder}`}>
          <Badge variant="secondary" className="mb-4">{`#${sectionId}`}</Badge>
          <h2 className="text-2xl font-semibold text-brand-yellow-dark sm:text-3xl">{title}</h2>
          <p className="mt-4 text-gray-700">{description}</p>
          {children}
        </div>
        <div className={imageOrder}>
          <img src={imageSrc} alt={imageAlt} className="w-full h-auto rounded" />
        </div>
      </div>
    </section>
  );
}

export default SectionWithImage;
