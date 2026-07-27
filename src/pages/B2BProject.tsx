import GlobalNav from "../components/GlobalNav";
import Tile from "../components/Tile";
import ComparisonTable from "../components/patterns/ComparisonTable";
import ProjectMeta from "../components/patterns/ProjectMeta";
import CartFlowShowcase from "../diagrams/CartFlowShowcase";
import E2EVerificationFlow from "../diagrams/E2EVerificationFlow";
import ExpansionTimeline from "../diagrams/ExpansionTimeline";
import FeatureImprovements from "../diagrams/FeatureImprovements";
import OrderTierStructure from "../diagrams/OrderTierStructure";
import PaymentSplitFlow from "../diagrams/PaymentSplitFlow";
import PolicySplitCompare from "../diagrams/PolicySplitCompare";
import QAPriorityBreakdown from "../diagrams/QAPriorityBreakdown";
import SellerModelComparison from "../diagrams/SellerModelComparison";
import SettlementDiscrepancy from "../diagrams/SettlementDiscrepancy";
import type { Variant } from "../variants";

export default function B2BProject({ variant }: { variant?: Variant }) {
  // 공고별 문구 override. 없으면 아래 기본 문구가 그대로 쓰입니다(순수 fallback).
  const ov = variant?.b2bPage;
  const sec = (id: string) => ov?.sections?.[id] ?? {};

  return (
    <div>
      <GlobalNav />

      <Tile variant="light">
        <p className="tile__eyebrow text-caption-strong">MAIN PROJECT 01 — B2B 플랫폼 전환</p>
        <h1 className="text-section-heading" style={{ maxWidth: 640 }}>
          {ov?.intro?.title ?? "입점형 플랫폼 전환 구축 프로젝트"}
        </h1>
        <p className="text-body" style={{ color: "var(--color-ink-muted-80)" }}>
          {ov?.intro?.body ??
            "연 거래액 24억 규모의 자사 직판(1P) B2B몰을 외부 공급사 입점이 가능한 1P·3P 혼합 플랫폼으로 전환했습니다. 회원가입부터 상품, 주문, 결제, 정산에 이르는 커머스 전체의 거래 흐름과 운영 기준을 처음부터 다시 설계했습니다."}
        </p>
        <ProjectMeta
          items={[
            { k: "프로젝트 기간", v: "2025.08 ~ 진행 중 (2026.09 베타 오픈 목표)" },
            { k: "담당 역할", v: "요구사항 정의, 서비스 정책·구조 설계, 외주 개발사 조율, E2E QA 기준 수립" },
            { k: "팀 구성", v: "플랫폼기획팀 1인 (1인 PM 리드)" },
            { k: "협업 조직", v: "외주 개발사, 운영지원팀, 재무회계팀, 외부 법무법인 등" },
            { k: "기여도", v: "기획 90% (오너십 리드)" },
          ]}
        />
      </Tile>

      <Tile
        variant="parchment"
        eyebrow={sec("background").eyebrow ?? "프로젝트 배경"}
        title={sec("background").title ?? "리뉴얼이 아닌 플랫폼 전환 프로젝트"}
        subcopy={
          sec("background").subcopy ?? (
            <>
              단순한 B2B 폐쇄몰 리뉴얼로 시작된 프로젝트였으나 요구사항을 분석하며{" "}
              <strong>'플랫폼 전환'으로 문제를 다시 정의</strong>했습니다. 재고 부담 없이 카테고리를
              확장하기 위해 <strong>'외부 공급사 입점'</strong>이 가능한 플랫폼 사업을 신사업으로
              추진하게 되었고, 기존 직판 모델(카페24)로는 한 주문에 여러 공급사와 배송지가 섞이는
              복잡한 거래를 감당할 수 없었기 때문입니다. 이에 <strong>1P·3P 혼합 플랫폼</strong>으로
              구축 방향을 틀고 회원부터 정산까지의 운영 기준을 전면 재설계했습니다.
            </>
          )
        }
      >
        <ComparisonTable
          rows={[
            {
              aspect: "판매 구조",
              before: "자사 제조/사입 상품 중심",
              reason: "창고·재고 부담을 줄이면서 카테고리 확장 필요",
              after: "자사 상품 + 공급사 입점 상품",
            },
            {
              aspect: "운영 관리",
              before: "외상 거래 + 무통장 입금",
              reason: "외상 거래와 수기 입금 확인 부담 최소화 필요",
              after: "선결제 우선 + 후불 거래 자동화",
            },
            {
              aspect: "주문 경험",
              before: "위탁배송 기반 배송지별 개별 주문",
              reason: "다중 배송지 주문·결제 과정 간소화 필요",
              after: "다중 배송지 장바구니 일괄 결제",
            },
            {
              aspect: "상품 등록",
              before: "거래처 상품을 외부마켓에 개별 등록",
              reason: "상품 등록 부담을 줄여 신상품 소싱 확대 필요",
              after: "API 연동 기반 상품 등록 지원",
            },
          ]}
        />
      </Tile>

      <Tile
        variant="light"
        eyebrow={sec("expansion").eyebrow ?? "전환 범위"}
        title={sec("expansion").title ?? "회원가입부터 정산까지 커머스 전 영역 재설계"}
      >
        <ExpansionTimeline />
      </Tile>

      <Tile
        variant="parchment"
        eyebrow={sec("seller-model").eyebrow ?? "운영 모델 대전제"}
        title={sec("seller-model").title ?? "반복되는 예외 처리를 차단한 단일 운영 모델 구축"}
        subcopy={
          sec("seller-model").subcopy ?? (
            <>
              기존 플랫폼은 자사가 <strong>운영 주체이자 판매자</strong>인 이중 구조였습니다. 자사
              상품을 관리자 권한의 예외 기능으로 두면 신규 브랜드를 런칭할 때마다 운영 및 정산 예외
              처리가 반복되는 문제가 있었습니다. 이를 해결하기 위해 자사 역시 외부 공급사와 동일한{" "}
              <strong>판매자(Seller) 모델로 편입</strong>했습니다. 수수료 0%나 B2B 등급 할인 등
              자사에만 필요한 기능은 정책 예외로 분리하여 불필요한 예외 처리가 발생하지 않는{" "}
              <strong>단일 운영 모델</strong>을 구축했습니다.
            </>
          )
        }

      >
        <SellerModelComparison />
      </Tile>

      <Tile
        variant="light"
        className="export-break-before"
        eyebrow={sec("cart").eyebrow ?? "다중 배송지 장바구니 일괄 결제"}
        title={sec("cart").title ?? "배송지별 반복 주문 병목을 해결한 일괄 결제·자동 분리 구조"}
        subcopy={
          sec("cart").subcopy ?? (
            <>
              거래처가 최종 고객에게 직접 발송하는 <strong>위탁배송</strong> 특성상 주문마다 배송지가
              달랐습니다. 상위 거래처는 하루 20~30건의 주문을 개별 입력해야 했고 이는{" "}
              <strong>월평균 약 4,500건</strong>에 달했습니다. 배송지별 반복 주문을 운영의 핵심
              병목으로 정의했습니다. 장바구니에서 최대 20개 배송지를 지정해 한 번에 결제하되{" "}
              <strong>내부 시스템에서는 공급사와 배송지 기준으로 주문을 자동 분리</strong>하는 구조를
              기획했습니다.
            </>
          )
        }
      >
        <CartFlowShowcase />
      </Tile>

      <Tile
        variant="parchment"
        className="export-break-before"
        eyebrow={sec("order-tier").eyebrow ?? "결제 트랜잭션 3단계 · ORD·GRP·ITM"}
        title={sec("order-tier").title ?? "정산·배송 로직 충돌을 막는 3단계 결제 트랜잭션 설계"}
        subcopy={
          sec("order-tier").subcopy ??
          "장바구니 일괄 결제 건을 하나의 단위로 묶어두면 운영에 차질이 발생했습니다. 동일한 결제 안에서도 공급사, 배송지, 출고지가 다르고 상품별로 부분 출고 및 취소가 개별 발생하기 때문입니다. 기존 2단계 구조(결제-배송지 묶음 / 결제-개별 상품)의 한계를 확인하고 결제(ORD), 정산(GRP), 발주 및 클레임(ITM) 3단계로 트랜잭션을 분리해 단계별 역할과 상태값 기준을 새롭게 설계했습니다."
        }
      >
        <OrderTierStructure />
      </Tile>

      <Tile
        variant="light"
        className="export-break-before"
        eyebrow={sec("payment-policy").eyebrow ?? "결제·정산 구조"}
        title={sec("payment-policy").title ?? "법적 리스크와 비즈니스 요구를 조율한 결제·정산 분리"}
        subcopy={
          sec("payment-policy").subcopy ?? (
            <>
              자사 상품과 입점사 상품은 판매 주체가 달라 결제 이후 서로 다른 정산 규칙이
              필요했습니다. 통신판매중개업 특성상 입점 상품의 결제대금을 자사 계좌로 직접 수취하면{" "}
              <strong>전자금융거래법 위반 소지</strong>가 있었고 기존 핵심 거래처를 위한 외상 거래는
              유지해야 했습니다. 이에 입점사(3P) 거래는 <strong>PG 지급대행</strong>을 통해 자사가
              대금을 직접 수취하지 않도록 분리하고 자사(1P) 거래에 한해{" "}
              <strong>후불결제를 제한적으로 적용</strong>했습니다.
            </>
          )
        }
      >
        <PolicySplitCompare />
      </Tile>

      <Tile
        variant="parchment"
        className="export-break-before"
        eyebrow={sec("settlement-proof").eyebrow ?? "매출·정산 소명"}
        title={sec("settlement-proof").title ?? "PG 계약 주체와 실매출 주체의 간극을 해소한 소명 기준 수립"}
        subcopy={
          sec("settlement-proof").subcopy ?? (
            <>
              1P와 3P 결제 기준이 나뉘며 매출 신고 방식도 변경되었습니다. PG 결제대금은{" "}
              <strong>자사 명의로 국세청에 일괄 신고</strong>되나, 실제 자사 매출은 1P 매출과 공급사
              정산대금을 제외한 수수료 매출입니다. <strong>계약 주체와 실매출 주체가 불일치</strong>하기
              때문에 매출 소명이 필요했습니다. 이에 재무팀과 협의를 통해 3P 판매대금을{" "}
              <strong>공급사 정산금과 자사 수수료 매출로 명확히 구분</strong>하는 데이터 기준을
              수립했습니다.
            </>
          )
        }
      >
        <PaymentSplitFlow />
      </Tile>

      <Tile
        variant="light"
        eyebrow={sec("e2e-qa").eyebrow ?? "운영 가능성 검증 · E2E QA 설계"}
        title={sec("e2e-qa").title ?? "거래 흐름 기반 E2E QA로 리스크 134건 선제 발견 및 조치"}
        subcopy={
          sec("e2e-qa").subcopy ?? (
            <>
              커머스 전 영역이 연결된 플랫폼 특성상 개별 기능이 정상 동작하더라도 실제 거래 흐름에서
              병목이 발생할 수 있었습니다. 개발 완료 후 일괄 검수 시 리스크 대응이 늦어지는 문제를
              방지하기 위해 개발과 QA를 병행하는 <strong>E2E 테스트</strong>를 도입했습니다. 기능
              단위가 아닌 <strong>회원가입부터 정산까지의 시나리오 완결성</strong>을 오픈 기준으로
              삼았습니다. 이를 통해 발견한 <strong>134건의 리스크를 심각도(P0~P3)에 따라 분류</strong>하고
              Phase 1·2로 명확한 Go-Live 기준을 세워 성급한 오픈에 따른 운영 리스크를 사전에
              관리했습니다.
            </>
          )
        }
      >
        <E2EVerificationFlow />
        <QAPriorityBreakdown
          title="QA에서 발견한 이슈 (Phase1 기준)"
          items={[
            {
              label: "P0",
              count: 44,
              description: "테스트 자체 불가 또는 법무·회계 등 오픈 시 치명적 리스크",
            },
            {
              label: "P1",
              count: 43,
              description: "기능·로직 결함으로 정상 거래 흐름이 막히는 항목",
            },
            { label: "P2", count: 28, description: "운영 편의를 위한 개선 필요" },
            { label: "P3", count: 19, description: "UI·카피 등 완성도 항목" },
          ]}
          strategyRows={[
            {
              severity: "P0",
              criteria: "거래 흐름 차단 및 법무·회계 리스크",
              action: "Phase 1 오픈 전 100% 핫픽스 (정산 3원칙 수립 등)",
            },
            {
              severity: "P1",
              criteria: "주요 기능 결함",
              action: "핵심 시나리오 구현 후 오픈 시점 재검증",
            },
            {
              severity: "P2~P3",
              criteria: "운영 편의성 및 UI 완성도",
              action: "베타 오픈 이후 백로그로 이관하여 순차 대응",
            },
          ]}
          phaseIntro={
            <>
              <strong>Go-Live 기준 재수립 및 베타 오픈 전환</strong>
              <br />
              <strong>이슈</strong> · 단순 결함 심각도(P0~P3) 외에 실제 유저 시나리오의 완결성 부족 판단
              <br />
              <strong>액션</strong> · 무리한 런칭 강행 시의 리스크를 바탕으로 경영진을 설득하여 필수 기능 보강(Phase 2) 후 단계적으로 베타 오픈하도록 런칭 계획 조정
            </>
          }
          phaseRows={[
            {
              phase: "Phase 1 (베타 오픈)",
              criteria: "핵심 상거래 흐름 및 안정성 확보",
              example: "회원·상품·주문·결제·정산 기본 기능 및 P0 치명적 결함 핫픽스",
            },
            {
              phase: "Phase 2 (정식 오픈)",
              criteria: "예외 케이스 방어 및 완결성 보강",
              example: "가상계좌 환불 수집, 맞교환 기능, 복잡한 상태값 매트릭스 고도화",
            },
            {
              phase: "오픈 후 백로그 (순차 대응)",
              criteria: "운영 편의성 및 UX 완성도 개선",
              example: "UI/안내 문구 개선, 단순 노출 오류 등 P2~P3 이슈 잔여 백로그",
            },
          ]}
        />
      </Tile>

      <Tile
        variant="parchment"
        eyebrow={sec("settlement-logic").eyebrow ?? "운영 가능성 검증 · P0 케이스 딥다이브"}
        title={sec("settlement-logic").title ?? "파편화된 정산 로직을 통합해 회계 오차를 차단한 '정산 3원칙'"}
        subcopy={
          sec("settlement-logic").subcopy ?? (
            <>
              QA 과정에서 정산 산정 기준, 상태값, 원 단위 절사 방식이 화면마다 다르게 처리되는 문제를
              발견했습니다. 이는 실거래 누적 시 <strong>심각한 회계 오차로 이어질 수 있는 핵심
              리스크</strong>로 <strong>'정산 3원칙'</strong>을 수립해 개발사와 전체 로직을
              정리했습니다. 또한 내부 브랜드 전용 할인이 전체 공급사에 일괄 적용되던 <strong>정책
              공백</strong>을 발견해 필드 신설 및 로직 수정을 완료했습니다.
            </>
          )
        }
      >
        <SettlementDiscrepancy />
      </Tile>

      <Tile
        variant="light"
        eyebrow={sec("feature-improve").eyebrow ?? "사용자 기능 개선"}
        title={sec("feature-improve").title ?? "핵심 이해관계자의 반복 업무 및 불편 사항 개선"}
        subcopy={
          sec("feature-improve").subcopy ?? (
            <>
              플랫폼 구조 설계와 더불어 실사용자인 구매자, 판매자, 운영자의 반복적인 불편 사항을
              개선했습니다. 거래처 설문 결과와 내부 반복 업무량을 기준으로 체감 효용이 높은 기능을
              우선 기획했습니다. 구매자를 위한 <strong>품절 상품 재입고 알림톡 자동 발송</strong>,
              운영자가 수기로 검증하던 <strong>KC 인증의 API 조회 자동화</strong> 등을 도입했습니다.
              또한 상품 상세 페이지의 핵심 정보(판매가, 배송, 소포장 단위)를 상단에 통합 배치하여 구매
              판단과 탐색 효율을 높였습니다.
            </>
          )
        }
      >
        <FeatureImprovements />
      </Tile>
    </div>
  );
}
