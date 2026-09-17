"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LabWelcomeExperience } from "./LabWelcomeExperience";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function WelcomeRootEntry() {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = useCallback(() => {
    if (reducedMotion) {
      router.push("/lab");
    } else {
      setIsExiting(true);
      setTimeout(() => {
        router.push("/lab");
      }, 500);
    }
  }, [reducedMotion, router]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8] relative flex flex-col justify-between">
      <LabWelcomeExperience onEnter={handleEnter} isExiting={isExiting} />
    </div>
  );
}
