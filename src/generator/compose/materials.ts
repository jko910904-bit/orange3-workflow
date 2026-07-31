import type { DesignContract, DesignSurface } from "@/generator/designContract";
import {
  classifyArchetype,
  classifyDomain,
  suggestSurface,
} from "./classify";
import type {
  ActionCardSpec,
  DomainId,
  FaqItemSpec,
  FilterFieldSpec,
  LayoutMaterials,
  MetricSpec,
  NoticeRow,
  ProductCardSpec,
  ProfileSpec,
  ToolbarAction,
} from "./types";

function takeFilters(
  fields: FilterFieldSpec[],
  filterCols: number,
): FilterFieldSpec[] {
  const n = Math.max(2, Math.min(filterCols, fields.length));
  return fields.slice(0, n);
}

/** Repeat/expand seed items to fill one page of `pageSize` rows. */
function takePageSize<T>(seed: T[], pageSize: number, map: (item: T, index: number) => T): T[] {
  const size = Math.max(1, pageSize);
  const out: T[] = [];
  for (let i = 0; i < size; i++) {
    out.push(map(seed[i % seed.length]!, i));
  }
  return out;
}

function productCatalogMaterials(
  filterCols: number,
  _cardCols: number,
  pageSize: number,
): Partial<LayoutMaterials> {
  const filterFields = takeFilters(
    [
      {
        id: "name",
        label: "상품명",
        kind: "text",
        placeholder: "상품명 검색",
      },
      {
        id: "category",
        label: "카테고리",
        kind: "select",
        options: ["전체", "전자기기", "생활", "패션", "식품"],
      },
      {
        id: "status",
        label: "판매상태",
        kind: "select",
        options: ["전체", "판매중", "품절", "판매중지"],
      },
      {
        id: "period",
        label: "등록일",
        kind: "date",
      },
      {
        id: "sku",
        label: "상품코드",
        kind: "text",
        placeholder: "SKU-",
      },
    ],
    filterCols,
  );

  const productSeed: ProductCardSpec[] = [
    {
      id: "PRD-10482",
      name: "무선 이어폰 Pro",
      category: "전자기기",
      price: "129,000",
      status: "판매중",
      imageLabel: "이어폰",
      wishlisted: false,
    },
    {
      id: "PRD-10501",
      name: "세라믹 머그 세트",
      category: "생활",
      price: "28,000",
      status: "품절임박",
      imageLabel: "머그",
      wishlisted: true,
    },
    {
      id: "PRD-10544",
      name: "린넨 셔츠",
      category: "패션",
      price: "49,000",
      status: "품절",
      imageLabel: "셔츠",
      wishlisted: false,
    },
    {
      id: "PRD-10590",
      name: "콜드브루 원액",
      category: "식품",
      price: "16,500",
      status: "판매중",
      imageLabel: "원액",
      wishlisted: false,
    },
    {
      id: "PRD-10612",
      name: "데스크 램프",
      category: "생활",
      price: "67,000",
      status: "판매중지",
      imageLabel: "램프",
      wishlisted: true,
    },
    {
      id: "PRD-10640",
      name: "가죽 노트북 파우치",
      category: "패션",
      price: "58,000",
      status: "판매중",
      imageLabel: "파우치",
      wishlisted: false,
    },
  ];

  const products = takePageSize(productSeed, pageSize, (p, i) => ({
    ...p,
    id: `PRD-${10482 + i}`,
    name: i < productSeed.length ? p.name : `${p.name} ${i + 1}`,
  }));

  return {
    title: "상품 목록",
    description: "상품을 검색·필터하고 그리드 또는 목록으로 살펴봅니다.",
    primaryCta: "조회",
    filterFields,
    columns: [
      { key: "id", label: "상품코드" },
      { key: "name", label: "상품명" },
      { key: "category", label: "카테고리" },
      { key: "price", label: "가격", align: "right" },
      { key: "status", label: "상태", badge: "status" },
    ],
    rows: products.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      status: p.status ?? "판매중",
    })),
    products,
    totalCount: 128,
    sortOptions: ["추천순", "최신순", "낮은가격", "높은가격"],
    toolbarActions: [
      { id: "view-grid", label: "그리드", variant: "secondary" },
      { id: "view-list", label: "목록", variant: "ghost" },
    ],
    navLabel: "상품",
  };
}

