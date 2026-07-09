import "./StepFlow.css";

export default function StepFlow({
  steps,
  dark = false,
}: {
  steps: string[];
  dark?: boolean;
}) {
  return (
    <div className={`step-flow${dark ? " step-flow--dark" : ""}`}>
      {steps.map((step, i) => (
        <div className="step-flow__unit" key={step}>
          <div className="step-flow__step">
            <span className="step-flow__step-index">{String(i + 1).padStart(2, "0")}</span>
            <span className="step-flow__step-label">{step}</span>
          </div>
          {i < steps.length - 1 && <div className="step-flow__connector">→</div>}
        </div>
      ))}
    </div>
  );
}
