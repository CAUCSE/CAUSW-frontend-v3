import { REPORT_REASON, ReportReason } from '@/entities/report';

export const REPORT_OPTIONS: Record<
  ReportReason,
  { label: string; confirm: { title: string; description: string } }
> = {
  [REPORT_REASON.SPAM_AD]: {
    label: '낚시/놀림/도배',
    confirm: {
      title: '낚시/놀림/도배',
      description: '중복글, 도배글, 낚시글, 내용 없는 게시물인가요?',
    },
  },
  [REPORT_REASON.ABUSE_LANGUAGE]: {
    label: '욕설/비하',
    confirm: {
      title: '욕설/비하',
      description:
        '비아냥, 비속어 등 예의범절에 벗어나거나, 특정인이나 단체, 지역을 비방하는 등 논란 및 분란을 일으킬 수 있는 게시물인가요?',
    },
  },
  [REPORT_REASON.COMMERCIAL_AD]: {
    label: '상업적 광고 및 판매',
    confirm: {
      title: '상업적 광고/판매',
      description:
        '타 서비스, 앱, 사이트 등 게시판 외부로 회원을 유도하거나 허가되지 않은 홍보성 게시물인가요?',
    },
  },
  [REPORT_REASON.INAPPROPRIATE_CONTENT]: {
    label: '음란물/불건전한 만남 및 대화',
    confirm: {
      title: '음란물/불건전한 만남 및 대화',
      description:
        '청소년유해매체물, 외설, 음란물, 신체사진을 포함하거나, 불건전한 만남을 위한 게시물인가요?',
    },
  },
  [REPORT_REASON.FRAUD_IMPERSONATION]: {
    label: '유출/사칭/사기',
    confirm: {
      title: '유출/사칭/사기',
      description:
        '타인의 개인정보 유출, 관리자 사칭 등 관련법에 위배되는 게시물인가요?',
    },
  },
  [REPORT_REASON.POLITICAL_CONTENT]: {
    label: '정당/정치인 비하 및 선거운동',
    confirm: {
      title: '정치 관련 비하/선거운동',
      description:
        '특정 정당/정치인을 비난/비하하거나 선거 관련법에 위배되는 게시물인가요?',
    },
  },
  [REPORT_REASON.ILLEGAL_VIDEO]: {
    label: '불법촬영물 등 유통',
    confirm: {
      title: '불법촬영물/불법 유통',
      description: '불법촬영물, 허위영상물 등 관련법에 위반되는 게시물인가요?',
    },
  },
  [REPORT_REASON.OFF_TOPIC]: {
    label: '게시판 성격에 맞지 않음',
    confirm: {
      title: '주제 이탈',
      description: '해당 게시판의 주제나 목적과 맞지 않는 게시물인가요?',
    },
  },
} as const;
