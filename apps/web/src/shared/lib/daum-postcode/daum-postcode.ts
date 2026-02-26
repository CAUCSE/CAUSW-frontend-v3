const DAUM_POSTCODE_SCRIPT =
  '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

export const loadDaumPostcode = (): Promise<void> =>
  new Promise((resolve) => {
    if ((window as unknown as Record<string, unknown>).daum) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = DAUM_POSTCODE_SCRIPT;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
