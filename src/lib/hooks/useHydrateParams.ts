"use client";

import { useState, useEffect, useCallback } from "react";

export function useHydrateParams() {
  const [params, setParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setParams(new URLSearchParams(window.location.search));
    }
  }, []);

  const updateParam = useCallback((key: string, value: string | number | undefined | null) => {
    if (typeof window === "undefined") return;
    const currentParams = new URLSearchParams(window.location.search);
    if (value === undefined || value === null || value === "") {
      currentParams.delete(key);
    } else {
      currentParams.set(key, String(value));
    }
    const newSearch = currentParams.toString();
    const newUrl = newSearch ? `${window.location.pathname}?${newSearch}` : window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  }, []);

  const getParam = useCallback(
    (key: string, defaultValue?: string): string | undefined => {
      if (typeof window === "undefined") return defaultValue;
      const currentParams = new URLSearchParams(window.location.search);
      return currentParams.get(key) ?? defaultValue;
    },
    []
  );

  const getNumberParam = useCallback(
    (key: string, defaultValue: number): number => {
      if (typeof window === "undefined") return defaultValue;
      const currentParams = new URLSearchParams(window.location.search);
      const val = currentParams.get(key);
      if (!val) return defaultValue;
      const parsed = parseFloat(val);
      return isNaN(parsed) ? defaultValue : parsed;
    },
    []
  );

  return { params, updateParam, getParam, getNumberParam };
}
