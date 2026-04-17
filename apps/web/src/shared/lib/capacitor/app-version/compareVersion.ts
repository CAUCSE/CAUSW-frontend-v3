export function compareSemver(current: string, minimum: string): number {
  const currentParts = current.split('.').map((v) => Number(v));
  const minimumParts = minimum.split('.').map((v) => Number(v));

  const maxLength = Math.max(currentParts.length, minimumParts.length);

  for (let i = 0; i < maxLength; i += 1) {
    const currentValue = currentParts[i] ?? 0;
    const minimumValue = minimumParts[i] ?? 0;

    if (currentValue > minimumValue) return 1;
    if (currentValue < minimumValue) return -1;
  }

  return 0;
}
