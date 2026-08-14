"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/917011598306?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Anupam%20Health%20Care%20Services"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition hover:scale-105 hover:bg-emerald-600"
    >
      <MessageCircle size={26} fill="currentColor" className="text-white" />
    </a>
  );
}