function memberMaterials(
  filterCols: number,
  pageSize: number,
): Partial<LayoutMaterials> {
  const filterFields = takeFilters(
    [
      {
        id: "name",
        label: "회원명",
        kind: "text",
        placeholder: "이름 검색",
      },
      {
        id: "role",
        label: "역할",
        kind: "select",
        options: ["전체", "관리자", "일반", "게스트"],
      },
      {
        id: "status",
        label: "상태",
        kind: "select",
        options: ["전체", "정상", "휴면", "탈퇴"],
      },
      {
        id: "joined",
        label: "가입일",
        kind: "date",
      },
    ],
    filterCols,
  );

  const toolbarActions: ToolbarAction[] = [
    { id: "create", label: "생성", variant: "primary" },
    { id: "edit", label: "수정", variant: "secondary" },
    { id: "delete", label: "삭제", variant: "danger" },
  ];

  const memberSeed = [
    {
      id: "U-20481",
      name: "김민수",
      role: "관리자",
      email: "minsoo@example.com",
      status: "정상",
      joinedAt: "2025-11-02",
    },
    {
      id: "U-20502",
      name: "이서연",
      role: "일반",
      email: "seoyeon@example.com",
      status: "정상",
      joinedAt: "2026-01-14",
    },
    {
      id: "U-20533",
      name: "박준호",
      role: "일반",
      email: "junho@example.com",
      status: "휴면",
      joinedAt: "2024-08-19",
    },
    {
      id: "U-20561",
      name: "최유진",
      role: "게스트",
      email: "yujin@example.com",
      status: "정상",
      joinedAt: "2023-03-01",
    },
  ];

  const rows = takePageSize(memberSeed, pageSize, (row, i) => ({
    ...row,
    id: `U-${20481 + i}`,
    name: i < memberSeed.length ? row.name : `${row.name}${i + 1}`,
    email:
      i < memberSeed.length
        ? row.email
        : `user${i + 1}@example.com`,
  }));

  return {
    title: "회원 관리",
    description: "회원을 검색·필터링하고 상태를 관리합니다.",
    primaryCta: "조회",
    filterFields,
    columns: [
      { key: "id", label: "회원ID" },
      { key: "name", label: "이름" },
      { key: "role", label: "역할", badge: "role" },
      { key: "email", label: "이메일" },
      { key: "status", label: "상태", badge: "status" },
      { key: "joinedAt", label: "가입일" },
    ],
    rows,
    totalCount: 1_284,
    sortOptions: ["가입일 최신", "가입일 오래된", "이름순"],
    toolbarActions,
    navLabel: "회원관리",
  };
}

function contractMaterials(
  filterCols: number,
  pageSize: number,
): Partial<LayoutMaterials> {
  const filterFields = takeFilters(
    [
      {
        id: "company",
        label: "기업명",
        kind: "text",
        placeholder: "기업명",
      },
      {
        id: "type",
        label: "고객구분",
        kind: "select",
        options: ["전체", "대기업", "공공", "중견"],
      },
      {
        id: "status",
        label: "처리현황",
        kind: "select",
        options: ["전체", "운영반영", "작성중", "접수대기"],
      },
      {
        id: "period",
        label: "접수일자",
        kind: "date",
      },
    ],
    filterCols,
  );

  return {
    title: "신청계약조회",
    description: "신청·계약 건을 조회합니다.",
    primaryCta: "조회",
    filterFields,
    columns: [
      { key: "company", label: "기업명" },
      { key: "type", label: "고객구분" },
      { key: "contractNo", label: "계약관리번호" },
      { key: "dept", label: "관리부서" },
      { key: "status", label: "처리현황", badge: "status" },
      { key: "appliedAt", label: "접수일" },
    ],
    rows: takePageSize(
      [
        {
          company: "A사",
          type: "대기업",
          contractNo: "CT-20240512-0182",
          dept: "공공사업부",
          status: "운영반영",
          appliedAt: "2025-05-12",
        },
        {
          company: "B사",
          type: "공공",
          contractNo: "CT-20240518-0191",
          dept: "금융사업부",
          status: "작성중",
          appliedAt: "2025-05-18",
        },
        {
          company: "C사",
          type: "대기업",
          contractNo: "CT-20240521-0203",
          dept: "공공사업부",
          status: "운영반영",
          appliedAt: "2025-05-21",
        },
      ],
      pageSize,
      (row, i) => ({
        ...row,
        company:
          i < 3 ? row.company : `${row.company.replace("사", "")}${i + 1}사`,
        contractNo: `CT-202405${String(12 + (i % 18)).padStart(2, "0")}-${String(182 + i).padStart(4, "0")}`,
      }),
    ),
    totalCount: 190,
    sortOptions: ["접수일 최신", "접수일 오래된"],
    toolbarActions: [
      { id: "create", label: "생성", variant: "primary" },
      { id: "export", label: "내보내기", variant: "secondary" },
    ],
    navLabel: "계약관리",
  };
}

