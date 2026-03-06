"use client";

import { HeroSection } from "@/components/hero-section";
import Navbar from "@/components/Navbar";
import NavbarDemo from "@/components/resizable-navbar-demo";
import { Icons } from "@/components/ui/icons";
import React from "react";

export default function HeroSectionDemo() {
  return (
    <React.Fragment>
      <NavbarDemo />
      <HeroSection
        badge={{
          text: "Introducing our new components",
          action: {
            text: "Learn more",
            href: "/docs",
          },
        }}
        title="Build faster with beautiful components"
        description="Premium UI components built with React and Tailwind CSS. Save time and ship your next project faster with our ready-to-use components."
        actions={[
          {
            text: "Get Started",
            href: "/sign-in",
            variant: "default",
          },
          {
            text: "GitHub",
            href: "https://github.com/heyy-kartik/Video-conferencing-app",
            variant: "glow",
            icon: <Icons.gitHub className="h-5 w-5" />,
          },
        ]}
        image={{
          light: "/images/app-light.png",
          dark: "/images/app-dark.png",
          alt: "UI Components Preview",
        }}
      />
    </React.Fragment>
  );
}
