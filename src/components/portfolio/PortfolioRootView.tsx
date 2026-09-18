"use client";

import React, { useState, useCallback, useSyncExternalStore } from "react";
import { PortfolioView } from "./PortfolioView";
import { PortfolioWelcomeLoader } from "./PortfolioWelcomeLoader";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("welcome") === "1" || params.get("loading") === "1") return true;
    return sessionStorage.getItem("portfolio_welcome_loaded") !== "true";
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return true;
}

export function PortfolioRootView() {
  const shouldShowLoader = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isDismissed, setIsDismissed] = useState(false);

  const showLoader = shouldShowLoader && !isDismissed;

  const handleComplete = useCallback(() => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem("portfolio_welcome_loaded", "true");
    } catch {}
  }, []);

  return (
    <>
      {showLoader && <PortfolioWelcomeLoader onComplete={handleComplete} />}
      <PortfolioView />
    </>
  );
}
