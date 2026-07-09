import "./SellerModelComparison.css";

const brands = ["자사", "입점사 A", "입점사 B", "입점사 C", "…"];

export default function SellerModelComparison() {
  return (
    <div className="seller-model">
      <p className="seller-model__tag text-tagline">자사·입점사 Seller 통합 구조</p>
      <div className="seller-viz">
      <div className="seller-viz__col seller-viz__col--reject">
        <p className="seller-viz__col-label text-caption-strong">
          <span className="pill pill--muted">검토안</span> 예외 관리자로 둔다
        </p>
        <div className="seller-viz__stack">
          {brands.map((brand, i) => (
            <div className="seller-viz__exception-row" key={brand}>
              <span className="seller-viz__brand text-caption-strong">{brand}</span>
              <span className="seller-viz__exception-pill text-caption">
                예외 운영 로직 #{i + 1}
              </span>
            </div>
          ))}
        </div>
        <p className="seller-viz__caption text-caption">
          브랜드가 늘 때마다 예외 운영·정산 로직이 <strong>매번 새로 추가</strong>됩니다
        </p>
      </div>

      <div className="seller-viz__col seller-viz__col--accept">
        <p className="seller-viz__col-label text-caption-strong">
          <span className="pill pill--primary">채택</span> Seller로 편입한다
        </p>
        <div className="seller-viz__pipeline">
          <div className="seller-viz__pipeline-sellers">
            {["자사", "입점사 A", "입점사 B", "입점사 C"].map((s) => (
              <span className="seller-viz__seller-chip text-caption-strong" key={s}>
                {s}
              </span>
            ))}
          </div>
          <div className="seller-viz__arrow text-caption">↓ 동일 흐름</div>
          <div className="seller-viz__common-box text-body-strong">
            상품 등록 · 출고 · 클레임 대응
          </div>
        </div>
        <div className="seller-viz__exception-note text-caption">
          자사 전용 정책 예외만 분리 — <strong>수수료 0%</strong>,{" "}
          <strong>B2B 등급 할인</strong>
        </div>
        <p className="seller-viz__caption text-caption">
          브랜드가 몇 개로 늘어도 <strong>공통 흐름은 그대로</strong> 계정만 추가됩니다
        </p>
      </div>
      </div>
    </div>
  );
}
