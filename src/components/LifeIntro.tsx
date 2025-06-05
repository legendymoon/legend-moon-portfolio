'use client';
import React, { useEffect, useRef, useState } from 'react';

const timelineBlocks = [
  {
    title: 'From Singapore to Carnegie Mellon',
    imageSrc: '/carnegie_graudate.jpeg',
    reverse: false,
    description: (
      <>
     I was born in Singapore, always curious about how things worked—taking apart toys, playing with gadgets, and asking “why” more than anyone wanted to hear.
     In my teens, I stumbled into coding and instantly loved how it let me build things from scratch, just by typing on a screen.
     That spark took me all the way to Carnegie Mellon in 2010, where I studied Electrical & Computer Engineering and began turning that curiosity into a career.
      </>
    ),
  },  
  {
    title: 'Finding My Way to Startups',
    imageSrc: '/startup_building.jpg', // swap in a startup-relevant image
    reverse: true,
    description: (
      <>
        I started my journey in enterprise at Cisco, but the pace felt too slow for the kind of builder I wanted to become. 
        I craved fast-moving teams, scrappy problem-solving, and the thrill of launching real products. 
        CircleUp was my first step into that world, followed by DroneDeploy and Labelbox—each one pushing me deeper into full-stack systems, infrastructure, and leading high-impact projects. 
        Once I got a taste of startup life, I never looked back.
      </>
    ),
  },  
  {
    title: 'Life Beyond the Terminal',
    imageSrc: '/tracy_and_me.jpg',
    reverse: false,
    description: (
      <>
        In the whirlwind of startups and late-night deployments, I wasn't expecting to meet someone who'd shift my entire perspective. 
        But in 2024, I met Tracy—and everything changed. Our connection was instant, grounded, and real in a way that made the noise fade.
        <br /><br />
        She's brought balance to my life, a calm counterpoint to my drive. Whether we're hiking, cooking, or just quietly reading side by side, I've found a new kind of fulfillment—one that no line of code could ever match.
      </>
    ),
  },  
  {
    title: 'Pushing the Boundaries of AI',
    imageSrc: '/me_2025.jpeg', // Swap with an image that fits the AI theme if desired
    reverse: true,
    description: (
      <>
        At Vanta, I've been focused on bringing AI into the heart of security and compliance. 
        I've led initiatives to integrate large language models into our platform—automating complex reviews, surfacing insights faster, and making it easier for companies to stay secure without slowing down. 
        It's a space that's traditionally manual and opaque, and I'm excited to be building tools that are making it smarter, clearer, and more adaptive.
      </>
    ),
  },  
];

