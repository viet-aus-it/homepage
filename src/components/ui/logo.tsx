export const LOGO_COLOURS = {
  PRIMARY: '#F5DF4D',
  SECONDARY: '#939597',
  DARK_GRAY: '#1C1C1C',
} as const;

type LogoColour = 'colour' | 'gray' | 'dark-gray';
// type LogoText = 'no-text' | 'text'; // Text option is currently not supported
type LogoColourProps = {
  primaryColour: string;
  secondaryColour: string;
};

/**
 * Logo component for VAIT.
 *
 * ## Rationale
 * The `Logo` component acts as a factory for generating the VAIT logo in various visual configurations.
 * This abstraction allows for consistent branding across the site while supporting different use cases
 * (e.g., navigation bar, footer, error pages, or marketing banners) that may require different logo
 * colours.
 *
 * > **Note:** The text option is currently not supported. This component only renders the logo symbol.
 *
 * By centralising logo rendering logic and configuration, we ensure:
 * - Consistent application of brand colours and styles
 * - Easy updates to the logo design or palette in a single place
 * - Type-safe usage via explicit props for colour options
 * - Flexibility to extend or add new logo variants as the brand evolves
 *
 * ## Usage
 * ```tsx
 * // Import the Logo component
 * import Logo from "@/components/ui/logo";
 *
 * // Render the default coloured logo
 * <Logo colour="colour" />
 *
 * // Render a gray logo (e.g., for a muted footer)
 * <Logo colour="gray" />
 *
 * // Render a dark-gray logo (e.g., for dark backgrounds)
 * <Logo colour="dark-gray" />
 *
 * // Pass additional SVG props as needed (e.g., width, height, className)
 * <Logo colour="colour" width={120} height={60} className="mx-auto" />
 * ```
 *
 * @param {Object} props - Component props
 * @param {'colour' | 'gray' | 'dark-gray'} props.colour - Logo colour variant
 * @returns {JSX.Element} The rendered VAIT logo SVG
 */
function Logo(props: React.SVGProps<SVGSVGElement> & { colour: LogoColour }) {
  return <LogoIcon {...props} />;
}

function getLogoColours(colour: LogoColour): LogoColourProps {
  switch (colour) {
    case 'colour':
      return {
        primaryColour: LOGO_COLOURS.PRIMARY,
        secondaryColour: LOGO_COLOURS.SECONDARY,
      };
    case 'gray':
      return {
        primaryColour: LOGO_COLOURS.SECONDARY,
        secondaryColour: LOGO_COLOURS.SECONDARY,
      };
    case 'dark-gray':
      return {
        primaryColour: LOGO_COLOURS.DARK_GRAY,
        secondaryColour: LOGO_COLOURS.SECONDARY,
      };
  }
}

