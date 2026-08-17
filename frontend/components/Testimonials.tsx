"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Quote, ChevronLeft, ChevronRight, Star, Calendar, MessageCircle, Users } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}
      />
    ))}
  </div>
);

type Phase = "idle" | "out" | "in";

export default function Testimonials() {
  const { testimonials } = useSiteData();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [phase, setPhase] = useState<Phase>("idle");
  const isAnimating = useRef(false);
  const rafRef = useRef<number | null>(null);

  const review = testimonials[index];

  const go = useCallback((dir: 1 | -1) => {
    if (isAnimating.current || testimonials.length === 0) return;
    isAnimating.current = true;
    setDirection(dir);
    setPhase("out"); // slide current card out

    setTimeout(() => {
      setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
      setPhase("in"); // snap new card off-screen (no transition)

      // wait a frame so the "no transition" position is committed, then animate to idle
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(() => {
          setPhase("idle");
        });
      });

      setTimeout(() => {
        isAnimating.current = false;
      }, 320);
    }, 280);
  }, [testimonials.length]);

  const goToSlide = (target: number) => {
    if (isAnimating.current || target === index) return;
    go(target > index ? 1 : -1);
  };

  // Auto-play
  useEffect(() => {
    if (testimonials.length < 2) return;
    const timer = setInterval(() => go(1), 4000);
    return () => clearInterval(timer);
  }, [go, testimonials.length]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Slide + fade classes based on phase/direction
  const getSlideClass = () => {
    if (phase === "out") {
      return direction === 1
        ? "transition-all duration-300 ease-in-out -translate-x-10 opacity-0"
        : "transition-all duration-300 ease-in-out translate-x-10 opacity-0";
    }
    if (phase === "in") {
      // instantly positioned off-screen on the opposite side, no transition
      return direction === 1
        ? "translate-x-10 opacity-0"
        : "-translate-x-10 opacity-0";
    }
    return "transition-all duration-300 ease-in-out translate-x-0 opacity-100";
  };

  if (testimonials.length === 0 || !review) return null;

  return (
    <section id="testimonials" className="bg-white px-5 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-greenLight/50 px-4 py-1.5 text-xs font-semibold text-brand-green">
            <MessageCircle size={14} />
            Real Stories of Care and Trust
          </div>
          <h2 className="mt-4 text-3xl font-bold text-brand-navy sm:text-4xl">
            What Our Families Say
          </h2>
          <p className="mt-3 mx-auto max-w-2xl text-base text-gray-500">
            Real stories from patients and their families who experienced our
            compassionate care
          </p>
        </div>

        {/* Main Carousel */}
        <div className="mt-12 relative">
          <div className="relative overflow-hidden rounded-3xl border border-gray-100 shadow-xl shadow-brand-navy/5">
            <div className={`grid grid-cols-1 md:grid-cols-[280px_1fr] ${getSlideClass()}`}>
              {/* Left panel — identity */}
              <div className="relative flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-brand-navy to-brand-navy/80 p-8 text-center md:items-start md:text-left">
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/5" />
                <div className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-white/20">
                  <img src={review.image} alt={review.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">{review.name}</p>
                  <div className="mt-1 flex items-center justify-center gap-2 text-xs text-white/60 md:justify-start">
                    <span>{review.location}</span>
                    <span className="h-1 w-1 rounded-full bg-white/40" />
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {review.date}
                    </span>
                  </div>
                </div>
                <span className="rounded-full bg-brand-green px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  {review.service}
                </span>
                <div className="mt-1">
                  <StarRating rating={review.rating} />
                </div>
              </div>

              {/* Right panel — quote */}
              <div className="relative flex flex-col justify-center bg-white p-8 sm:p-10">
                <Quote size={36} className="mb-4 text-brand-greenLight" />
                <blockquote className="text-base leading-relaxed text-gray-700 sm:text-lg">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <div className="mt-6 text-xs text-gray-400">
                  {index + 1} of {testimonials.length}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 md:-left-5 z-10 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 text-brand-navy transition hover:bg-brand-sky hover:border-brand-navy/20 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} className="md:h-6 md:w-6" />
          </button>

          <button
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 md:-right-5 z-10 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 text-brand-navy transition hover:bg-brand-sky hover:border-brand-navy/20 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} className="md:h-6 md:w-6" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === index ? "w-10 bg-brand-green" : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 rounded-2xl bg-brand-sky/30 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span className="text-sm font-medium text-gray-700">4.9/5 Average Rating</span>
          </div>
          <div className="hidden h-5 w-px bg-gray-300 sm:block" />
          <div className="flex items-center gap-2">
            <Users size={18} className="text-brand-navy/60" />
            <span className="text-sm font-medium text-gray-700">500+ Happy Families</span>
          </div>
          <div className="hidden h-5 w-px bg-gray-300 sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏥</span>
            <span className="text-sm font-medium text-gray-700">8+ Services Offered</span>
          </div>
        </div>
      </div>
    </section>
  );
}