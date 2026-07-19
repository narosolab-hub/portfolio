import type { Variant } from "./index";

// ── 예시 버전: 포커스미디어 PO ──────────────────────────────────────
// 실제 지원 시 문구는 공고에 맞게 자유롭게 수정하세요.
const focusMedia: Variant = {
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
};

export default focusMedia;
