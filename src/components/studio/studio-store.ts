"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { StudioSelection } from "@/data/customize";

const emptySelection: StudioSelection = {
  message: "",
  messageStyle: "chocolate",
  referenceImage: null,
  name: "",
  phone: "",
  preferredDate: "",
  notes: "",
};

type SelectableStep = "size" | "flavor" | "cream" | "fruitFilling" | "shape" | "design";
type DetailField = "name" | "phone" | "preferredDate" | "notes";

type StudioStore = {
  /** 0..6 = studio steps, 7 = review */
  currentStep: number;
  selection: StudioSelection;
  setCurrentStep: (step: number) => void;
  selectOption: (stepId: SelectableStep, optionId: string) => void;
  setMessage: (message: string) => void;
  setMessageStyle: (id: string) => void;
  setReferenceImage: (image: { dataUrl: string; name: string } | null) => void;
  setDetail: (field: DetailField, value: string) => void;
  reset: () => void;
};

export const useStudio = create<StudioStore>()(
  persist(
    (set) => ({
      currentStep: 0,
      selection: emptySelection,
      setCurrentStep: (currentStep) => set({ currentStep }),
      selectOption: (stepId, optionId) =>
        set((s) => ({ selection: { ...s.selection, [stepId]: optionId } })),
      setMessage: (message) => set((s) => ({ selection: { ...s.selection, message } })),
      setMessageStyle: (messageStyle) =>
        set((s) => ({ selection: { ...s.selection, messageStyle } })),
      setReferenceImage: (referenceImage) =>
        set((s) => ({ selection: { ...s.selection, referenceImage } })),
      setDetail: (field, value) =>
        set((s) => ({ selection: { ...s.selection, [field]: value } })),
      reset: () => set({ selection: emptySelection, currentStep: 0 }),
    }),
    { name: "daisys-cake-studio-v1" }
  )
);