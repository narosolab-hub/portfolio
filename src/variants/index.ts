// ────────────────────────────────────────────────────────────────────────
// 공고별 포트폴리오 버전(Variant) 설정 — 레지스트리
//
// 기본 링크(`/`)는 아래 어떤 것에도 영향받지 않는 "기본 버전"입니다.
// 공고별 링크는 `/<slug>` 형태이며, 아래 VARIANT_LOADERS에 등록된 slug만
// 열립니다. nav·검색·기본 페이지 어디에도 노출되지 않으므로, 링크(URL)를
// 아는 사람만 접근할 수 있습니다.
//
// ▍공고별 데이터는 각각 별도 파일(`./<slug>.ts`)로 분리해 동적 import합니다.
//   방문한 공고의 청크만 브라우저로 내려받으므로, 다른 공고용 문구·라벨이
//   같은 번들에 섞여 개발자도구에 노출되지 않습니다.
//
// ▍새 공고용 버전을 만들려면:
//   1) `src/variants/<slug>.ts` 파일을 만들어 `export default { ... }` 로 작성
//      (아래 Variant 타입 참고, 바꾸고 싶은 항목만 적으면 됨)
//   2) 아래 VARIANT_LOADERS에 `"<slug>": () => import("./<slug>")` 한 줄 추가
//   3) 전용 파비콘을 쓰려면 VARIANT_FAVICONS에도 한 줄 추가(선택)
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

/**
 * slug → 공고 데이터 동적 로더.
 * 여기 등록된 slug만 유효하며(그 외는 기본 페이지로 리다이렉트), 방문 시점에
 * 해당 공고 청크만 내려받습니다. 데이터(회사명 포함 문구)는 이 청크 안에만
 * 담기므로 다른 공고 방문자에게 노출되지 않습니다.
 */
export const VARIANT_LOADERS: Record<
  string,
  () => Promise<{ default: Variant }>
> = {
  "focus-media": () => import("./focus-media"),
  "bgzt": () => import("./bgzt"),
};

/** 해당 slug가 등록된 공고 버전인지 (데이터 청크 로드 없이 즉시 판별) */
export function isVariantSlug(slug: string): boolean {
  return slug in VARIANT_LOADERS;
}

/**
 * 공고별 파비콘(브라우저 탭 아이콘) 경로. public/ 기준 절대경로.
 * 탭 아이콘을 깜빡임 없이 즉시 바꾸기 위해 (민감정보가 아닌) 경로만 메인에
 * 동기 맵으로 둡니다. 없는 slug는 기본 파비콘(/favicon.svg)을 씁니다.
 */
export const VARIANT_FAVICONS: Record<string, string> = {
  "bgzt": "/favicon-bgzt.png",
};
