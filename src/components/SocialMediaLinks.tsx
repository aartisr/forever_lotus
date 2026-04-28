import { getTopSocialPlatforms } from '@/config/social-media';

type SocialMediaLinksProps = {
  className?: string;
};

export default function SocialMediaLinks({ className = '' }: SocialMediaLinksProps) {
  const platforms = getTopSocialPlatforms();

  return (
    <nav className={className} aria-label="Top social media channels">
      <p className="eyebrow mb-4">Social channels</p>
      <ul className="grid gap-2">
        {platforms.map((platform) => {
          const href = platform.profileUrl ?? platform.homeUrl;
          const destinationLabel = platform.profileUrl
            ? `Open Forever Lotus on ${platform.name}`
            : `Open ${platform.name}`;

          return (
            <li key={platform.id}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={destinationLabel}
                className="group flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-3 transition-all duration-200 hover:border-lotus-gold/30 hover:bg-white/[0.055]"
                data-track={`footer_social_${platform.id}`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-lotus-gold/25 bg-lotus-gold/10 font-mono text-[0.64rem] text-lotus-gold">
                  {platform.rank}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold leading-tight text-lotus-cream group-hover:text-lotus-gold">
                    {platform.name}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-lotus-muted-2">
                    {platform.profileUrl ? 'Forever Lotus' : 'Official site'}
                  </span>
                </span>
                <span className="text-xs text-lotus-muted-2 transition-colors duration-200 group-hover:text-lotus-gold" aria-hidden="true">
                  -&gt;
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
