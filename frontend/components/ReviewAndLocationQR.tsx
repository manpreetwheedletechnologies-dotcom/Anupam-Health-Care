"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Star,
  MapPin,
  ExternalLink,
  QrCode,
  Sparkles,
  Navigation,
  MessageSquareHeart,
  CheckCircle2,
  Copy,
  Smartphone,
  Download,
  Share2,
  MessageCircle,
  Building2,
} from "lucide-react";

interface ReviewAndLocationQRProps {
  className?: string;
  variant?: "compact" | "full";
}

export const OFFICES = [
  {
    id: "main",
    type: "Main Office",
    name: "Head Office — RDC Raj Nagar",
    address: "GF 10, Ansal Satyam Building, RDC, Raj Nagar, Ghaziabad",
    pincode: "201002",
    url: "https://maps.google.com/?q=Anupam+Health+Care+GF+10+Ansal+Satyam+Building+RDC+Raj+Nagar+Ghaziabad",
  },
  {
    id: "rajnagar-ext",
    type: "Branch Office",
    name: "Branch — Raj Nagar Extension",
    address: "T1 MCC Signature Heights, Raj Nagar Extension, Ghaziabad",
    pincode: "201003",
    url: "https://maps.google.com/?q=T1+MCC+SIGNATURE+HEIGHTS+Raj+Nagar+Extension+Ghaziabad+Uttar+Pradesh+201003",
  },
  {
    id: "govindpuram",
    type: "Branch Office",
    name: "Branch — Govindpuram",
    address: "D 564, Govindpuram, Ghaziabad",
    pincode: "201013",
    url: "https://maps.google.com/?q=D+564+Govindpuram+Ghaziabad+Uttar+Pradesh+201013",
  },
];

const REVIEW_URL =
  "https://maps.google.com/?q=Anupam+Health+Care+GF+10+Ansal+Satyam+Building+RDC+Raj+Nagar+Ghaziabad";

