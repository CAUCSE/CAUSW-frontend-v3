import type { FindEmailRequestDto } from '../model';

export const normalizeFindEmailRequest = ({
  name,
  phoneNumber,
}: FindEmailRequestDto): FindEmailRequestDto => ({
  name: name.replace(/\s/g, ''),
  phoneNumber: phoneNumber.trim(),
});
