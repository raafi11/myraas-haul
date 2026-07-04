import "./TryItOnButton.css";

interface TryItOnButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function TryItOnButton({ onClick, disabled }: TryItOnButtonProps) {
  return (
    <section className="try-section">
      <button
        type="button"
        className="try-btn pixel-box"
        onClick={onClick}
        disabled={disabled}
      >
        <span className="try-arrow">▸</span>
        TRY IT ON
        <span className="try-arrow">◂</span>
      </button>
      <div className="press-start">
        <span className="line" />
        <span className="text blink">PRESS START</span>
        <span className="line" />
      </div>
    </section>
  );
}
