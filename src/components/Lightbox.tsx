import { useEffect } from "react";
import "./Lightbox.css";

export default function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="lightbox" onClick={onClose}>
      <button type="button" className="lightbox__close" onClick={onClose} aria-label="닫기">
        ✕
      </button>
      <img src={src} alt={alt} className="lightbox__image" onClick={(e) => e.stopPropagation()} />
    </div>
  );
}
