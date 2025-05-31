import type React from 'react';

/**
 * General section with image and text, supporting left/right alignment.
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {string} props.description - Section description
 * @param {string} props.imageSrc - Main image source
 * @param {string} props.imageAlt - Main image alt text
 * @param {boolean} [props.reverse] - If true, image is on the left and text is on the right
 * @param {React.ReactNode} [props.children] - Optional extra content
 */
function SectionWithImage({
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
  children,
}: {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className="max-w-screen-md w-full mx-auto my-10">
      <div className={`flex flex-col md:flex-row items-center gap-8 ${reverse ? 'md:flex-row-reverse' : ''}`}>
        <div className="flex-1 text-center md:text-left space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-brand-yellow-dark mb-2">{title}</h2>
          <p className="text-brand-gray text-lg mb-2">{description}</p>
          {children}
        </div>
        <div className="flex-1 flex justify-center">
          <img src={imageSrc} alt={imageAlt} className="max-w-xs md:max-w-sm rounded-lg shadow-md" />
        </div>
      </div>
    </section>
  );
}

export default SectionWithImage;
