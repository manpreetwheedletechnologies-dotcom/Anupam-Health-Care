"use client";

import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, Star, Calendar, MessageCircle, Users } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    quote:
      "Nursing staff was gentle and always on time for my father's care. It felt like family looking after him. They handled everything from medication to hygiene with utmost professionalism.",
    name: "Ritu Sharma",
    location: "Raj Nagar",
    rating: 5,
    date: "2 months ago",
    service: "Nursing Care",
    image: "https://ui-avatars.com/api/?name=Ritu+Sharma&background=2e7d32&color=fff&size=100&bold=true",
  },
  {
    id: 2,
    quote:
      "Equipment was delivered the same day and saved us an unnecessary hospital admission. The team set everything up and showed us how to use it properly. Very professional service.",
    name: "Vikram Malhotra",
    location: "Indirapuram",
    rating: 5,
    date: "1 month ago",
    service: "Equipment Rent",
    image: "https://ui-avatars.com/api/?name=Vikram+Malhotra&background=1a2a4a&color=fff&size=100&bold=true",
  },
  {
    id: 3,
    quote:
      "Physiotherapy at home helped my mother walk again just weeks after her surgery. The therapist was patient and encouraging. Truly life-changing for our family!",
    name: "Anjali Tiwari",
    location: "Vaishali",
    rating: 5,
    date: "3 months ago",
    service: "Physiotherapy",
    image: "https://ui-avatars.com/api/?name=Anjali+Tiwari&background=2e7d32&color=fff&size=100&bold=true",
  },
  {
    id: 4,
    quote:
      "The doctor consultation at home was thorough and comfortable. Saved us a trip to the hospital and provided personalized care that my elderly father really appreciated.",
    name: "Suresh Kumar",
    location: "Raj Nagar",
    rating: 5,
    date: "1 month ago",
    service: "Doctor Consult",
    image: "https://ui-avatars.com/api/?name=Suresh+Kumar&background=1a2a4a&color=fff&size=100&bold=true",
  },
  {
    id: 5,
    quote:
      "24/7 ambulance service arrived within minutes during a medical emergency. The staff was professional and caring throughout. Highly recommend for peace of mind.",
    name: "Priya Singh",
    location: "Indirapuram",
    rating: 5,
    date: "2 weeks ago",
    service: "Ambulance",
    image: "https://ui-avatars.com/api/?name=Priya+Singh&background=2e7d32&color=fff&size=100&bold=true",
  },
  {
    id: 6,
    quote:
      "The entire team at Anupam Healthcare took care of my father like family. From nursing staff to the equipment support, everything was perfect. Highly recommend!",
    name: "Amit Jain",
    location: "Vaishali",
    rating: 5,
    date: "1 month ago",
    service: "Complete Care",
    image: "https://ui-avatars.com/api/?name=Amit+Jain&background=1a2a4a&color=fff&size=100&bold=true",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={18}
        className={`${
          i < rating 
            ? "fill-yellow-400 text-yellow-400" 
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ))}
  </div>
);

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentReview = REVIEWS[currentIndex];

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

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
          {/* Card Container */}
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-brand-navy/5 border border-gray-100">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand-sky/20 to-transparent rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-brand-greenLight/20 to-transparent rounded-full -ml-32 -mb-32" />

            {/* Content */}
            <div 
              className={`relative p-6 sm:p-10 transition-all duration-500 ease-in-out ${
                isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                {/* Quote Icon */}
                <Quote size={40} className="text-brand-greenLight mb-4" />

                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={currentReview.rating} />
                </div>

                {/* Quote Text */}
                <blockquote className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed text-gray-800 max-w-3xl">
                  &ldquo;{currentReview.quote}&rdquo;
                </blockquote>

                {/* User Info */}
                <div className="mt-8 flex flex-col items-center">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full ring-4 ring-brand-green/20 overflow-hidden">
                      <img
                        src={currentReview.image}
                        alt={currentReview.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {/* Service badge */}
                    <div className="absolute -bottom-1 -right-1 rounded-full bg-brand-green px-2.5 py-0.5 text-[8px] font-bold text-white uppercase tracking-wider">
                      {currentReview.service}
                    </div>
                  </div>
                  
                  <p className="mt-3 font-semibold text-brand-navy text-lg">
                    {currentReview.name}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{currentReview.location}</span>
                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {currentReview.date}
                    </span>
                  </div>
                </div>

                {/* Counter */}
                <div className="mt-6 text-xs text-gray-400">
                  {currentIndex + 1} of {REVIEWS.length}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={isTransitioning}
            className="absolute left-2 top-1/2 -translate-y-1/2 md:left-4 z-10 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 text-brand-navy transition hover:bg-brand-sky hover:border-brand-navy/20 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6" />
          </button>

          <button
            onClick={handleNext}
            disabled={isTransitioning}
            className="absolute right-2 top-1/2 -translate-y-1/2 md:right-4 z-10 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 text-brand-navy transition hover:bg-brand-sky hover:border-brand-navy/20 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} className="md:w-6 md:h-6" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {REVIEWS.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "w-10 bg-brand-green" 
                  : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
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