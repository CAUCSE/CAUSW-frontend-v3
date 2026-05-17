export const getValidAlumniContactsSocialLinkUrl = (socialLink: string) => {
  try {
    const url = new URL(socialLink.trim());

    if (url.protocol !== 'https:') {
      return null;
    }

    return url;
  } catch {
    return null;
  }
};
