import { useEffect, useState } from "react";
import "./FeatureImprovements.css";
import OrdinalBars from "../components/patterns/OrdinalBars";
import ComparisonTable from "../components/patterns/ComparisonTable";
import Lightbox from "../components/Lightbox";
import restock1 from "../assets/feature-improvements/restock-1-badge.png";
import restock2 from "../assets/feature-improvements/restock-2-request.png";
import restock3 from "../assets/feature-improvements/restock-3-list.png";
import kc1 from "../assets/feature-improvements/kc-1-input.png";
import kc2 from "../assets/feature-improvements/kc-2-verified.png";
import kc3 from "../assets/feature-improvements/kc-3-detail.png";
import productDetail from "../assets/feature-improvements/product-detail.png";

const SURVEY_ITEMS = [
  { label: "재입고 알림", count: 24 },
  { label: "재고 확인", count: 20 },
  { label: "상품 정보 개선", count: 5 },
];

const NEEDS_ROWS = [
  {
    aspect: "거래처/운영팀",
    before: "품절 상품 재입고 유선 문의",
    after: "재고 0→발생 시 SMS 자동 안내",
  },
  {
    aspect: "거래처/공급사",
    before: "구매 판단 정보가 페이지 곳곳에 분산",
    after: "상세 상단에 판매가·배송 정보·소포장 단위 통합 노출",
  },
  {
    aspect: "운영자/공급사",
    before: "KC 인증번호 수기 확인",
    after: "API 연동으로 유효 여부 자동 확인",
  },
];

const FEATURES = [
  {
    label: "재입고 알림 시스템 도입",
    description: "유선으로 안내하던 재입고 안내를 거래처가 직접 알림을 신청해 받는 방식으로 바꿨습니다.",
    images: [
      { src: restock1, caption: "품절 옵션에 재입고 알림 아이콘 노출" },
      { src: restock2, caption: "휴대폰 번호 입력 후 알림 신청" },
      { src: restock3, caption: "재입고 알림 목록에서 신청 내역 확인" },
    ],
  },
  {
    label: "KC인증 API 검증",
    description:
      "아동 카테고리 특화 플랫폼에서 중요했던 KC 인증번호 조회를 API 연동으로 자동화해 운영 편의성을 높였습니다.",
    images: [
      { src: kc1, caption: "공급사가 KC 인증 정보 입력" },
      { src: kc2, caption: "API 연동으로 유효 인증번호 자동 확인" },
      { src: kc3, caption: "상세 페이지에 인증 정보 노출" },
    ],
  },
  {
    label: "상품 상세 정보 구조화",
    description: "판매가·배송 정보·소포장 단위 등 소싱에 필요한 정보를 상세 페이지 상단에 통합 배치했습니다.",
    images: [{ src: productDetail, caption: "상품 상세 상단 정보 노출" }],
  },
];

const INTERVAL_MS = 20000;

export default function FeatureImprovements() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const feature = FEATURES[active];

  useEffect(() => {
    if (paused || lightbox) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % FEATURES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, lightbox]);

  return (
    <div className="feature-improve">
      <div className="feature-improve__survey">
        <div className="feature-improve__chart">
          <p className="feature-improve__tag text-tagline">거래처 설문 (37개사 대상 · 복수 응답)</p>
          <OrdinalBars dark vertical items={SURVEY_ITEMS} />
        </div>
        <div className="feature-improve__needs">
          <p className="feature-improve__tag text-tagline">필요했던 기능</p>
          <ComparisonTable dark rows={NEEDS_ROWS} />
        </div>
      </div>

      <div
        className={`feature-improve__showcase${paused ? " feature-improve__showcase--paused" : ""}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <p className="feature-improve__tag text-tagline">기능 상세</p>

        <div className="feature-improve__dots">
          {FEATURES.map((f, i) => (
            <button
              key={f.label}
              type="button"
              className={`feature-improve__dot${i === active ? " feature-improve__dot--active" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className="feature-improve__dot-track">
                {i === active && <span className="feature-improve__dot-fill" key={active} />}
              </span>
              <span className="feature-improve__dot-label">
                <span className="feature-improve__dot-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-caption-strong">{f.label}</span>
              </span>
            </button>
          ))}
        </div>

        <p className="feature-improve__showcase-desc text-caption">{feature.description}</p>

        <div
          className={`feature-improve__gallery feature-improve__gallery--cols-${feature.images.length}`}
        >
          {feature.images.map((img, i) => (
            <figure className="feature-improve__gallery-item" key={img.caption}>
              <button
                type="button"
                className="feature-improve__gallery-frame"
                onClick={() => setLightbox({ src: img.src, alt: img.caption })}
                aria-label={`${img.caption} 크게 보기`}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="feature-improve__gallery-image"
                />
              </button>
              <figcaption className="feature-improve__gallery-caption">
                {feature.images.length > 1 ? `${i + 1}. ${img.caption}` : img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
