import { z } from 'zod';

const homeEventSchema = z.object({
  title: z.string().trim().min(1),
  href: z
    .string()
    .trim()
    .url()
    .refine((href) => href.startsWith('https://')),
});

function readHomeEvents() {
  const configuredEvents = process.env.NEXT_PUBLIC_HOME_EVENTS;
  if (!configuredEvents) return [];

  try {
    const events: unknown = JSON.parse(configuredEvents);
    if (!Array.isArray(events)) return [];
    return events.flatMap((event) => {
      const parsed = homeEventSchema.safeParse(event);
      return parsed.success ? [parsed.data] : [];
    });
  } catch {
    return [];
  }
}

export const HOME_EVENTS = readHomeEvents();
