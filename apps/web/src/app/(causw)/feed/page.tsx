'use client';

import { useRouter } from 'next/navigation';

import { FloatingActionButton, HStack, Plus } from '@causw/cds';

export default function Page() {
  const router = useRouter();

  return (
    <div>
      커뮤니티 메인, 게시글 목록
      <FloatingActionButton
        onClick={() => router.push('/feed/write')}
        className="shadow-[0_4px_4px_0_rgba(0,0,0,0.04)]"
      >
        <HStack gap="xs" className="items-center">
          <Plus />
          글쓰기
        </HStack>
      </FloatingActionButton>
    </div>
  );
}