function orderMaterials(
  filterCols: number,
  pageSize: number,
): Partial<LayoutMaterials> {
  const filterFields = takeFilters(
    [
      {
        id: "orderNo",
        label: "주문번호",
        kind: "text",
        placeholder: "ORD-",
      },
      {
        id: "status",
        label: "주문상태",
        kind: "select",
        options: ["전체", "결제완료", "배송중", "완료", "취소"],
      },
      {
        id: "period",
        label: "주문일",
        kind: "date",
      },
      {
        id: "buyer",
        label: "주문자",
        kind: "text",
      },
    ],
    filterCols,
  );

  return {
    title: "주문 관리",
    description: "주문을 조회하고 처리 상태를 확인합니다.",
    primaryCta: "조회",
    filterFields,
    columns: [
      { key: "orderNo", label: "주문번호" },
      { key: "buyer", label: "주문자" },
      { key: "items", label: "상품수", align: "right" },
      { key: "amount", label: "결제금액", align: "right" },
      { key: "status", label: "상태", badge: "status" },
      { key: "orderedAt", label: "주문일" },
    ],
    rows: takePageSize(
      [
        {
          orderNo: "ORD-260728-01",
          buyer: "김민수",
          items: "3",
          amount: "86,400",
          status: "배송중",
          orderedAt: "2026-07-28",
        },
        {
          orderNo: "ORD-260727-14",
          buyer: "이서연",
          items: "1",
          amount: "129,000",
          status: "결제완료",
          orderedAt: "2026-07-27",
        },
        {
          orderNo: "ORD-260726-08",
          buyer: "박준호",
          items: "2",
          amount: "44,500",
          status: "완료",
          orderedAt: "2026-07-26",
        },
      ],
      pageSize,
      (row, i) => ({
        ...row,
        orderNo: `ORD-2607${String(28 - (i % 28)).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`,
        buyer: i < 3 ? row.buyer : `${row.buyer}${i + 1}`,
      }),
    ),
    totalCount: 412,
    sortOptions: ["주문일 최신", "금액 높은순"],
    toolbarActions: [
      { id: "create", label: "생성", variant: "primary" },
      { id: "export", label: "내보내기", variant: "secondary" },
    ],
    navLabel: "주문관리",
  };
}

function genericListMaterials(
  filterCols: number,
  pageSize: number,
): Partial<LayoutMaterials> {
  const filterFields = takeFilters(
    [
      { id: "keyword", label: "검색어", kind: "text", placeholder: "검색" },
      {
        id: "status",
        label: "상태",
        kind: "select",
        options: ["전체", "진행", "완료", "대기"],
      },
      { id: "period", label: "기간", kind: "date" },
    ],
    filterCols,
  );

  return {
    title: "목록 조회",
    description: "조건을 지정해 목록을 조회합니다.",
    primaryCta: "조회",
    filterFields,
    columns: [
      { key: "id", label: "ID" },
      { key: "name", label: "항목" },
      { key: "status", label: "상태", badge: "status" },
      { key: "updatedAt", label: "수정일" },
    ],
    rows: takePageSize(
      [
        {
          id: "IT-001",
          name: "항목 A",
          status: "진행",
          updatedAt: "2026-07-20",
        },
        {
          id: "IT-002",
          name: "항목 B",
          status: "대기",
          updatedAt: "2026-07-22",
        },
        {
          id: "IT-003",
          name: "항목 C",
          status: "완료",
          updatedAt: "2026-07-25",
        },
      ],
      pageSize,
      (row, i) => ({
        ...row,
        id: `IT-${String(i + 1).padStart(3, "0")}`,
        name: i < 3 ? row.name : `항목 ${i + 1}`,
      }),
    ),
    totalCount: 48,
    sortOptions: ["최신순", "이름순"],
    toolbarActions: [
      { id: "create", label: "생성", variant: "primary" },
    ],
    navLabel: "관리",
  };
}

