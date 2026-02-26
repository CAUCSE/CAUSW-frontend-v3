'use client';

type KakaoErrorViewProps = {
  message: string;
  onRetry: () => void;
};

export const KakaoErrorView = ({ message, onRetry }: KakaoErrorViewProps) => (
  <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
    <div className="flex h-[72px] w-[72px] items-center justify-center rounded-[24px] bg-gray-100">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" stroke="#9CA3AF" strokeWidth="1.5" />
        <path
          d="M12 7v5M12 16h.01"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>

    <div className="flex flex-col items-center gap-2 text-center">
      <p className="typo-body-16-semibold text-gray-800">로그인에 실패했어요</p>
      <p className="typo-body-14-regular text-gray-500">{message}</p>
    </div>

    <button
      type="button"
      onClick={onRetry}
      className="typo-body-15-semibold h-[50px] w-full max-w-[320px] cursor-pointer rounded-xl bg-[#FEE500] text-[#3A1D1D] transition-opacity hover:opacity-80 active:opacity-70"
    >
      다시 시도하기
    </button>
  </div>
);
