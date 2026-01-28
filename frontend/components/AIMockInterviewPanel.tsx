"use client";

import Link from "next/link";
import Image from "next/image";

interface FeatureItemProps {
  title: string;
  description: string;
}

const FeatureItem = ({ title, description }: FeatureItemProps) => (
  <div className="mb-5">
    <h4 className="font-semibold text-sm text-gray-800 mb-1">{title}</h4>
    <p className="text-sm text-gray-700 leading-relaxed">
      <span className="mr-2">•</span>
      {description}
    </p>
  </div>
);

export default function AIMockInterviewPanel() {
  return (
    <div className="rounded-xl overflow-hidden shadow-sm relative bg-white h-full flex flex-col w-full">
      {/* Eclipse decorative effect - Responsive across all screen sizes */}
      <div
        className="absolute eclipse-effect"
        style={{
          width: 'clamp(250px, 100%, 395px)',
          height: 'clamp(250px, 100%, 395px)',
          left: '50%',
          top: 'clamp(-38px, -10%, -20px)',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(180deg, rgba(0, 194, 255, 0) 0%, rgba(255, 148, 228, 0.76) 100%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Top Section */}
      <div className="relative z-10 p-6 pb-4 flex-shrink-0">
        {/* Right_A Icon - Above heading */}
        <div className="mb-2" style={{ marginLeft: '1px' }}>
          <Image
            src="/Right_A.png"
            alt=""
            width={30}
            height={30}
          />
        </div>

        {/* Heading */}
        <h2 className="text-xl font-bold text-gray-800 mb-3 leading-tight text-left">
          Ace Your Interviews with AI-Powered Mock Sessions!
        </h2>

        {/* Introductory Paragraph */}
        <p className="text-sm text-gray-700 leading-relaxed text-left">
          Struggling with interview nerves or unsure how to prepare? Let our cutting-edge AI mock interviews help you shine!
        </p>
      </div>

      {/* Horizontal Separator */}
      <div className="relative z-10 border-t border-gray-200 mx-6"></div>

      {/* Why Choose Section */}
      <div className="relative z-10 px-6 py-4 flex-1">
        <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
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

      {/* CTA Button */}
      <div className="relative z-10 px-6 pb-6 flex-shrink-0 flex items-center justify-center">
        <Link href="/avatar/tavus" className="block">
          <div
            className="relative"
            style={{
              width: '234px',
              height: '45px',
              borderRadius: '31px',
              cursor: 'pointer'
            }}
          >
            <Image
              src="/Button.png"
              alt="Mock Interview"
              width={234}
              height={45}
              className="object-contain w-full h-full"
              style={{ borderRadius: '31px', display: 'block' }}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