function listByDomain(
  domain: DomainId,
  filterCols: number,
  pageSize: number,
): Partial<LayoutMaterials> {
  switch (domain) {
    case "product":
      return productCatalogMaterials(filterCols, 3, pageSize);
    case "member":
      return memberMaterials(filterCols, pageSize);
    case "contract":
      return contractMaterials(filterCols, pageSize);
    case "order":
      return orderMaterials(filterCols, pageSize);
    default:
      return genericListMaterials(filterCols, pageSize);
  }
}

function hubMaterials(): Partial<LayoutMaterials> {
  const profile: ProfileSpec = {
    name: "김민수",
    email: "minsoo@example.com",
    grade: "VIP",
    avatarInitial: "김",
  };
  const metrics: MetricSpec[] = [
    { label: "보유 포인트", value: "12,480", delta: "+320" },
    { label: "진행 중 주문", value: "2", delta: "" },
    { label: "쿠폰", value: "5", delta: "+1" },
    { label: "알림", value: "3", delta: "" },
  ];
  const cards: ActionCardSpec[] = [
    {
      title: "프로필",
      description: "이름·연락처·프로필 사진을 관리합니다.",
      action: "프로필 보기",
    },
    {
      title: "활동 내역",
      description: "최근 로그인·리뷰·문의 활동을 확인합니다.",
      action: "활동 보기",
    },
    {
      title: "주문·배송",
      description: "최근 주문과 배송 상태를 확인합니다.",
      action: "주문 보기",
    },
    {
      title: "설정",
      description: "알림·언어·표시 설정을 변경합니다.",
      action: "설정",
    },
    {
      title: "알림",
      description: "시스템·마케팅 알림함을 확인합니다.",
      action: "알림함",
    },
    {
      title: "관심 상품",
      description: "저장한 상품과 재입고 알림을 관리합니다.",
      action: "관심 상품",
    },
    {
      title: "보안",
      description: "비밀번호·2단계 인증·로그인 기기를 관리합니다.",
      action: "보안 설정",
    },
  ];

  return {
    title: "마이페이지",
    description: "내 현황을 보고 다음 작업을 고릅니다.",
    primaryCta: "바로가기",
    metrics,
    cards,
    profile,
    filterFields: [],
    columns: [],
    rows: [],
    totalCount: 0,
    navLabel: "마이페이지",
  };
}

function authMaterials(): Partial<LayoutMaterials> {
  return {
    title: "로그인",
    description: "아이디와 비밀번호로 로그인합니다.",
    primaryCta: "로그인",
    filterFields: [],
    columns: [],
    rows: [],
    totalCount: 0,
    metrics: [],
    cards: [],
    navLabel: "로그인",
  };
}

function noticeListMaterials(pageSize: number): Partial<LayoutMaterials> {
  const totalCount = 128;
  const noticeSeed: NoticeRow[] = [
    {
      no: "128",
      title: "7월 시스템 점검 안내",
      date: "2026-07-28",
      pinned: true,
      tags: ["중요", "점검"],
      author: "운영팀",
      category: "시스템",
    },
    {
      no: "127",
      title: "개인정보 처리방침 개정 안내",
      date: "2026-07-20",
      tags: ["정책"],
      author: "법무팀",
      category: "안내",
    },
    {
      no: "126",
      title: "여름 프로모션 일정 안내",
      date: "2026-07-14",
      tags: ["이벤트"],
      author: "마케팅",
      category: "이벤트",
    },
    {
      no: "125",
      title: "고객센터 운영시간 변경",
      date: "2026-07-01",
      tags: ["안내"],
      author: "고객지원",
      category: "안내",
    },
  ];

  const notices = takePageSize(noticeSeed, pageSize, (item, i) => ({
    ...item,
    no: String(totalCount - i),
    title: i < noticeSeed.length ? item.title : `공지사항 ${totalCount - i}`,
    pinned: i === 0,
    date: `2026-07-${String(Math.max(1, 28 - (i % 27))).padStart(2, "0")}`,
  }));

  return {
    title: "공지사항",
    description: "공지를 검색하고 목록에서 확인합니다.",
    primaryCta: "검색",
    filterFields: [
      {
        id: "q",
        label: "검색",
        kind: "text",
        placeholder: "제목·내용 검색",
      },
    ],
    columns: [],
    rows: [],
    totalCount,
    metrics: [],
    cards: [],
    notices,
    navLabel: "공지사항",
  };
}

