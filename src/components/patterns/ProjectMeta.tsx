import "./ProjectMeta.css";

export default function ProjectMeta({
  items,
  dark = false,
}: {
  items: { k: string; v: string }[];
  dark?: boolean;
}) {
  return (
    <div className={`project-meta${dark ? " project-meta--dark" : ""}`}>
      {items.map((item) => (
        <div className="project-meta__item" key={item.k}>
          <span className="project-meta__k text-caption">{item.k}</span>
          <span className="project-meta__v text-caption-strong">{item.v}</span>
        </div>
      ))}
    </div>
  );
}
