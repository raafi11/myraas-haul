import { useRef } from "react";
import { PixelIcon } from "./PixelIcon";
import "./PlayerSlot.css";

interface PlayerSlotProps {
  photo: string | null;
  onPhotoSelect: (dataUrl: string) => void;
}

export function PlayerSlot({ photo, onPhotoSelect }: PlayerSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onPhotoSelect(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="player-slot">
      <div className="slot-header">
        <span>PLAYER SLOT</span>
        <span className={photo ? "slot-filled" : "slot-empty"}>
          {photo ? "[ LOADED ]" : "[ EMPTY ]"}
        </span>
      </div>
      <div className="slot-body pixel-box">
        <button
          type="button"
          className="slot-upload"
          onClick={() => inputRef.current?.click()}
        >
          {photo ? (
            <img src={photo} alt="Your photo" className="slot-photo" />
          ) : (
            <>
              <PixelIcon name="camera" size={48} />
              <span className="slot-text">INSERT PHOTO</span>
              <span className="slot-hint">tap to select from gallery</span>
            </>
          )}
        </button>
        <div className="slot-decor">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="decor-bar" />
          ))}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </section>
  );
}
