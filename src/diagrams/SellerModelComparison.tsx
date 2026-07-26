import "./SellerModelComparison.css";

const brands = ["자사", "입점사 A", "입점사 B", "입점사 C", "…"];

export default function SellerModelComparison() {
  return (
    <div className="seller-model">
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
          신규 브랜드 입점 시 <strong>예외 로직 반복 발생</strong>
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
          단일 흐름 유지, 브랜드 추가 시 <strong>계정만 신설</strong>
        </p>
      </div>
      </div>
    </div>
  );
}
