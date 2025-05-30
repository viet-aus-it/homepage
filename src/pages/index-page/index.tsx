import Footer from '@/components/footer';
import Hero from '@/components/hero';
import JoinCommunityCTA from '@/components/join-community-cta';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import SectionWithImage from '@/components/ui/section-with-image';

function IndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-dark-gray">
      {/* Navigation Bar */}
      <header className="w-full px-4 py-4 bg-white shadow-sm sticky top-0 z-10">
        <nav className="max-w-6xl mx-auto">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="#hero">Home</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#knowledge">Knowledge Sharing</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#networking">Networking Events</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#growth">Professional Growth</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#join">Join</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 bg-white">
        <div id="hero">
          <Hero title="Empowering Vietnamese-Australians." subtitle="Supporting IT professionals across Australia." />
        </div>
        <div id="knowledge">
          <SectionWithImage
            title="Knowledge Sharing"
            description="Access and contribute to a growing library of resources, talks, and articles from Vietnamese-Australian IT professionals."
            imageSrc="https://placehold.co/400"
            imageAlt="People sharing knowledge at a tech event"
            reverse={false}
          />
        </div>
        <div id="networking">
          <SectionWithImage
            title="Networking Events"
            description="Connect with peers at regular meetups, webinars, and conferences designed to foster collaboration and community."
            imageSrc="https://placehold.co/400"
            imageAlt="Networking event with people talking and connecting"
            reverse={true}
          />
        </div>
        <div id="growth">
          <SectionWithImage
            title="Professional Growth"
            description="Advance your career with mentorship, workshops, and opportunities tailored for Vietnamese-Australian IT professionals."
            imageSrc="https://placehold.co/400"
            imageAlt="Professional growth and mentorship opportunities"
            reverse={false}
          />
        </div>
        <div id="join">
          <JoinCommunityCTA />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default IndexPage;
