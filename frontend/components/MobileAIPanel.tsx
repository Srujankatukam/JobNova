"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface MobileAIPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileAIPanel({ isOpen, onClose }: MobileAIPanelProps) {
  interface FeatureItemProps {
    title: string;
    description: string;
  }

  const FeatureItem = ({ title, description }: FeatureItemProps) => (
    <div className="mb-4">
      <h4 className="font-semibold text-sm text-gray-800 mb-1">{title}</h4>
      <p className="text-sm text-gray-700 leading-relaxed">
        <span className="mr-2">•</span>
        {description}
      </p>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 lg:hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom) + 1.5rem)' }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="px-4 sm:px-6 pb-20 sm:pb-24 pt-2 relative">
              {/* Eclipse decorative effect - Responsive for mobile */}
              <div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 eclipse-effect-mobile"
                style={{
                  width: 'clamp(150px, 50vw, 250px)',
                  height: 'clamp(150px, 50vw, 250px)',
                  background: 'linear-gradient(180deg, rgba(0, 194, 255, 0) 0%, rgba(255, 148, 228, 0.76) 100%)',
                  zIndex: 0,
                  pointerEvents: 'none'
                }}
              />

              {/* Top Section */}
              <div className="relative z-10 pt-4 pb-3">
                {/* Right_A Icon */}
                <div className="mb-2">
                  <Image
                    src="/Right_A.png"
                    alt=""
                    width={30}
                    height={30}
                  />
                </div>

                {/* Heading */}
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 leading-tight text-left">
                  Ace Your Interviews with AI-Powered Mock Sessions!
                </h2>

                {/* Introductory Paragraph */}
                <p className="text-sm text-gray-700 leading-relaxed text-left">
                  Struggling with interview nerves or unsure how to prepare? Let our cutting-edge AI mock interviews help you shine!
                </p>
              </div>

              {/* Horizontal Separator */}
              <div className="border-t border-gray-200 my-4" />

              {/* Why Choose Section */}
              <div className="relative z-10 pb-2">
                <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  Why Choose Our AI Mock Interviews?
                  <Image
                    src="/Right_B.png"
                    alt=""
                    width={22}
                    height={22}
                  />
                </h3>

                <FeatureItem
                  title="Job-Specific Simulations:"
                  description="Practice with questions tailored to your target role, ensuring relevance and preparation."
                />

                <FeatureItem
                  title="Actionable Feedback"
                  description="Get detailed analysis of your responses and practical, step-by-step improvement suggestions."
                />

                <FeatureItem
                  title="Boost Success Rates:"
                  description="Perfect your interview skills and increase your chances of landing the job you want."
                />
              </div>

              {/* CTA Button - Always visible with proper spacing */}
              <div className="relative z-10 mt-6 mb-6 flex items-center justify-center">
                <Link 
                  href="/avatar" 
                  onClick={onClose} 
                  className="w-full max-w-[280px] sm:max-w-[234px] block"
                >
                  <div
                    className="relative w-full flex items-center justify-center"
                    style={{
                      minHeight: '50px',
                      borderRadius: '31px',
                      cursor: 'pointer'
                    }}
                  >
                    <Image
                      src="/Button.png"
                      alt="Mock Interview"
                      width={234}
                      height={45}
                      className="object-contain"
                      style={{ 
                        borderRadius: '31px',
                        width: '100%',
                        height: 'auto',
                        maxHeight: '50px',
                        display: 'block'
                      }}
                    />
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