export default function ReviewAndLocationQR({
  className = "",
  variant = "full",
}: ReviewAndLocationQRProps) {
  const [activeTab, setActiveTab] = useState<"review" | "location">("review");
  const [selectedOfficeId, setSelectedOfficeId] = useState<string>("main");
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [shared, setShared] = useState(false);

  const selectedOffice =
    OFFICES.find((o) => o.id === selectedOfficeId) || OFFICES[0];

  const activeUrl = activeTab === "review" ? REVIEW_URL : selectedOffice.url;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setDownloading(true);
    const svg = document.getElementById("anupam-qr-code");
    if (!svg) {
      setDownloading(false);
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      const padding = 36;
      const headerHeight = 90;
      const footerHeight = 70;
      const qrSize = img.width || 220;

      canvas.width = qrSize + padding * 2;
      canvas.height = qrSize + padding * 2 + headerHeight + footerHeight;

      if (!ctx) {
        setDownloading(false);
        return;
      }

      // Background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Header top bar
      ctx.fillStyle = "#022b51";
      ctx.fillRect(0, 0, canvas.width, 8);

      // Brand Title
      ctx.fillStyle = "#022b51";
      ctx.font = "bold 20px system-ui, -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("ANUPAM HEALTH CARE", canvas.width / 2, 44);

      // Subtitle
      ctx.fillStyle = "#059669";
      ctx.font = "bold 13px system-ui, -apple-system, sans-serif";
      ctx.fillText(
        activeTab === "review"
          ? "⭐ Scan to Write a Google Review"
          : `📍 Scan for ${selectedOffice.type}: ${selectedOffice.name.split("—")[1] || selectedOffice.name}`,
        canvas.width / 2,
        68
      );

      // Draw QR Code
      ctx.drawImage(img, padding, headerHeight + padding / 2, qrSize, qrSize);

      // Divider line
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding, canvas.height - footerHeight + 5);
      ctx.lineTo(canvas.width - padding, canvas.height - footerHeight + 5);
      ctx.stroke();

      // Footer address & phone
      ctx.fillStyle = "#64748b";
      ctx.font = "11px system-ui, -apple-system, sans-serif";
      ctx.fillText(
        activeTab === "review"
          ? "GF 10, Ansal Satyam Building, Raj Nagar, Ghaziabad"
          : `${selectedOffice.address}`,
        canvas.width / 2,
        canvas.height - 35
      );

      ctx.fillStyle = "#022b51";
      ctx.font = "bold 12px system-ui, -apple-system, sans-serif";
      ctx.fillText(
        "Call: 7011598306 | 9818283386",
        canvas.width / 2,
        canvas.height - 16
      );

      // Generate download
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `anupam-healthcare-${activeTab}-${selectedOffice.id}-qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
      setDownloading(false);
    };

    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgData)));
  };

  const handleShare = async () => {
    const shareTitle =
      activeTab === "review"
        ? "Review Anupam Health Care on Google"
        : `Anupam Health Care (${selectedOffice.name}) Location & Directions`;
    const shareText =
      activeTab === "review"
        ? "We value your trust! Please share your experience with Anupam Health Care Ghaziabad:"
        : `Visit Anupam Health Care (${selectedOffice.address}). Find directions on Google Maps:`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `${shareText}\n${activeUrl}`,
          url: activeUrl,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2500);
        return;
      } catch (err) {
        // Fallback to WhatsApp
      }
    }

    // Direct WhatsApp share fallback
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `*${shareTitle}*\n${shareText}\n${activeUrl}`
    )}`;
    window.open(whatsappUrl, "_blank");
    setShared(true);
    setTimeout(() => setShared(false), 2500);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-white via-brand-sky/10 to-brand-greenLight/20 p-6 shadow-xl shadow-brand-navy/5 md:p-8 ${className}`}
    >
      {/* Background ambient blurs */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-green/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-brand-navy/5 blur-3xl" />

      {/* Header section */}
      <div className="relative text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-white/80 px-4 py-1.5 text-xs font-semibold text-brand-green backdrop-blur-md">
          <QrCode size={14} />
          Scan, Share & Connect
        </div>
        <h3 className="mt-3 text-2xl font-bold text-brand-navy sm:text-3xl">
          Quick QR Scanner
        </h3>
        <p className="mx-auto mt-2 max-w-lg text-sm text-gray-500">
          Scan the QR code with your phone camera to write a Google review or get instant directions to any of our 3 Ghaziabad offices.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="relative mx-auto mt-6 flex max-w-xs items-center rounded-2xl bg-gray-100/80 p-1.5 backdrop-blur-sm">
        <button
          onClick={() => setActiveTab("review")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all sm:text-sm ${
            activeTab === "review"
              ? "bg-white text-brand-navy shadow-md shadow-brand-navy/10"
              : "text-gray-500 hover:text-brand-navy"
          }`}
        >
          <Star
            size={16}
            className={
              activeTab === "review"
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-400"
            }
          />
          Give Review
        </button>
        <button
          onClick={() => setActiveTab("location")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all sm:text-sm ${
            activeTab === "location"
              ? "bg-brand-navy text-white shadow-md shadow-brand-navy/20"
              : "text-gray-500 hover:text-brand-navy"
          }`}
        >
          <MapPin
            size={16}
            className={
              activeTab === "location" ? "text-brand-green" : "text-gray-400"
            }
          />
          View Location
        </button>
      </div>

      {/* Office Selector for Location Tab with distinct color themes */}
      {activeTab === "location" && (
        <div className="relative mx-auto mt-5 max-w-xl">
          <p className="mb-2.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
            Select Office Location to Navigate & Download QR
          </p>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {OFFICES.map((office) => {
              const isSelected = selectedOfficeId === office.id;
              const isMain = office.id === "main";
              const isBranch1 = office.id === "rajnagar-ext";

              let selectedClass = "";
              let badgeClass = "";

              if (isMain) {
                selectedClass = isSelected
                  ? "border-amber-400 bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-md ring-2 ring-amber-400/40"
                  : "border-amber-200 bg-amber-50/40 text-gray-800 hover:border-amber-300 hover:bg-amber-50";
                badgeClass = isSelected
                  ? "bg-white/20 text-white border border-white/30"
                  : "bg-amber-100 text-amber-900 border border-amber-200";
              } else if (isBranch1) {
                selectedClass = isSelected
                  ? "border-emerald-500 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-md ring-2 ring-emerald-400/40"
                  : "border-emerald-200 bg-emerald-50/40 text-gray-800 hover:border-emerald-300 hover:bg-emerald-50";
                badgeClass = isSelected
                  ? "bg-white/20 text-white border border-white/30"
                  : "bg-emerald-100 text-emerald-900 border border-emerald-200";
              } else {
                selectedClass = isSelected
                  ? "border-sky-500 bg-gradient-to-br from-brand-navy to-sky-800 text-white shadow-md ring-2 ring-sky-400/40"
                  : "border-sky-200 bg-sky-50/40 text-gray-800 hover:border-sky-300 hover:bg-sky-50";
                badgeClass = isSelected
                  ? "bg-white/20 text-white border border-white/30"
                  : "bg-sky-100 text-sky-900 border border-sky-200";
              }

              return (
                <button
                  key={office.id}
                  onClick={() => setSelectedOfficeId(office.id)}
                  className={`flex flex-col items-start rounded-2xl border p-3 text-left transition-all duration-200 ${selectedClass}`}
                >
                  <span
                    className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide ${badgeClass}`}
                  >
                    {isMain ? "⭐ MAIN HQ" : office.type}
                  </span>
                  <span className="mt-1.5 text-xs font-bold leading-tight">
                    {office.name.split("—")[1] || office.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="relative mt-8 grid items-center gap-8 md:grid-cols-2">
        {/* QR Code Card with scan frame & action buttons */}
        <div className="flex flex-col items-center justify-center">
          <div className="group relative rounded-3xl bg-white p-5 shadow-lg ring-1 ring-gray-100 transition-all duration-300 hover:shadow-xl">
            {/* Scanner Corner Accents */}
            <div className="pointer-events-none absolute left-3 top-3 h-5 w-5 rounded-tl-lg border-l-[3px] border-t-[3px] border-brand-green" />
            <div className="pointer-events-none absolute right-3 top-3 h-5 w-5 rounded-tr-lg border-r-[3px] border-t-[3px] border-brand-green" />
            <div className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 rounded-bl-lg border-b-[3px] border-l-[3px] border-brand-green" />
            <div className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 rounded-br-lg border-b-[3px] border-r-[3px] border-brand-green" />

            <div className="rounded-2xl bg-white p-2">
              <QRCodeSVG
                id="anupam-qr-code"
                value={activeUrl}
                size={190}
                level="H"
                includeMargin={true}
                imageSettings={{
                  src: "/logo.png",
                  x: undefined,
                  y: undefined,
                  height: 38,
                  width: 38,
                  excavate: true,
                }}
              />
            </div>

            {/* Badge under QR */}
            <div className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs font-medium text-gray-500">
              <Smartphone size={13} className="text-brand-green" />
              Point camera to scan
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-brand-navy shadow-sm transition-all hover:border-brand-navy/30 hover:bg-gray-50 hover:shadow"
              title="Download QR code image"
            >
              <Download size={14} className="text-brand-green" />
              {downloading ? "Downloading..." : "Download QR"}
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-brand-navy shadow-sm transition-all hover:border-brand-navy/30 hover:bg-gray-50 hover:shadow"
              title="Share QR via WhatsApp or Social"
            >
              {shared ? (
                <>
                  <CheckCircle2 size={14} className="text-brand-green" />
                  Shared!
                </>
              ) : (
                <>
                  <Share2 size={14} className="text-brand-navy" />
                  Share QR
                </>
              )}
            </button>
          </div>
        </div>

        {/* Details & Actions Panel */}
        <div className="flex flex-col justify-center space-y-4 text-center md:text-left">
          {activeTab === "review" ? (
            <>
              <div className="inline-flex items-center gap-1.5 self-center rounded-lg bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700 md:self-start">
                <Sparkles size={13} className="text-yellow-500" />
                Google Reviews & Rating
              </div>

              <h4 className="text-xl font-bold text-brand-navy">
                Share Your Experience with Anupam Health Care
              </h4>

              <div className="flex items-center justify-center gap-1 md:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="ml-2 text-sm font-bold text-brand-navy">
                  5.0 Rating
                </span>
              </div>

              <p className="text-sm leading-relaxed text-gray-600">
                Your feedback helps us continuously improve our patient care and supports other families in Ghaziabad finding verified healthcare services.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 md:justify-start">
                <a
                  href={REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-brand-green/90 hover:shadow-lg"
                >
                  <MessageSquareHeart size={16} />
                  Write Review on Google
                  <ExternalLink size={14} />
                </a>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-green-700"
                  title="Share on WhatsApp"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </button>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:border-brand-navy/30 hover:bg-gray-50"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 size={16} className="text-brand-green" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy Link
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-1.5 self-center rounded-lg bg-brand-sky/40 px-3 py-1 text-xs font-semibold text-brand-navy md:self-start">
                <Navigation size={13} className="text-brand-green" />
                Google Maps GPS Navigation
              </div>

              <h4 className="text-xl font-bold text-brand-navy">
                {selectedOffice.name}
              </h4>

              <div className="flex items-start gap-2.5 rounded-2xl bg-white/80 p-3.5 ring-1 ring-gray-100">
                <Building2
                  size={18}
                  className="mt-0.5 shrink-0 text-brand-green"
                />
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-brand-navy/10 px-2 py-0.5 text-[10px] font-bold text-brand-navy">
                      {selectedOffice.type}
                    </span>
                    <span className="text-xs text-gray-400">PIN: {selectedOffice.pincode}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-brand-navy">
                    {selectedOffice.address}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-gray-600">
                Scan the QR code to open real-time turn-by-turn directions directly to this branch in Google Maps on your mobile phone.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 md:justify-start">
                <a
                  href={selectedOffice.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-brand-navy/90 hover:shadow-lg"
                >
                  <Navigation size={16} />
                  Open in Google Maps
                  <ExternalLink size={14} />
                </a>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-green-700"
                  title="Share on WhatsApp"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </button>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:border-brand-navy/30 hover:bg-gray-50"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 size={16} className="text-brand-green" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy Link
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
