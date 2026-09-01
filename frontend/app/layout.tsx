import type { Metadata } from "next";
import "./globals.css";
import BookServiceModal from "@/components/BookServiceModal";
import ConditionalChatbot from "@/components/ConditionalChatbot";
import { BookingModalProvider } from "@/context/BookingModalContext";
import { SiteDataProvider } from "@/context/SiteDataContext";

export const metadata: Metadata = {
  title: "Anupam Health Care Services | Care Beyond Compare",
  description:
    "Home nursing, elder care, medical equipment on rent, blood sample collection and doctor consultation at home in Ghaziabad. Call 7011598306 / 9818283386.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans text-gray-900 antialiased">
        <SiteDataProvider>
          <BookingModalProvider>
            {children}
            <ConditionalChatbot />
            <BookServiceModal />
          </BookingModalProvider>
        </SiteDataProvider>
      </body>
    </html>
  );
}
