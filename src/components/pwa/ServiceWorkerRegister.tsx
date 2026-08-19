"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("HVACLogic Offline Service Worker registered:", reg.scope);
        })
        .catch((err) => {
          console.warn("HVACLogic Service Worker registration failed:", err);
        });
    }
  }, []);

  return null;
}
