'use client';

import { useRouter } from 'next/navigation';

import { toast } from '@/shared/model';

// TODO : capacitor 앱 테스트를 위한 임시 버튼 생성 -> 해당 페이지 생성 후에 삭제 필요
export default function Page() {
  const router = useRouter();
  return (
    <div>
      <h1>동문 네트워크 - 재학생</h1>
      <button
        onClick={() => router.push('/auth/sign-in/email')}
        className="h-30 w-60 rounded-xl bg-yellow-300"
      >
        /home으로 이동
      </button>

      <button
        onClick={() => toast.success('신고가 접수되었어요', { duration: 5000 })} // duration 디폴트는 3000
        className="h-30 w-60 rounded-xl bg-green-300"
      >
        Success Toast
      </button>
    </div>
  );
}
