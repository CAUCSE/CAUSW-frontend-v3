import { type PropsWithChildren } from 'react';

import { motion } from 'motion/react';

interface ScrollRevealProps extends PropsWithChildren {
  playOnce?: boolean;
}

export function ScrollReveal({
  children,
  playOnce = false,
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
    >
      {children}
    </motion.div>
  );
}