function noticeDetailMaterials(): Partial<LayoutMaterials> {
  return {
    title: "공지사항 상세",
    primaryCta: "목록",
    filterFields: [],
    columns: [],
    rows: [],
    totalCount: 0,
    metrics: [],
    cards: [],
    notices: [],
    detail: {
      title: "7월 시스템 점검 안내",
      meta: "2026-07-28 · 운영팀 · 시스템",
      body: [
        "안정적인 서비스 제공을 위해 아래 일정으로 시스템 점검을 진행합니다.",
        "점검 시간: 2026-07-31 02:00 ~ 05:00",
        "점검 중에는 로그인·주문·문의 기능이 일시 중단될 수 있습니다.",
        "이용에 불편을 드려 죄송하며, 완료 후 정상 서비스로 복구됩니다.",
      ],
      attachment: "점검_안내_2026-07.pdf",
    },
    navLabel: "공지사항",
  };
}

function faqMaterials(pageSize: number): Partial<LayoutMaterials> {
  const totalCount = 48;
  const faqSeed: FaqItemSpec[] = [
    {
      question: "비밀번호를 잊어버렸어요.",
      answer:
        "로그인 화면의 비밀번호 재설정을 통해 이메일로 재설정 링크를 받을 수 있습니다.",
    },
    {
      question: "주문 취소는 어떻게 하나요?",
      answer:
        "마이페이지 > 주문·배송에서 결제완료 상태인 주문만 취소할 수 있습니다.",
    },
    {
      question: "배송은 얼마나 걸리나요?",
      answer:
        "영업일 기준 1~3일 이내 출고되며, 도서산간은 추가일이 소요될 수 있습니다.",
    },
    {
      question: "영수증은 어디서 받나요?",
      answer:
        "주문 상세의 영수증 발급에서 카드·현금영수증을 요청할 수 있습니다.",
    },
  ];

  const faqItems = takePageSize(faqSeed, pageSize, (item, i) => ({
    ...item,
    question:
      i < faqSeed.length ? item.question : `자주 묻는 질문 ${i + 1}`,
  }));

  return {
    title: "자주하는 질문",
    description: "키워드로 답을 찾거나 카테고리별로 훑어보세요.",
    primaryCta: "검색",
    filterFields: [
      {
        id: "q",
        label: "검색",
        kind: "text",
        placeholder: "질문을 입력하세요",
      },
    ],
    columns: [],
    rows: [],
    totalCount,
    metrics: [],
    cards: [],
    popularFaq: faqSeed.slice(0, 3),
    faqItems,
    notices: [],
    navLabel: "FAQ",
  };
}

/**
 * Turn prompt + DesignContract into concrete layout materials
 * (filters, columns, metrics…) — the ingredients for composition.
 */
export function resolveMaterials(
  prompt: string,
  contract: DesignContract,
): LayoutMaterials {
  const archetype = classifyArchetype(prompt);
  const domain = classifyDomain(prompt, archetype);
  const surface = suggestSurface(archetype, contract.surface);
  const filterCols = contract.columnHints.filterCols;
  const cardCols = contract.columnHints.cardCols;
  const pageSize = contract.pageSize;

  const base: LayoutMaterials = {
    archetype,
    domain,
    surface,
    title: "화면",
    primaryCta: "확인",
    filterFields: [],
    columns: [],
    rows: [],
    totalCount: 0,
    metrics: [],
    cards: [],
    faqItems: [],
    popularFaq: [],
    notices: [],
    products: [],
    sortOptions: [],
    toolbarActions: [],
    navLabel: "메뉴",
  };

  let partial: Partial<LayoutMaterials> = {};
  switch (archetype) {
    case "list-inquiry":
      partial = listByDomain(domain, filterCols, pageSize);
      break;
    case "product-catalog":
      partial = productCatalogMaterials(filterCols, cardCols, pageSize);
      break;
    case "dashboard-hub":
      partial = hubMaterials();
      break;
    case "auth":
      partial = authMaterials();
      break;
    case "content-list":
      partial = noticeListMaterials(pageSize);
      break;
    case "content-detail":
      partial = noticeDetailMaterials();
      break;
    case "faq-accordion":
      partial = faqMaterials(pageSize);
      break;
    default:
      partial = {
        title: "지원하지 않는 요청",
        description:
          "로그인 / 상품·회원 목록 / 마이페이지 / 공지 / FAQ 예시로 다시 요청해 주세요.",
      };
  }

  return {
    ...base,
    ...partial,
    archetype,
    domain,
    surface,
  };
}

/** Suggest surface from prompt alone (setup prefill). */
export function suggestSurfaceFromPrompt(prompt: string): DesignSurface {
  return suggestSurface(classifyArchetype(prompt));
}
