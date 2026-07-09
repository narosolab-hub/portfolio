import type { ReactElement } from "react";
import claudeIcon from "../assets/claude-ai-icon.webp";
import notionIcon from "../assets/notion.png";
import slackIcon from "../assets/slack.jpeg";
import figmaIcon from "../assets/figma.png";

const IMAGE_ICONS: Record<string, string> = {
  claude: claudeIcon,
  notion: notionIcon,
  slack: slackIcon,
  figma: figmaIcon,
};

// Source images sit on a white canvas around the mark (circle/squircle logo
// crops). A shared rounded-square radius keeps all three icons visually
// consistent; scale is tuned per icon so that radius still clips the white
// canvas without cutting into the mark, backed by the brand color.
const ICON_RADIUS = "20%";
const IMAGE_ICON_STYLE: Record<string, { bg: string; scale: number }> = {
  notion: { bg: "#000000", scale: 1.3 },
  slack: { bg: "#4A154B", scale: 1.22 },
  figma: { bg: "#1E1E1E", scale: 1.12 },
};

type ToolId = "notion" | "claude" | "googlesheets" | "slack" | "powerpoint" | "figma";

const CONFIGS: Record<ToolId, { bg: string; fg: string }> = {
  notion:       { bg: "#000000", fg: "#ffffff" },
  claude:       { bg: "transparent", fg: "#ffffff" },
  googlesheets: { bg: "#23A566", fg: "#ffffff" },
  slack:        { bg: "#4A154B", fg: "#ffffff" },
  powerpoint:   { bg: "#B7472A", fg: "#ffffff" },
  figma:        { bg: "#1E1E1E", fg: "#ffffff" },
};

function NotionSvg({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={color}>
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.046 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.727l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" />
    </svg>
  );
}

function GoogleSheetsSvg({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={color}>
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-7 3h5v2h-5V6zm0 4h5v2h-5v-2zm0 4h5v2h-5v-2zM7 6h4v2H7V6zm0 4h4v2H7v-2zm0 4h4v2H7v-2z" />
    </svg>
  );
}

function SlackSvg({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={color}>
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zm2.521-10.123a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.52 2.521 2.528 2.528 0 0 1-2.52 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.52V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.52h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
    </svg>
  );
}

function PowerPointSvg({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={color}>
      <path d="M2 3h20v2H2V3zm1 3h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-7v2h2v2H8v-2h2v-2H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm1 2v8h16V8H4zm4.5 1.5 5 2.5-5 2.5V9.5z" />
    </svg>
  );
}

function FigmaSvg({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={color}>
      <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4zm4-10c0-2.208-1.792-4-4-4H4c-2.208 0-4 1.792-4 4s1.792 4 4 4h4V14zm0-8V0H8C5.792 0 4 1.792 4 4s1.792 4 4 4h4zm4 0c2.208 0 4-1.792 4-4s-1.792-4-4-4h-4v8h4zm0 2h-4v8h4c2.208 0 4-1.792 4-4s-1.792-4-4-4z" />
    </svg>
  );
}

const SVG_MAP: Record<ToolId, (fg: string) => ReactElement> = {
  notion:       (fg) => <NotionSvg color={fg} />,
  claude:       (_fg) => <img src={claudeIcon} width={28} height={28} style={{ objectFit: "cover", borderRadius: 6, display: "block" }} alt="Claude" />,
  googlesheets: (fg) => <GoogleSheetsSvg color={fg} />,
  slack:        (fg) => <SlackSvg color={fg} />,
  powerpoint:   (fg) => <PowerPointSvg color={fg} />,
  figma:        (fg) => <FigmaSvg color={fg} />,
};

export function ToolIcon({ id }: { id: string }) {
  const config = CONFIGS[id as ToolId];
  if (!config) return null;

  // Tools with a real logo image: clip to the mark's own shape and back it
  // with the brand color so the source image's white canvas never shows.
  const imageSrc = IMAGE_ICONS[id];
  if (imageSrc) {
    const imgStyle = IMAGE_ICON_STYLE[id];
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 28,
          height: 28,
          borderRadius: ICON_RADIUS,
          background: imgStyle?.bg ?? "transparent",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src={imageSrc}
          width={28}
          height={28}
          style={{ objectFit: "cover", transform: `scale(${imgStyle?.scale ?? 1})`, display: "block" }}
          alt={id}
        />
      </span>
    );
  }

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 28,
        height: 28,
        borderRadius: 6,
        background: config.bg,
        flexShrink: 0,
      }}
    >
      {SVG_MAP[id as ToolId]?.(config.fg)}
    </span>
  );
}
