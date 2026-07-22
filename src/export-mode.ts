import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// ?export=1 은 제출용 PDF 전용 모드입니다. 화면 전용 UI(상단 내비게이션,
// Overview의 프로젝트 이동 버튼)를 걷어내고 섹션 여백을 압축해 인쇄 페이지
// 수를 줄입니다. 실제 스타일은 index.css의 `.export-mode` 규칙이 담당하고,
// 여기서는 현재 URL 쿼리를 읽어 boolean으로 노출하는 역할만 합니다.
export function useIsExport(): boolean {
  const { search } = useLocation();
  return new URLSearchParams(search).get("export") === "1";
}

// export 모드일 때 <html>에 `.export-mode` 클래스를 붙였다 뗍니다. 앱 루트에서
// 한 번만 호출하며(App), CSS가 전 페이지에 걸쳐 인쇄 전용 규칙을 적용할 수
// 있게 합니다.
export function useExportModeClass(): boolean {
  const on = useIsExport();
  useEffect(() => {
    const el = document.documentElement;
    el.classList.toggle("export-mode", on);
    return () => el.classList.remove("export-mode");
  }, [on]);
  return on;
}
