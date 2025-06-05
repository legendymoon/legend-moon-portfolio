"use client";

import React, { useEffect, useRef, useState } from "react";
import { PieChart, BarChart } from "@/once-ui/modules";
import { Row } from "@/once-ui/components";

const ChartWrapper = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!chartRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // trigger once
        }
      },
      {
        root: null,
        rootMargin: "0px", // delay trigger
        threshold: 0.4,
      }
    );

    observer.observe(chartRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={chartRef}>
      {visible && (
        <>
         <Row
            fillWidth
            gap="m"
            marginBottom="xl"
            className="space-y-4"
            align="center"
          >
            <PieChart
              title="Tech Impact Focus"
              legend={{
                display: true,
                position: "bottom-center",
              }}
              ring={{ inner: 40, outer: 70 }}
              series={{
                key: "value",
              }}
              origo={{ x: 50, y: 40 }}
              data={[
                { name: "Mentorship & Collaboration", value: 20 },
                { name: "Start-up Agility & Growth", value: 25 },
                { name: "Security & Compliance Automation", value: 15 },
                { name: "AI/LLM Innovation", value: 20 },
                { name: "System Architecture", value: 20 },
              ]}
            />

            <BarChart
              title="Technical Experience (Years)"
              axis="x"
              barWidth="xl"
              legend={{ position: "bottom-center" }}
              series={[{ key: "Years", color: "cyan" }]}
              data={[
                { label: "TypeScript", Years: 7 },
                { label: "React", Years: 7 },
                { label: "Node.js", Years: 7 },
                { label: "Python", Years: 6 },
                { label: "Go", Years: 4 },
                { label: "GraphQL", Years: 5 },
                { label: "GCP/AWS", Years: 6 },
              ]}
            />
          </Row>
        </>
      )}
    </div>
  );
};

export default ChartWrapper;
