'use client';
import { useRouter } from 'next/navigation';
// TODO : capacitor 앱 테스트를 위한 임시 버튼 생성 -> 해당 페이지 생성 후에 삭제 필요
export default function Home() {
  const router = useRouter();
  return (
    <div>
      <h1>동문 네트워크 - 재학생</h1>
      <button
        onClick={() => router.push('./home')}
        className="h-30 w-60 rounded-xl bg-yellow-300"
      >
        /home으로 이동
      </button>
    </div>
  );
}
