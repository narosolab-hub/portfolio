// ────────────────────────────────────────────────────────────────────────
// 공고별 포트폴리오 버전(Variant) 설정
//
// 기본 링크(`/`)는 아래 어떤 것에도 영향받지 않는 "기본 버전"입니다.
// 공고별 링크는 `/<slug>` 형태이며, 이 파일 VARIANTS에 등록된 slug만
// 열립니다. nav·검색·기본 페이지 어디에도 노출되지 않으므로, 링크(URL)를
// 아는 사람만 접근할 수 있습니다.
//
// 새 공고용 버전을 만들려면: 아래 VARIANTS에 slug 하나를 추가하면 끝.
// 바꾸고 싶은 항목만 적으면 되고, 안 적은 항목은 기본 버전 그대로 나옵니다.
// ────────────────────────────────────────────────────────────────────────

/** Home 페이지를 구성하는 섹션들. 순서·숨김의 기준이 되는 식별자입니다. */
export type SectionId =
  | "hero"
  | "projects"
  | "about"
  | "how"
  | "experience"
  | "tools";

/** 아무 것도 지정하지 않은 기본 버전의 섹션 순서 */
export const DEFAULT_ORDER: SectionId[] = [
  "hero",
  "projects",
  "about",
  "how",
  "experience",
  "tools",
];

export interface Variant {
  /** 관리용 라벨 (어떤 공고인지 알아보기 위한 메모, 화면에는 안 나옴) */
  company: string;

  /** 섹션 나열 순서. 생략하면 DEFAULT_ORDER 사용 */
  order?: SectionId[];

  /** 이 버전에서 숨길 섹션들 */
  hidden?: SectionId[];

  /** Hero(첫 화면) 문구 override — 바꾸고 싶은 줄만 적으면 됨 */
  hero?: {
    /** 상단 작은 라벨. 기본 "프로덕트 기획자 PORTFOLIO" */
    eyebrow?: string;
    /** 큰 제목의 앞부분. 기본 "복잡한 운영 구조를 기획으로 풀어내는" */
    lead?: string;
    /** 강조 텍스트. 기본 "PM 박건주" */
    accent?: string;
    /** 강조 뒤에 붙는 꼬리말. 기본 "입니다." */
    tail?: string;
    /** 제목 아래 소개 문단 */
    body?: string;
  };

  /** About 섹션 문단 override — 문단 배열로 넣으면 기본 3문단을 통째로 대체 */
  about?: {
    paragraphs?: string[];
  };

  /**
   * How I Work(일하는 방식) 카드 override.
   * competencies[i]에 적은 title/body만 i번째 카드에 덮어씁니다(이모지는 유지).
   * 안 바꿀 카드는 빈 객체 {} 로 자리만 채우면 됩니다.
   */
  how?: {
    competencies?: { title?: string; body?: string }[];
  };

  /** Projects 버튼 문구 override */
  projects?: {
    b2b?: { title?: string; desc?: string };
    sub?: { title?: string; desc?: string };
  };
}

export const VARIANTS: Record<string, Variant> = {
  // ── 예시 버전: 포커스미디어 PO ──────────────────────────────────────
  // 실제 지원 시 문구는 공고에 맞게 자유롭게 수정하세요.
  "focus-media": {
    company: "포커스미디어 (Product Owner)",
    order: ["hero", "about", "projects", "how", "experience", "tools"],
    hero: {
      lead: "광고·미디어 플랫폼의 운영 기준을 세우는",
      body:
        "회원·상품·주문·결제·정산까지 커머스 전 영역의 운영 기준을 0 to 1로 설계했습니다. " +
        "광고주·매체·운영팀처럼 이해관계가 엇갈리는 환경에서 정책·데이터·정산 흐름이 서로 " +
        "어긋나지 않도록 기준을 잡아온 경험을, 포커스미디어의 프로덕트에 그대로 적용하고 싶습니다.",
    },
    projects: {
      b2b: {
        desc: "이해관계자가 얽힌 운영 구조를 0 to 1로 재설계",
      },
    },
  },

  // ── 번개장터 (Product Manager, Core Product) ────────────────────────
  // 공고: 탐색 → 등록 → 거래 → 정산 전체 여정 설계 / 기능·정책·시스템의
  // 위계를 이해하는 구조적 사고.
  // 메인 프로젝트가 베타 오픈 전 미완성이므로 '가설→검증→개선(성과)' 대신
  // '흐름을 구조로 바라본다'는 구조 설계 강점으로 포지셔닝합니다.
  "bgzt": {
    company: "번개장터 (Product Manager, Core Product)",
    order: ["hero", "about", "projects", "how", "experience", "tools"],
    hero: {
      lead: "탐색부터 정산까지 거래 흐름을 구조로 설계하는",
      // body 생략 → 헤드라인만 노출하는 슬림 Hero. 소개는 아래 About이 전담.
    },
    about: {
      paragraphs: [
        "커머스 전 영역에 걸쳐 탐색부터 거래 완료까지 이어지는 흐름을 기능·정책·시스템 구조로 바라보는 Product Manager입니다. B2B 커머스 플랫폼을 1P·3P 혼합 입점형 구조로 전환하며 주문·결제·배송·클레임·정산 전 과정의 운영 기준과 예외 처리 구조를 설계했습니다.",
        "요구사항을 그대로 기능화하기보다 사용자·운영 문제, 거래 흐름, 책임 주체, 리스크를 먼저 구조화하고, 여러 이해관계자가 같은 기준으로 의사결정할 수 있도록 정리하는 데 강점이 있습니다. 고객 행동과 운영 데이터를 통해 문제 가설을 구체화하고, 기능·정책·시스템 변경이 거래 여정 전체에 미치는 영향을 검증하며 개선하는 데 관심이 있습니다.",
      ],
    },
    how: {
      // 3번 카드만 공고 톤에 맞게 교체(도구 제작 + 기획 단계 AI 활용), 1·2번은 기본 유지
      competencies: [
        {},
        {},
        {
          title: "AI로 문제 해결 속도를 높입니다",
          body:
            "반복 업무나 데이터 정합성 문제를 발견하면 AI·노코드 툴로 실무자가 바로 쓰는 자동화 도구를 직접 만듭니다. " +
            "기획 단계에서도 AI로 논리를 스스로 검증하며 실무 속도를 높입니다.",
        },
      ],
    },
    projects: {
      b2b: {
        desc:
          "거래처 설문·운영 데이터를 바탕으로 구매자·공급사·플랫폼 운영자의 역할과 책임 범위를 분리하고, " +
          "회원·상품·주문·결제·배송·클레임·정산이 일관되게 이어지는 거래 구조를 설계했습니다.",
      },
      sub: {
        desc:
          "바코드 매칭 자동화·라이브커머스 시범 운영·마이페이지 개편 — " +
          "있는 자원으로 빠르게 실행해 문제를 검증하고 개선한 3건입니다.",
      },
    },
  },
};
