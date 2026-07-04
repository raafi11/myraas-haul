import type { TryOnStatus } from "../types";
import "./TryOnOverlay.css";

interface TryOnOverlayProps {
  personPhoto: string;
  outfitName: string;
  status: TryOnStatus;
  resultImageUrl: string | null;
  error: string | null;
  onClose: () => void;
  onSave: () => void;
  onRetry: () => void;
}

export function TryOnOverlay({
  personPhoto,
  outfitName,
  status,
  resultImageUrl,
  error,
  onClose,
  onSave,
  onRetry,
}: TryOnOverlayProps) {
  const previewSrc =
    status === "success" && resultImageUrl ? resultImageUrl : personPhoto;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="overlay-panel pixel-box" onClick={(e) => e.stopPropagation()}>
        <div className="overlay-header">
          <span>
            {status === "loading" ? "GENERATING..." : "AI TRY ON"}
          </span>
          <button type="button" className="overlay-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="overlay-preview">
          <img src={previewSrc} alt="Try-on preview" className="overlay-photo" />

          {status === "loading" && (
            <div className="overlay-loading">
              <div className="loading-bar">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} className="loading-segment" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
          <p>AI is dressing you up...</p>
          <p className="loading-sub">This takes 20–60 seconds</p>
            </div>
          )}

          {status === "error" && (
            <div className="overlay-error">
              <p>{error ?? "Something went wrong."}</p>
            </div>
          )}
        </div>

        <p className="overlay-item-name">{outfitName}</p>

        {status === "success" && (
          <p className="overlay-msg">Looking cute! ✨</p>
        )}

        {status === "success" && (
          <button type="button" className="overlay-btn pixel-box" onClick={onSave}>
            SAVE LOOK
          </button>
        )}

        {status === "error" && (
          <button type="button" className="overlay-btn pixel-box" onClick={onRetry}>
            TRY AGAIN
          </button>
        )}

        {status === "loading" && (
          <button type="button" className="overlay-btn overlay-btn-muted pixel-box" disabled>
            PLEASE WAIT...
          </button>
        )}
      </div>
    </div>
  );
}
