"use client";

import { useState } from "react";
import { Sun, Moon } from "react-feather";
import Cookie from "js-cookie";

import { LIGHT_TOKENS, DARK_TOKENS } from "@/constants";
import VisuallyHidden from "@/components/VisuallyHidden";

function DarkLightToggle({ initialTheme, className = "" }) {
  const [theme, setTheme] = useState(initialTheme);

  const handleClick = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);

    Cookie.set("color-theme", nextTheme, {
      expires: 400,
    });

    const root = document.documentElement;
    const colors = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

    root.setAttribute("data-color-theme", nextTheme);

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  return (
    <button onClick={handleClick} className={className}>
      {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}

export default DarkLightToggle;
