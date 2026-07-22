import { Fragment, useEffect, useState } from "react";
import "./CartFlowShowcase.css";
import Lightbox from "../components/Lightbox";
import { useIsExport } from "../export-mode";
import step1 from "../assets/cart-flow/step1-add-to-cart.png";
import step2 from "../assets/cart-flow/step2-select-address.png";
import step3 from "../assets/cart-flow/step3-cart-list.png";
import step4 from "../assets/cart-flow/step4-checkout.png";
import step5 from "../assets/cart-flow/step5-order-split.png";

function renderBold(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>
  );
}

const steps = [
  {
    image: step1,
    label: "장바구니 담기",
    caption: "옵션과 수량을 선택해 장바구니에 담으면 **배송지를 선택하는 다음 단계**로 이어집니다",
  },
  {
    image: step2,
    label: "배송지 선택 및 변경",
    caption: "배송지를 변경하면 장바구니에 **배송지별 그룹**이 새로 생성됩니다",
  },
  {
    image: step3,
    label: "장바구니 내역",
    caption: "장바구니에서 **배송지별로 자동 그룹핑된 내역**을 확인할 수 있습니다",
  },
  {
    image: step4,
    label: "일괄 결제",
    caption: "구매자는 원하는 **배송지 또는 공급사만 선택**해 일괄 결제할 수 있습니다",
  },
  {
    image: step5,
    label: "주문 자동 분리",
    caption:
      "주문내역에서 **공급사·배송지 기준으로 자동 분리**되어 들어가며 공급사도 **본인 주문 건만** 어드민에서 확인할 수 있습니다",
  },
];

const INTERVAL_MS = 10000;

export default function CartFlowShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const isExport = useIsExport();
  const current = steps[active];

  useEffect(() => {
    if (paused || lightboxOpen) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, lightboxOpen]);

  // 제출용 PDF: 캐러셀은 한 스텝만 보이므로, 인쇄에서는 5개 스텝을 모두
  // 펼쳐 각 캡션+화면을 순서대로 나열한다(캡처가 전 상태를 담게).
  if (isExport) {
    return (
      <div className="cart-flow cart-flow--export">
        <p className="cart-flow__tag text-tagline">장바구니 일괄 주문 flow</p>
        {steps.map((step, i) => (
          <figure className="cart-flow__export-step" key={step.label}>
            <p className="cart-flow__dot-label">
              <span className="cart-flow__dot-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-caption-strong">{step.label}</span>
            </p>
            <p className="cart-flow__caption text-body">{renderBold(step.caption)}</p>
            <div className="cart-flow__frame cart-flow__frame--export">
              <img src={step.image} alt={step.label} className="cart-flow__image" />
            </div>
          </figure>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`cart-flow${paused ? " cart-flow--paused" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <p className="cart-flow__tag text-tagline">장바구니 일괄 주문 flow</p>

      <div className="cart-flow__dots">
        {steps.map((step, i) => (
          <button
            key={step.label}
            type="button"
            className={`cart-flow__dot${i === active ? " cart-flow__dot--active" : ""}`}
            onClick={() => setActive(i)}
          >
            <span className="cart-flow__dot-track">
              {i === active && <span className="cart-flow__dot-fill" key={active} />}
            </span>
            <span className="cart-flow__dot-label">
              <span className="cart-flow__dot-index">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-caption-strong">{step.label}</span>
            </span>
          </button>
        ))}
      </div>

      <p className="cart-flow__caption text-body">{renderBold(current.caption)}</p>

      <button
        type="button"
        className="cart-flow__frame"
        onClick={() => setLightboxOpen(true)}
        aria-label={`${current.label} 크게 보기`}
      >
        <img src={current.image} alt={current.label} className="cart-flow__image" />
      </button>

      {lightboxOpen && (
        <Lightbox src={current.image} alt={current.label} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  );
}
