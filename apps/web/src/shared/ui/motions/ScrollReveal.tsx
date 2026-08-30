import { type PropsWithChildren } from 'react';

import { motion } from 'motion/react';

interface ScrollRevealProps extends PropsWithChildren {
  playOnce?: boolean;
  className?: string;
}

export function ScrollReveal({
  children,
  playOnce = false,
  className,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        delay: 0.5,
        stiffness: 120,
        damping: 18,
      }}
      viewport={{
        amount: 0.2,
        once: playOnce,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