function LogoIcon(props: React.SVGProps<SVGSVGElement> & { colour: LogoColour }) {
  const { primaryColour, secondaryColour } = getLogoColours(props.colour);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 428 264" aria-label="VAIT Logo" {...props}>
      <title>VAIT Logo</title>
      <g clipPath="url(#a)">
        {/* Primary ticks */}
        <path
          fill={primaryColour}
          d="m314.438 126.338 2.238-.113c7.423 1.29 13.039 8.734 18.079 13.796a3809 3809 0 0 1 10.669 10.659q4.078 4.084 8.163 8.161 6.853 6.848 13.696 13.707 7.906 7.92 15.828 15.824 6.81 6.797 13.611 13.605 4.056 4.063 8.12 8.118 3.82 3.811 7.626 7.636 2.062 2.065 4.131 4.123l2.485 2.502 2.158 2.16c3.89 4.41 5.679 8.208 5.883 14.134-1.931 5.772-4.682 9.231-9.063 13.375l-1.642 1.614c-3.925 3.813-5.987 5.209-11.42 5.511l-2.758.219c-7.505-1.73-13.691-10.151-19.002-15.49l-2.25-2.249a7136 7136 0 0 1-7.271-7.288l-5.078-5.082a23859 23859 0 0 1-13.296-13.321q-6.796-6.809-13.595-13.615-13.317-13.333-26.625-26.674c-5.122 4.285-9.904 8.775-14.6 13.519l-2.196 2.205a4159 4159 0 0 0-4.681 4.709 5787 5787 0 0 1-7.416 7.451 22139 22139 0 0 0-21.071 21.176q-6.454 6.494-12.921 12.976a3270 3270 0 0 0-4.911 4.941 2973 2973 0 0 1-6.863 6.893l-2.037 2.064c-7.612 7.596-7.612 7.596-12.585 8.465l-2.219-.024-2.219.024c-5.523-.965-9.178-4.983-12.968-8.836l-1.471-1.447c-4.565-4.59-6.014-7.432-6.303-13.92 1.563-7.442 9.112-13.127 14.231-18.224l3.002-3.013q4.06-4.07 8.132-8.131 4.26-4.256 8.516-8.519 7.143-7.147 14.296-14.285 8.272-8.257 16.527-16.531 7.092-7.106 14.196-14.201 4.242-4.236 8.476-8.479a3320 3320 0 0 1 7.966-7.956q1.464-1.46 2.923-2.926a935 935 0 0 1 3.99-3.978l2.255-2.253c2.892-2.519 5.552-2.89 9.264-3.012M208.125 17.65c6.693 3.202 13.953 9.968 17.293 16.547 1.184 4.107.888 7.37-.293 11.453-1.292 1.86-1.292 1.86-2.956 3.675l-1.923 2.1c-3.904 4.096-7.875 8.118-11.88 12.114l-2.89 2.895q-3.889 3.894-7.784 7.784-4.084 4.08-8.165 8.166-6.843 6.846-13.69 13.685a19368 19368 0 0 0-15.83 15.832q-6.804 6.81-13.613 13.616-4.063 4.06-8.122 8.123-3.808 3.812-7.621 7.616-2.07 2.068-4.136 4.14l-2.476 2.468-2.157 2.155c-2.809 2.608-4.757 2.836-8.507 2.944l-2.547.113c-7.612-1.199-13.26-8.687-18.424-13.856l-2.915-2.894a3381 3381 0 0 1-7.865-7.842l-4.917-4.907q-8.592-8.562-17.167-17.141a7217 7217 0 0 0-15.992-15.94q-6.886-6.848-13.75-13.715-4.094-4.098-8.205-8.178a1650 1650 0 0 1-7.705-7.7 802 802 0 0 0-4.174-4.143C4.12 51.11.262 46.955 0 38.713c1.457-8.115 10.002-14.206 16.125-19.063 2.271-1.135 3.723-1.23 6.25-1.312l2.266-.113c6.775 1.16 11.802 7.47 16.417 12.131l2.338 2.337c2.537 2.539 5.066 5.084 7.596 7.63a10965 10965 0 0 1 17.75 17.802q7.793 7.824 15.594 15.639a35465 35465 0 0 1 27.789 27.886c5.121-4.281 9.895-8.77 14.584-13.518l2.191-2.205a4151 4151 0 0 0 4.671-4.709q3.698-3.73 7.404-7.452a14286 14286 0 0 0 21.038-21.175q6.442-6.497 12.902-12.976 2.454-2.466 4.9-4.941c2.278-2.305 4.566-4.6 6.855-6.893l2.027-2.064c5.699-5.675 11.137-9.493 19.428-8.066Z"
        />
        {/* Secondary ticks */}
        <path
          fill={secondaryColour}
          d="M209.211 127.674c5.63 4.028 11.794 9.736 14.914 15.976.344 2.102.344 2.102.5 4.625l.219 2.477c-1.865 7.518-10.561 13.876-15.93 19.207l-2.393 2.388a4905 4905 0 0 1-5.108 5.091q-4.052 4.034-8.098 8.074-9.32 9.3-18.648 18.591-9.24 9.207-18.471 18.421-3.976 3.964-7.955 7.923l-4.905 4.895-2.214 2.198c-4 4-7.822 8.097-11.506 12.391-1.988 2.293-4.091 4.452-6.241 6.594l-2.234 2.243c-2.986 2.789-5.143 4.222-9.203 4.445-3.912-.145-5.711-.907-8.561-3.569l-2.092-1.932-2.16-2.062-2.126-1.998c-4.803-4.553-9.517-9.197-14.23-13.843a756 756 0 0 0-5.2-5.056 828 828 0 0 1-7.534-7.376l-2.36-2.245c-4.297-4.312-6.424-7.355-6.756-13.516.652-6.226 6.963-11.026 11.206-15.216l1.867-1.89 1.82-1.813 1.637-1.63c2.734-2.311 5.003-3.329 8.551-3.792 7.635.917 12.898 7.911 18 13.125l2.375 2.403q2.882 2.917 5.75 5.847c3.035-1.357 5.123-2.877 7.46-5.232l2.018-2.019 2.18-2.212 2.323-2.331q2.493-2.505 4.981-5.017 3.934-3.97 7.879-7.928a14735 14735 0 0 0 16.722-16.823q9.684-9.757 19.386-19.498 3.889-3.912 7.769-7.833l4.753-4.773 2.187-2.218 2.009-2.01 1.741-1.754c4.144-3.518 10.925-3.66 15.678-1.328M336.125.65c4.117 2.724 7.403 6.21 10.785 9.774q1.486 1.509 2.977 3.012a806 806 0 0 1 7.727 7.958c2.618 2.714 5.269 5.397 7.915 8.085a1814 1814 0 0 1 13.835 14.223c2.773 3.068 3.297 5.582 3.222 9.745-.927 4.433-4.32 7.14-7.461 10.203l-2.621 2.692c-7.95 8.111-7.95 8.111-13.004 8.808-5.81-.155-8.486-3.52-12.375-7.5a1969 1969 0 0 0-3.84-3.804c-3.742-3.71-7.457-7.446-11.16-11.196-3.051 1.363-5.143 2.898-7.491 5.265l-2.039 2.039-2.204 2.236-2.347 2.355a2588 2588 0 0 0-5.035 5.071q-3.98 4.015-7.969 8.017-8.464 8.502-16.915 17.017a15437 15437 0 0 1-19.602 19.714q-3.93 3.953-7.85 7.914l-4.814 4.833-2.204 2.236-2.039 2.039-1.761 1.775c-3.717 3.201-6.73 3.726-11.632 3.853-5.687-.985-9.489-5.478-13.348-9.426l-1.641-1.643c-3.676-3.717-5.287-5.72-5.609-10.92l-.219-2.476c1.881-7.584 10.703-14.017 16.114-19.39l2.451-2.448q2.617-2.61 5.237-5.218 4.152-4.135 8.299-8.276 9.553-9.532 19.113-19.056 9.469-9.436 18.93-18.88a8918 8918 0 0 1 8.154-8.122l5.026-5.016 2.271-2.255c4.051-4.05 7.926-8.194 11.657-12.542 1.844-2.131 3.783-4.145 5.78-6.133l1.988-1.996C326.37-.42 331.06-.488 336.125.65"
        />
        {/* Primary star */}
        <path
          fill={primaryColour}
          d="M43.125 144.65c2.755 2.755 3.474 6 4.625 9.625l2.375 7.375 18-6c-1.632 4.081-3.258 7.175-5.625 10.813l-1.914 2.957-1.461 2.23c3.391 3.892 8.022 5.92 12.48 8.379l2.52 1.621v2c-6.373.746-12.583 1.104-19 1l.438 2.598c.95 5.859 1.838 11.464 1.562 17.402-4.127-3.001-7.17-6.446-10.352-10.39-1.622-1.959-1.622-1.959-4.648-1.61-2.29 1.887-2.29 1.887-4.563 4.313l-2.378 2.426c-2.18 2.282-2.18 2.282-4.059 5.261l-2-1 3-19h-9a135 135 0 0 1-5.563-.5l-2.566-.281-1.871-.219v-2a146 146 0 0 1 7.5-4.625l2.168-1.273q2.661-1.559 5.332-3.102l-3.375-5.312-1.898-2.988a362 362 0 0 0-3.727-5.7l1-3 17 6c1.604-5.219 1.604-5.219 3.2-10.441 1.689-5.447 1.689-5.447 2.8-6.559"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h428v264H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Logo;
