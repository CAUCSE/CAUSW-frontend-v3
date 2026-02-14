// shared/ui/responsive.tsx
import { ComponentProps } from 'react';

import { mergeStyles, Primitive } from '@causw/cds';

/**
 * Tailwind breakpoints 기준:
 * - Mobile: < md
 * - Desktop: >= md
 *
 * asChild=true면 wrapper DOM을 만들지 않고 child에 className을 주입합니다.
 */

interface ResponsiveProps extends ComponentProps<'div'> {
  asChild?: boolean;
}

/** < md 에서만 보이게 */
export function IsMobile({ className, ...props }: ResponsiveProps) {
  return (
    <Primitive.div
      className={mergeStyles('block md:hidden', className)}
      {...props}
    />
  );
}

/** >= md 에서만 보이게 */
export function IsDesktop({ className, ...props }: ResponsiveProps) {
  return (
    <Primitive.div
      className={mergeStyles('hidden md:block', className)}
      {...props}
    />
  );
}