const LifeIntro: React.FC = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0); // Corrected initial angle
  const targetDistanceRef = useRef(0);
  const currentDistanceRef = useRef(0);
  const previousDistanceRef = useRef(0);
  const scrollDirectionRef = useRef<'forward' | 'backward'>('forward');
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const pathLength = path.getTotalLength();

    const lerp = (start: number, end: number, amt: number) => start + (end - start) * amt;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const speedFactor = 1.3;
      const targetDistance = scrollTop * speedFactor;
      targetDistanceRef.current = targetDistance;
    };

    const animate = () => {
      const path = pathRef.current;
      if (!path) return;

      const target = targetDistanceRef.current;
      const current = lerp(currentDistanceRef.current, target, 0.1);
      currentDistanceRef.current = current;

      // Detect direction
      const direction = current >= previousDistanceRef.current ? 'forward' : 'backward';
      scrollDirectionRef.current = direction;
      previousDistanceRef.current = current;

      // Point and angle
      const point = path.getPointAtLength(current);
      const next = path.getPointAtLength(Math.min(current + 1, pathLength));

      let dx = next.x - point.x;
      let dy = next.y - point.y;

      // Flip direction vector instead of adding 180 to angle
      if (scrollDirectionRef.current === 'backward') {
        dx = -dx;
        dy = -dy;
      }

      let theta = Math.atan2(dy, dx) * (180 / Math.PI);

      // Apply only one consistent visual offset
      theta += 90;

      setCirclePosition({ x: point.x, y: point.y });
      setAngle(theta);


      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameRef.current!);
    };
  }, []);

  const renderBlock = (block: typeof timelineBlocks[0], index: number) => (
    <div
      key={index}
      style={{
        display: 'flex',
        flexDirection: block.reverse ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
        padding: '6rem 0',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: 'fit-content' }}>
          <div style={{ border: '1px solid var(--border-primary)', borderRadius: '20px', padding: '0.5rem', width: '188px', height: '278px' }}>
            <div
              style={{
                display: 'grid',
                placeItems: 'center',
                height: '100%',
                borderRadius: '0.75rem',
                border: '2px solid rgba(165, 174, 184, 0.12)',
                backgroundColor: '#EDEEF0',
                boxShadow: 'inset 0px 2px 1.5px 0px rgba(165, 174, 184, 0.32)',
              }}
            />
          </div>
          <img
            src={block.imageSrc}
            alt={block.title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '270px',
              width: '180px',
              transform: block.reverse ? 'rotate(8deg)' : 'rotate(-8deg)',
              borderRadius: '0.5rem',
              objectFit: 'cover',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
            }}
          />
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h2 style={{
          marginBottom: '1rem',
          fontSize: '1.875rem',
          fontWeight: 500,
          lineHeight: '2.5rem',
          color: 'var(--text-primary)',
        }}>
          {block.title}
        </h2>
        <div style={{
          fontSize: '1rem',
          lineHeight: '2rem',
          color: 'var(--text-secondary)',
        }}>
          {block.description}
        </div>
      </div>
    </div>
  );

  return (
    <div className="position-relative w-full overflow-hidden px-4 py-16 lg:px-24">
      <div className="position-absolute top-0 -translate-x-1/2 z-0 pointer-events-none" style={{ left: '34%' }}>
        <svg
          className="user-select-none hidden lg:block"
          width="380"
          height="1787"
          viewBox="-10 -10 380 1795"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="purpleGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="0 0 0 0 0.376 0 0 0 0 0.894 0 0 0 0 0.988 0 0 0 0.6 0"
              />
            </filter>
            <mask id="strokeMask">
              <path
                d="M145 0.5L145 43C145 51.8365 137.836 59 129 59L20 59C11.1633 59 4 66.1634 4 75L4 515C4 523.837 11.163 531 20 531L256 531C264.836 531 272 538.163 272 547L272 830.373C272 834.616 270.314 838.686 267.314 841.686L78.6861 1030.31C75.6855 1033.31 71.6158 1035 67.3724 1035L20 1035C11.163 1035 4 1042.16 4 1051L4 1471C4 1479.84 11.1631 1487 20 1487L256 1487C264.836 1487 272 1494.16 272 1503L272 1757C272 1765.84 279.163 1773 288 1773L380 1773"
                stroke="white"
                strokeWidth="8"
                strokeLinejoin="round"
                fill="none"
              />
            </mask>
          </defs>

          <path
            ref={pathRef}
            d="M145 0.5L145 43C145 51.8365 137.836 59 129 59L20 59C11.1633 59 4 66.1634 4 75L4 515C4 523.837 11.163 531 20 531L256 531C264.836 531 272 538.163 272 547L272 830.373C272 834.616 270.314 838.686 267.314 841.686L78.6861 1030.31C75.6855 1033.31 71.6158 1035 67.3724 1035L20 1035C11.163 1035 4 1042.16 4 1051L4 1471C4 1479.84 11.1631 1487 20 1487L256 1487C264.836 1487 272 1494.16 272 1503L272 1757C272 1765.84 279.163 1773 288 1773L380 1773"
            stroke="#D6DADE"
            strokeOpacity="0.24"
            strokeWidth="8"
            strokeLinejoin="round"
            fill="none"
          />

          <g mask="url(#strokeMask)">
            <ellipse
              cx={circlePosition.x}
              cy={circlePosition.y}
              rx="100"
              ry="100"
              fill="#60E4FC"
              opacity="0.9"
              filter="url(#purpleGlow)"
              transform={`rotate(${angle} ${circlePosition.x} ${circlePosition.y}) translate(60 0)`}
            />
          </g>

          <image
            href="/images/illustrator/plane.png"
            x={circlePosition.x - 50}
            y={circlePosition.y - 50}
            width="100"
            height="100"
            transform={`rotate(${angle} ${circlePosition.x} ${circlePosition.y})`}
          />
        </svg>
      </div>

      {timelineBlocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default LifeIntro;
