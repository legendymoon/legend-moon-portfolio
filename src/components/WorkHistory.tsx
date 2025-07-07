'use client';
import React, { useEffect, useState } from 'react';

const workHistoryContent = [
  {
    company: 'Ramp',
    duration: '2023 – Present',
    role: 'Senior Software Engineer',
    description: `In 2023, I joined Ramp as a Senior Software Engineer and founding member of its AI efforts. 
    I led the development of GPT-4-powered workflows that automated expense processing and contract analysis, while contributing to launches like Ramp Procurement and Treasury. 
    During this time, Ramp grew to 40,000 customers and a $16B valuation, reflecting the impact of our work.`,
  },
  {
    company: 'Affirm',
    duration: '2022 – 2023',
    role: 'Senior Software Engineer',
    description: `In 2022, I was promoted to Senior Software Engineer as Affirm crossed $1B in annual revenue and deepened its presence in the fintech landscape. 
    I focused on making our platforms more resilient, driving backend improvements that supported millions of transactions with high availability. 
    It was a period of fast-paced scaling and constant learning, where I honed my ability to deliver reliable systems in a high-growth environment.`,
  },
  {
    company: 'Affirm',
    duration: '2020 – 2022',
    role: 'Software Engineer II',
    description: `In 2020, I stepped into an advanced role as Software Engineer II as Affirm raised a $500M Series G round and prepared to go public. 
    I led initiatives to improve system performance and reliability, helping support the company's IPO in January 2021 and its expansion to major retail partnerships. 
    During this period, Affirm's revenue more than doubled, and I learned how to build infrastructure that could scale with incredible velocity.`,
  },
  {
    company: 'Affirm',
    duration: '2019 – 2020',
    role: 'Software Engineer',
    description: `I joined Affirm in 2019 at a pivotal moment as the company was gaining momentum in the Buy Now, Pay Later space. 
    As part of the payments engineering team, I worked on building secure transaction flows and scaling backend services to handle a surge in demand. 
    The experience gave me a front-row seat to Affirm's rapid growth and laid the groundwork for my advancement into a more senior role.`,
  },
];

const WorkHistory: React.FC = () => {
  const [circleY, setCircleY] = useState(0);
  const [fillScale, setFillScale] = useState(1);

  const topOffset = 2050;
  const moonSize = 60;
  const maxLineHeight = 1150;
  const speedFactor = 1.6;
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (scrollTop < topOffset) {
        setFillScale(1);
        setCircleY(0);
        return;
      }

      const adjusted = scrollTop - topOffset;
      const scrollRange =
        document.documentElement.scrollHeight - window.innerHeight - topOffset;

      const pct = Math.min(Math.max((adjusted * speedFactor) / scrollRange, 0), 1);
      setFillScale(1 - pct);
      setCircleY(maxLineHeight * pct);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shadowOffset = moonSize / 2 + moonSize * fillScale;
  const visualScale = Math.max(0, fillScale - (moonSize - 5) / maxLineHeight);

  return (
    <div className="position-relative w-full overflow-hidden px-4 py-16 lg:px-24">
      {/* Vertical Line & Gradient */}
      <div
        className="position-absolute top-0 transform -translate-x-1/2 z-0 pointer-events-none"
        style={{ left: '25%' }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: '100%',
            transformOrigin: 'bottom',
            transform: `scaleY(${visualScale})`,
            borderRadius: '9999px',
            backgroundImage: 'linear-gradient(to bottom, #60E4FC, transparent)',
          }}
        />
        <svg
          width="8"
          height={maxLineHeight}
          viewBox={`0 0 8 ${maxLineHeight}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="4"
            y1="0"
            x2="4"
            y2={maxLineHeight}
            stroke="#D6DADE"
            strokeOpacity="0.24"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Moon with mask & glow */}
      <svg
        width={moonSize}
        height={moonSize}
        style={{
          position: 'absolute',
          top: `${circleY}px`,
          left: `calc(25% - ${moonSize / 2}px)`,
          zIndex: 10,
          overflow: 'visible',
        }}
        aria-hidden="true"
      >
        <defs>
          <mask
            id="moon-mask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={moonSize}
            height={moonSize}
          >
            <rect width={moonSize} height={moonSize} fill="white" />
            <circle
              cx={shadowOffset}
              cy={moonSize - shadowOffset}
              r={moonSize / 2 + 3}
              fill="black"
            />
          </mask>

          <filter
            id="moon-glow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blurred" />
            <feMerge>
              <feMergeNode in="blurred" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#moon-glow)" className="moon-glow">
          <image
            href="/images/illustrator/moon.png"
            x="0"
            y="0"
            width={moonSize}
            height={moonSize}
            mask="url(#moon-mask)"
            preserveAspectRatio="xMidYMid slice"
          />
        </g>
      </svg>

      <style jsx>{`
        .moon-glow {
          animation: glow-pulse 3s ease-in-out infinite;
        }
        @keyframes glow-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 4px rgba(96, 228, 252, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 12px rgba(96, 228, 252, 0.8));
          }
        }
      `}</style>

      {/* Work History Entries */}
      {workHistoryContent.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '3rem 0',
            flexWrap: 'wrap',
            position: 'relative',
          }}
        >
          <div style={{ flex: 1, textAlign: 'left', paddingRight: '2rem' }}>
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                paddingBottom: '0.2rem',
                color: 'var(--text-primary)',
              }}
            >
              {item.company}
            </h3>
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
              }}
            >
              {item.duration}
            </p>
          </div>
          <div style={{ flex: 2, paddingLeft: '2rem' }}>
            <h4
              style={{
                fontSize: '1.25rem',
                fontWeight: '500',
                paddingBottom: '0.7rem',
                color: 'var(--text-primary)',
              }}
            >
              {item.role}
            </h4>
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
              }}
            >
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkHistory;
