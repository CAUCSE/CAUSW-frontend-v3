'use client';

import { Fragment, useCallback, useMemo } from 'react';

import { POST_LINKIFIED_REGEX } from '@/entities/post/config';

const { URL_SPLIT, URL_TEST, TRAILING_PUNCTUATION } = POST_LINKIFIED_REGEX;
interface UseLinkifiedTextProps {
  content: string;
  isHtml: boolean;
}

export const useLinkifiedText = ({
  content,
  isHtml,
}: UseLinkifiedTextProps) => {
  const normalizeHref = useCallback((url: string) => {
    return url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `https://${url}`;
  }, []);

  const trimTrailingPunctuation = useCallback((url: string) => {
    const trailingPunctuation = url.match(TRAILING_PUNCTUATION)?.[0] ?? '';
    const cleanUrl = trailingPunctuation
      ? url.slice(0, -trailingPunctuation.length)
      : url;

    return {
      cleanUrl,
      trailingPunctuation,
    };
  }, []);

  const linkifiedContent = useMemo(() => {
    if (isHtml) {
      return null;
    }

    return content.split(URL_SPLIT).map((part, index) => {
      if (!URL_TEST.test(part)) {
        return part;
      }

      const { cleanUrl, trailingPunctuation } = trimTrailingPunctuation(part);

      return (
        <Fragment key={index}>
          <a
            href={normalizeHref(cleanUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {cleanUrl}
          </a>
          {trailingPunctuation}
        </Fragment>
      );
    });
  }, [content, isHtml, normalizeHref, trimTrailingPunctuation]);

  return {
    linkifiedContent,
  };
};
