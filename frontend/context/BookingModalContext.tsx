"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type BookingModalContextValue = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const BookingModalContext = createContext<BookingModalContextValue | null>(
  null
);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BookingModalContext.Provider
      value={{
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
      }}
    >
      {children}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) {
    throw new Error("useBookingModal must be used inside BookingModalProvider");
  }
  return ctx;
}
