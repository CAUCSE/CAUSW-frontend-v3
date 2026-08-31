'use client';

import Image from 'next/image';

import { motion } from 'motion/react';

interface StoreBadgeLinkProps {
  href: string;
  src: string;
  alt: string;
}

export const StoreBadgeLink = ({ href, src, alt }: StoreBadgeLinkProps) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
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
