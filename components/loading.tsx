"use client";

import { useEffect, useState } from "react";

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    if (document.readyState === "complete") {
      handleLoad();
      return;
    }

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      role="status"
      aria-label="กำลังโหลด"
      className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-[#f8f7f2]"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#6c5846]/20 border-t-[#6c5846]" />
        <span className="text-sm font-medium text-[#6c5846]">
          กำลังโหลดข้อมูล...
        </span>
      </div>
    </div>
  );
};

export default Loading;