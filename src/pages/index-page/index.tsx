import Footer from '@/components/footer';
import Hero from '@/components/hero';
import FuturisticBackground from '@/components/ui/futuristic-background';
import JoinCommunityCTAButton from '@/components/ui/join-community-cta-button';
import NavBar from '@/components/ui/nav-bar';
import SectionWithImage from '@/components/ui/section-with-image';
import { ORGANISATION } from '@/lib/constants';
import { useEffect } from 'react';

interface SectionConfig {
  id: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  reverse?: boolean;
}

const sections: SectionConfig[] = [
  {
    id: 'hero',
    title: 'Empowering Vietnamese Australians IT Professionals',
    description: "Connect, learn, and grow with Australia's leading Vietnamese IT community",
  },
  {
    id: 'knowledge-sharing',
    title: 'Share Knowledge, Build Community',
    description:
      'Connect with experienced professionals and emerging talent. Share insights, solve challenges together, and stay current with the latest technologies shaping our industry.',
    imageSrc: '/images/knowledge-sharing.jpg',
    imageAlt: 'People sharing knowledge at a tech event',
    reverse: false,
  },
  {
    id: 'networking-events',
    title: 'Connect Beyond Code',
    description:
      'Join regular meetups, workshops, and social events designed to strengthen our community bonds. Build lasting professional relationships and discover new opportunities.',
    imageSrc: '/images/connect-beyond-code.jpg',
    imageAlt: 'Networking event with people talking and connecting',
    reverse: true,
  },
  {
    id: 'professional-growth',
    title: 'Advance Your Career',
    description: 'Access career guidance, skill development opportunities, and industry insights from Vietnamese Australian leaders across the tech sector.',
    imageSrc: '/images/advance-career.jpg',
    imageAlt: 'Professional growth and mentorship opportunities',
    reverse: false,
  },
];

function IndexPage() {
  useEffect(() => {
    document.title = `${ORGANISATION.SHORT_NAME} - ${ORGANISATION.NAME}`;
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-brand-dark-gray">
      <FuturisticBackground />

      <NavBar />
      <main className="z-1 flex-1 flex flex-col items-center justify-center px-4 py-8">
        <Hero title={sections[0].title} subtitle={sections[0].description} />

        <section className="w-full max-w-screen-lg bg-white rounded-2xl shadow-md p-8 my-8">
          {sections.slice(1).map((section) => (
            <SectionWithImage
              key={section.id}
              sectionId={section.id}
              title={section.title}
              description={section.description}
              imageSrc={section.imageSrc ?? ''}
              imageAlt={section.imageAlt ?? ''}
              reverse={section.reverse}
            />
          ))}
        </section>

        <JoinCommunityCTAButton />
      </main>

      <Footer />
    </div>
  );
}

export default IndexPage;
