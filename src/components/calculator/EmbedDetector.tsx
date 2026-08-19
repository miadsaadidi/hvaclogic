"use client";

import { useEffect } from "react";

export function EmbedDetector() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("embed") === "true") {
        document.documentElement.classList.add("embed-mode");
        document.body.classList.add("embed-mode");
      }
    }
  }, []);

  return null;
}
