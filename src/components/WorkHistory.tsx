'use client';
import React, { useEffect, useRef, useState } from 'react';

const workHistoryContent = [
  {
    company: 'Vanta',
    duration: '2023 – 2025',
    role: 'Senior Software Engineer',
    description: `At Vanta, I contributed to the company's growth beyond $100M ARR and a $2.45B valuation by leading development on key features in Vanta AI and the Trust Center. 
    I drove full-stack initiatives that enhanced security automation and user experience, embedding LLMs to streamline compliance workflows. 
    My engineering contributions supported enterprise-scale reliability and helped Vanta earn recognition as Fast Company's #1 Most Innovative Security Company of 2024.`
  },
  {
    company: 'Labelbox',
    duration: '2018 – 2023',
    role: 'Staff Software Engineer / Software Engineering Lead',
    description: `At Labelbox, I contributed to the company's growth from early-stage startup to a leader in data-centric AI, supporting its rise to a $1B valuation. 
    I played a key role in platform engineering during major funding rounds totaling $189M and collaborated on initiatives that enabled over 50% YoY revenue growth. 
    I also helped scale systems adopted by major enterprise and government clients, including the Department of Defense, while contributing to a culture that earned Labelbox a spot on Forbes' "Next Billion-Dollar Startups" list.`
  },  
  {
    company: 'DroneDeploy',
    duration: '2017 – 2018',
    role: 'Frontend Engineer',
    description: `At DroneDeploy, I built real-time geospatial interfaces using React, Redux, and mapping libraries like Mapbox. 
    I engineered reusable UI components and optimized frontend performance for drone-mapping applications. 
    My work on frontend build systems using Webpack streamlined deployment and enhanced developer velocity.`,
  },
  {
    company: 'CircleUp',
    duration: '2015 – 2017',
    role: 'Software Engineer',
    description: `At CircleUp, I developed production-level web apps using React and Redux, and implemented server-side rendering with Node.js to improve SEO and load times. 
    I focused on enhancing user experience across key product areas through modular frontend architectures and real-time interactions.`,
  },
  {
    company: 'Cisco',
    duration: '2014 - 2015',
    role: 'Software Engineer',
    description: `At Cisco, I contributed to network automation and monitoring tools using Java, JavaScript, and Python. 
    I collaborated on system integration efforts across large-scale networking infrastructure, ensuring secure and reliable communication between services.`,
  },
];
  

  const WorkHistory: React.FC = () => {
    const [circleY, setCircleY]     = useState(0);
    const [fillScale, setFillScale] = useState(1);
    const animationFrameRef         = useRef<number>();
    
    const topOffset      = 2250;
    const moonSize       = 60;
    const maxLineHeight  = 1150;
    
    // Refs for targets & current values
    const targetScaleRef = useRef(1);
    const currentScaleRef= useRef(1);
    const targetYRef     = useRef(0);
    const currentYRef    = useRef(0);
    
    useEffect(() => {
     const handleScroll = () => {
       const scrollTop = window.scrollY;
       if (scrollTop < topOffset) {
         targetScaleRef.current = 1;
         targetYRef.current     = 0;
         return;
       }
       const adjusted = scrollTop - topOffset;
       const docHeight = document.documentElement.scrollHeight
                         - topOffset
                         - window.innerHeight;
       const pct = docHeight <= 0 ? 0 : Math.min(adjusted / docHeight, 1);
       targetScaleRef.current = 1 - pct;
       targetYRef.current     = maxLineHeight * pct;
     };
    
     const animate = () => {
       // simple linear interpolation
       const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
       const dynamicSpeed = Math.min(0.35, Math.max(0.05, 450 / maxLineHeight)); // Adjust 300 as a tuning constant
       
       // ease current → target
       currentScaleRef.current = lerp(currentScaleRef.current, targetScaleRef.current, dynamicSpeed);
       currentYRef.current     = lerp(currentYRef.current,     targetYRef.current,     dynamicSpeed);
    
       // flush into React
       setFillScale(currentScaleRef.current);
       setCircleY(currentYRef.current);
    
       animationFrameRef.current = requestAnimationFrame(animate);
     };
    
     window.addEventListener('scroll', handleScroll);
     animationFrameRef.current = requestAnimationFrame(animate);
    
     return () => {
       window.removeEventListener('scroll', handleScroll);
       if (animationFrameRef.current) {
         cancelAnimationFrame(animationFrameRef.current);
       }
     };
    }, []);

  const shadowOffset = moonSize/2 + moonSize * fillScale;
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
            backgroundImage:
              'linear-gradient(to bottom, #60E4FC, transparent)',
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

      {/* Moon with realistic eclipse mask + glow */}
      <svg
        width={moonSize}
        height={moonSize}
        style={{
          position: 'absolute',
          top: `${circleY}px`,
          left: `calc(25% - ${moonSize/2}px)`,
          zIndex: 10,
          overflow: 'visible',
        }}
        aria-hidden="true"
      >
        <defs>
          {/* 1) your eclipse mask */}
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

          {/* 2) glow filter */}
          <filter
            id="moon-glow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            {/* blur the graphic that comes through the mask */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blurred" />
            {/* stack the blur behind the original so it looks like a halo */}
            <feMerge>
              <feMergeNode in="blurred" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 3) wrap the masked image in a group that gets the glow */}
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

      {/* … your work history entries … */}

      {/* 4) add this style tag somewhere in your component (or put it in your global CSS) */}
      <style jsx>{`
        .moon-glow {
          /* pulse the strength of the glow by animating the blur radius */
          animation: glow-pulse 3s ease-in-out infinite;
        }
        @keyframes glow-pulse {
          0%, 100% {
            /* small, tight glow */
            filter: drop-shadow(0 0 4px rgba(96, 228, 252, 0.6));
          }
          50% {
            /* soft, more spread-out glow */
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
