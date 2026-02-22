import { BellColored } from '@causw/cds';

interface CeremonyEmptyViewProps {
  message?: string;
}

export const CeremonyEmptyView = ({
  message = '곧 다가올 경조사가 없어요',
}: CeremonyEmptyViewProps) => (
  <div className="flex flex-col items-center gap-4 rounded-xl bg-white py-14">
    {/* TODO: CDS에 gray 버전 아이콘 추가 시 교체 */}
    <BellColored size={52} className="opacity-50 grayscale" />
    <span className="typo-body-14-medium text-gray-400">{message}</span>
  </div>
);
