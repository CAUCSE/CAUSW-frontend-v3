'use client';

import Link from 'next/link';

import { ChevronLeft, CloseFilled } from '@causw/cds';

const TERMS_TEXT = [
  '시행일: 202 / 최종개정일: 2026.01.21',
  '',
  '제1조(목적)',
  '본 약관은 크자회(CCSSAA)(이하 "서비스")의 이용과 관련하여, 서비스 운영 주체와 회원 간 권리·의무 및 책임사항, 이용조건 및 절차를 규정함을 목적으로 합니다.',
  '',
  '제2조(운영 주체)',
  '1. 본 서비스는 다음의 공동 운영 주체(이하 "운영체계")가 기획·운영·개발을 위해 구성·운영합니다.',
  '중앙대학교 소프트웨어학부 ICT위원회(개발/DB/보안)',
  '중앙대학교 소프트웨어학부 학생회(운영/관리)',
  '크자회(CCSSAA)(운영/지원)',
  '',
  '2. 운영체계는 서비스 내 관리자 권한을 역할에 따라 차등 부여하여 운영합니다. (최상위 권한은 ICT위원회가 보유)',
  '',
  '제3조(정의)',
  '1. "회원"이란 본 약관에 동의하고 가입 및 인증 절차를 완료하여 서비스를 이용하는 자를 말합니다.',
  '2. "대상자"란 중앙대학교 소프트웨어학부 재학생 및 졸업생을 말합니다.',
  '3. "콘텐츠"란 회원이 서비스에서 작성·등록·업로드·전송·표시하는 모든 정보를 말합니다.',
  '',
  '제4조(약관의 게시 및 개정)',
  '1. 운영체계는 본 약관을 서비스 화면을 통해 게시합니다.',
  '2. 약관을 개정할 경우 적용일 및 개정사유를 명시하여 사전 공지합니다.',
];

export function TermsOfServicePage() {
  return (
    <div className="fixed inset-0 z-[1000] bg-white md:flex md:items-center md:justify-center md:bg-black/50 md:p-6">
      <div className="h-full overflow-y-auto bg-white md:h-auto md:max-h-[90vh] md:w-full md:max-w-[700px] md:rounded-2xl md:bg-gray-100 md:p-8">
        <div className="px-5 py-4 md:hidden">
          <Link
            href="/setting"
            className="typo-subtitle-16-bold flex items-center gap-3 text-gray-700"
          >
            <ChevronLeft size={18} className="fill-gray-700" />
            <span>뒤로</span>
          </Link>
        </div>

        <div className="px-5 pb-10 md:px-0 md:pb-0">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="typo-title-22-bold text-gray-700">
              서비스 이용약관
            </h3>
            <Link href="/setting" className="hidden md:block" aria-label="닫기">
              <CloseFilled size={20} color="gray-600" />
            </Link>
          </div>

          <div className="typo-body-16-regular space-y-4 text-gray-500 md:max-h-[65vh] md:overflow-y-auto md:pr-1">
            {TERMS_TEXT.map((line, idx) => (
              <p key={`${line}-${idx}`}>{line || <span>&nbsp;</span>}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
