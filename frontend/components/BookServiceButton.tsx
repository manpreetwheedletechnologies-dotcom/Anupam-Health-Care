"use client";

import { ReactNode } from "react";
import { useBookingModal } from "@/context/BookingModalContext";

export default function BookServiceButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { openModal } = useBookingModal();
  return (
    <button type="button" onClick={openModal} className={className}>
      {children}
    </button>
  );
}
