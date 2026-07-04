import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  CategoryId,
  OutfitItem,
  SavedLook,
  TabId,
  TryOnState,
} from "./types";
import { StatusBar } from "./components/StatusBar";
import { Header } from "./components/Header";
import { PlayerSlot } from "./components/PlayerSlot";
import { Inventory } from "./components/Inventory";
import { OutfitUpload, createOutfitItem } from "./components/OutfitUpload";
import { OutfitGrid } from "./components/OutfitGrid";
import { TryItOnButton } from "./components/TryItOnButton";
import { BottomNav } from "./components/BottomNav";
import { TryOnOverlay } from "./components/TryOnOverlay";
import { generateTryOn, checkAiHealth } from "./services/tryOn";
import {
  loadOutfits,
  loadPersonPhoto,
  loadSavedLooks,
  saveOutfits,
  savePersonPhoto,
  saveSavedLooks,
} from "./utils/storage";
import "./App.css";

const initialTryOnState: TryOnState = {
  status: "idle",
  resultImageUrl: null,
  error: null,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [photo, setPhoto] = useState<string | null>(() => loadPersonPhoto());
  const [outfits, setOutfits] = useState<OutfitItem[]>(() => loadOutfits());
  const [savedLooks, setSavedLooks] = useState<SavedLook[]>(() => loadSavedLooks());
  const [activeCategory, setActiveCategory] = useState<CategoryId>("dress");
  const [selectedOutfit, setSelectedOutfit] = useState<OutfitItem | null>(null);
  const [showTryOn, setShowTryOn] = useState(false);
  const [tryOnState, setTryOnState] = useState<TryOnState>(initialTryOnState);
  const [aiReady, setAiReady] = useState<boolean | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const categoryOutfits = useMemo(
    () => outfits.filter((o) => o.category === activeCategory),
    [outfits, activeCategory],
  );

  useEffect(() => {
    checkAiHealth().then((health) => setAiReady(health.aiReady));
  }, []);

  useEffect(() => {
    if (photo) savePersonPhoto(photo);
  }, [photo]);

  useEffect(() => {
    saveOutfits(outfits);
  }, [outfits]);

  useEffect(() => {
    saveSavedLooks(savedLooks);
  }, [savedLooks]);

  useEffect(() => {
    if (categoryOutfits.length === 0) {
      setSelectedOutfit(null);
      return;
    }
    if (!selectedOutfit || selectedOutfit.category !== activeCategory) {
      setSelectedOutfit(categoryOutfits[0]);
    }
  }, [activeCategory, categoryOutfits, selectedOutfit]);

  const runTryOn = useCallback(async () => {
    if (!photo || !selectedOutfit) return;

    if (!selectedOutfit.supportsTryOn) {
      setTryOnState({
        status: "error",
        resultImageUrl: null,
        error: "Virtual try-on does not support shoes or accessories yet. Try dress, top, jeans, or hoodies.",
      });
      setShowTryOn(true);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setShowTryOn(true);
    setTryOnState({ status: "loading", resultImageUrl: null, error: null });

    try {
      const result = await generateTryOn(
        {
          humanImage: photo,
          garmentImage: selectedOutfit.garmentImage,
          category: selectedOutfit.category,
          garmentName: selectedOutfit.name,
          clothType: selectedOutfit.clothType,
        },
        controller.signal,
      );

      setTryOnState({
        status: "success",
        resultImageUrl: result.imageUrl,
        error: null,
      });
    } catch (err) {
      if (controller.signal.aborted) return;
      const message =
        err instanceof Error ? err.message : "Try-on failed. Check your API key.";
      setTryOnState({
        status: "error",
        resultImageUrl: null,
        error: message,
      });
    }
  }, [photo, selectedOutfit]);

  const handleOutfitUpload = useCallback(
    (payload: { name: string; category: CategoryId; garmentImage: string }) => {
      const item = createOutfitItem(payload);
      setOutfits((prev) => [item, ...prev]);
      setSelectedOutfit(item);
    },
    [],
  );

  const handleDeleteOutfit = useCallback((id: string) => {
    setOutfits((prev) => prev.filter((o) => o.id !== id));
  }, []);

  const handleSaveLook = useCallback(() => {
    if (!selectedOutfit || !tryOnState.resultImageUrl) return;

    const look: SavedLook = {
      id: crypto.randomUUID(),
      outfitName: selectedOutfit.name,
      resultImageUrl: tryOnState.resultImageUrl,
      createdAt: Date.now(),
    };

    setSavedLooks((prev) => [look, ...prev]);
    setShowTryOn(false);
    setTryOnState(initialTryOnState);
  }, [selectedOutfit, tryOnState.resultImageUrl]);

  const handleCloseOverlay = useCallback(() => {
    abortRef.current?.abort();
    setShowTryOn(false);
    setTryOnState(initialTryOnState);
  }, []);

  const canTryOn =
    Boolean(photo) &&
    Boolean(selectedOutfit) &&
    Boolean(selectedOutfit?.supportsTryOn);

  return (
    <div className="app-shell">
      <div className="scanlines" aria-hidden="true" />
      <StatusBar />

      {aiReady === false && (
        <div className="ai-banner pixel-box">
          AI OFFLINE — server not running or REPLICATE_API_TOKEN missing in .env
        </div>
      )}

      <main className="app-content">
        {activeTab === "home" && (
          <>
            <Header />
            <PlayerSlot photo={photo} onPhotoSelect={setPhoto} />
            <Inventory
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            <OutfitUpload
              activeCategory={activeCategory}
              onUpload={handleOutfitUpload}
            />
            <OutfitGrid
              outfits={categoryOutfits}
              selectedId={selectedOutfit?.id ?? null}
              onSelect={setSelectedOutfit}
            />
            <TryItOnButton onClick={runTryOn} disabled={!canTryOn} />
          </>
        )}

        {activeTab === "items" && (
          <section className="items-page">
            <div className="sub-title pixel-box">
              <h2>MY WARDROBE</h2>
            </div>
            <p className="items-count">{outfits.length} OUTFITS UPLOADED</p>
            {outfits.length === 0 ? (
              <p className="outfit-empty">
                Upload outfit photos from the HOME tab to build your wardrobe.
              </p>
            ) : (
              <div className="items-all-grid">
                {outfits.map((outfit) => (
                  <div key={outfit.id} className="item-row pixel-box">
                    <img src={outfit.garmentImage} alt={outfit.name} />
                    <div className="item-info">
                      <span className="item-name">{outfit.name}</span>
                      <span className="item-cat">{outfit.category.toUpperCase()}</span>
                    </div>
                    <button
                      type="button"
                      className="item-delete"
                      onClick={() => handleDeleteOutfit(outfit.id)}
                    >
                      DEL
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "favs" && (
          <section className="favs-page">
            <div className="sub-title pixel-box">
              <h2>SAVED LOOKS</h2>
            </div>
            {savedLooks.length === 0 ? (
              <p className="outfit-empty">
                Generate a try-on and tap SAVE LOOK to keep it here!
              </p>
            ) : (
              <div className="favs-grid">
                {savedLooks.map((look) => (
                  <div key={look.id} className="fav-card">
                    <div className="fav-thumb pixel-box">
                      <img src={look.resultImageUrl} alt={look.outfitName} />
                    </div>
                    <span className="fav-name">{look.outfitName}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "me" && (
          <section className="me-page">
            <div className="me-avatar pixel-box">
              {photo ? (
                <img src={photo} alt="Profile" className="me-photo" />
              ) : (
                <span className="me-placeholder">?</span>
              )}
            </div>
            <h2 className="me-name">MYRAA</h2>
            <div className="me-stats pixel-box">
              <div className="me-stat">
                <span className="me-stat-val">{outfits.length}</span>
                <span className="me-stat-label">OUTFITS</span>
              </div>
              <div className="me-stat">
                <span className="me-stat-val">{savedLooks.length}</span>
                <span className="me-stat-label">LOOKS</span>
              </div>
              <div className="me-stat">
                <span className="me-stat-val">2460</span>
                <span className="me-stat-label">STARS</span>
              </div>
            </div>
            {photo && (
              <button
                type="button"
                className="me-clear pixel-box"
                onClick={() => {
                  setPhoto(null);
                  localStorage.removeItem("myraas-haul-person-photo");
                }}
              >
                CLEAR PHOTO
              </button>
            )}
          </section>
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {showTryOn && photo && selectedOutfit && (
        <TryOnOverlay
          personPhoto={photo}
          outfitName={selectedOutfit.name}
          status={tryOnState.status}
          resultImageUrl={tryOnState.resultImageUrl}
          error={tryOnState.error}
          onClose={handleCloseOverlay}
          onSave={handleSaveLook}
          onRetry={runTryOn}
        />
      )}
    </div>
  );
}
