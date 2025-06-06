"use client";

import { useState } from "react";
import { Column, SegmentedControl } from "@/once-ui/components";
import { Posts } from "./Posts";

const tagMap = {
  all: "",
  personal: "Personal",
  career: "Career",
  startups: "Startups",
  ai: "AI",
  innovation: "Innovation",
  programming: "Programming",
  tech: "Tech",
  culture: "Culture",
};

export default function BlogClient({ allPosts }: { allPosts: any[] }) {
  const [selected, setSelected] = useState<keyof typeof tagMap>("all");

  return (
    <Column fillWidth flex={1}>
      <SegmentedControl
        fillWidth={false}
        marginBottom="m"
        buttons={[
          { value: "all", label: "All" },
          { value: "personal", label: "Personal" },
          { value: "career", label: "Career" },
          { value: "startups", label: "Startups" },
          { value: "ai", label: "AI" },
          { value: "innovation", label: "Innovation" },
          { value: "programming", label: "Programming" },
          { value: "tech", label: "Tech" },
          { value: "culture", label: "Culture" }
        ]}        
        onToggle={(value) => setSelected(value as keyof typeof tagMap)}
      />
      <Posts
        posts={allPosts}
        tag={tagMap[selected]}
        thumbnail
        direction="row"
      />
    </Column>
  );
}
