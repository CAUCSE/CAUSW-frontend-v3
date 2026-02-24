export const REPORT_OPTIONS = {
  option1: {
    label: '낚시/놀림/도배',
    confirm: {
      title: '낚시/놀림/도배',
      description: '중복글, 도배글, 낚시글, 내용 없는 게시물인가요?',
    },
  },
  option2: {
    label: '욕설/비하',
    confirm: {
      title: '욕설/비하',
      description:
        '비아냥, 비속어 등 예의범절에 벗어나거나, 특정인이나 단체, 지역을 비방하는 등 논란 및 분란을 일으킬 수 있는 게시물인가요?',
    },
  },
  option3: {
    label: '상업적 광고 및 판매',
    confirm: {
      title: '상업적 광고/판매',
      description:
        '타 서비스, 앱, 사이트 등 게시판 외부로 회원을 유도하거나 공동구매, 할인쿠폰, 홍보성 이벤트 등 허가되지 않은 광고/홍보 게시물인가요?',
    },
  },
  option4: {
    label: '음란물/불건전한 만남 및 대화',
    confirm: {
      title: '음란물/불건전한 만남 및 대화',
      description:
        '청소년유해매체물, 외설, 음란물, 음담패설, 신체사진을 포함하거나, 불건전한 만남, 채팅, 대화, 통화를 위한 게시물인가요?',
    },
  },
  option5: {
    label: '유출/사칭/사기',
    confirm: {
      title: '유출/사칭/사기',
      description:
        '게시물 무단 유출, 타인의 개인정보 유출, 관리자 사칭 등 타인의 권리를 침해하거나 관련법에 위배되는 게시물인가요?',
    },
  },
  option6: {
    label: '정당/정치인 비하 및 선거운동',
    confirm: {
      title: '정치 관련 비하/선거운동',
      description:
        '특정 정당/정치인을 비난/비하/모욕하거나 지지/홍보/선거운동 및 선거 관련법에 위배되는 게시물인가요?',
    },
  },
  option7: {
    label: '불법촬영물 등 유통',
    confirm: {
      title: '불법촬영물/불법 유통',
      description:
        '불법촬영물, 허위영상물, 아동·청소년 성착취물 등 관련법에 위반되는 게시물인가요?',
    },
  },
} as const;
