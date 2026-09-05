'use client';

import Image from 'next/image';

import { motion } from 'motion/react';

import { trackLandingEvent } from '../../lib';

interface StoreBadgeLinkProps {
  id: 'app_store' | 'google_play';
  href: string;
  src: string;
  alt: string;
  placement: 'closing_cta' | 'hero';
}

export const StoreBadgeLink = ({
  id,
  href,
  src,
  alt,
  placement,
}: StoreBadgeLinkProps) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackLandingEvent('landing_store_click', {
          placement,
          store: id,
        })
      }
      whileTap={{ scale: 0.9 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
      }}
    >
      <Image src={src} alt={alt} width={120} height={44} />
    </motion.a>
  );
};
