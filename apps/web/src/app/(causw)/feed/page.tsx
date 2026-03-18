'use client';

import { useRouter } from 'next/navigation';

import { Button, FloatingActionButton, HStack, Plus, Search } from '@causw/cds';

export default function Page() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-gray-100 p-6">
      <div className="mx-auto flex max-w-225 items-center justify-between">
        <h1 className="typo-title-24-bold text-gray-800">커뮤니티</h1>

        <Button
          onClick={() => router.push('/feed/search')}
          className="h-fit w-fit border-none bg-transparent p-0 hover:bg-transparent!"
          aria-label="검색"
        >
          <Search size={20} color="gray-700" />
        </Button>
      </div>

      <div className="mx-auto mt-6 max-w-225 text-gray-500">
        커뮤니티 메인, 게시글 목록
      </div>

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
