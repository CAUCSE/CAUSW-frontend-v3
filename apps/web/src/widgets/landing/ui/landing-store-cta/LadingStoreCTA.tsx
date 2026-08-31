import { STORE_BADGE_LINKS, StoreBadgeLink } from '@/features/landing';

interface LandingStoreCTAProps {
  placement: 'closing_cta' | 'hero';
}

export const LandingStoreCTA = ({ placement }: LandingStoreCTAProps) => {
  return (
    <div className="flex w-62 gap-2">
      {STORE_BADGE_LINKS.map((link) => (
        <StoreBadgeLink key={link.href} placement={placement} {...link} />
      ))}
    </div>
  );
};
