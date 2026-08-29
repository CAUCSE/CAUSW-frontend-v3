import { STORE_BADGE_LINKS, StoreBadgeLink } from '@/features/landing';

export const LandingStoreCTA = () => {
  return (
    <div className="flex w-62 gap-2">
      {STORE_BADGE_LINKS.map((link) => (
        <StoreBadgeLink key={link.href} {...link} />
      ))}
    </div>
  );
};
