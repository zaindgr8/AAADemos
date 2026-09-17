"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getFormById } from "@/lib/forms";
import MortgageForm from "./components/MortgageForm";
import LockScreen from "./components/LockScreen";

function MainPortal() {
  const [mounted, setMounted] = useState(false);
  const [unlockedForm, setUnlockedForm] = useState(null);
  const searchParams = useSearchParams();
  const formParam = searchParams.get("form");

  useEffect(() => {
    setMounted(true);
    // Restore session if available
    try {
      const savedFormId = sessionStorage.getItem("unlocked_form_id");
      if (savedFormId) {
        const form = getFormById(savedFormId);
        if (form) {
          setUnlockedForm(form);
        }
      }
    } catch (e) {
      // Ignore sessionStorage errors in restricted browser modes
    }
  }, []);

  const fixedForm = formParam ? getFormById(formParam) : null;

  function handleUnlock(form) {
    setUnlockedForm(form);
    try {
      sessionStorage.setItem("unlocked_form_id", form.id);
    } catch (e) {}
  }

  function handleLock() {
    setUnlockedForm(null);
    try {
      sessionStorage.removeItem("unlocked_form_id");
    } catch (e) {}
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md animate-pulse space-y-8">
          <div className="text-center">
            <div className="h-6 bg-gray-200 w-32 mx-auto mb-2"></div>
            <div className="h-px bg-gray-200 w-12 mx-auto"></div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="h-4 bg-gray-200 w-16 mb-2"></div>
              <div className="h-12 bg-gray-200 w-full"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 w-24 mb-2"></div>
              <div className="h-12 bg-gray-200 w-full"></div>
            </div>
          </div>
          <div className="h-12 bg-gray-200 w-full"></div>
        </div>
      </div>
    );
  }

  if (unlockedForm) {
    return <MortgageForm form={unlockedForm} onLock={handleLock} />;
  }

  return (
    <LockScreen fixedForm={fixedForm} onUnlock={handleUnlock} />
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md animate-pulse space-y-8">
            <div className="text-center">
              <div className="h-6 bg-gray-200 w-32 mx-auto mb-2"></div>
              <div className="h-px bg-gray-200 w-12 mx-auto"></div>
            </div>
          </div>
        </div>
      }
    >
      <MainPortal />
    </Suspense>
  );
}
