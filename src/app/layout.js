import { cookies } from "next/headers";
import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";

import {
  BLOG_TITLE,
  BLOG_DESCRIPTION,
  COLOR_THEME_COOKIE_NAME,
  LIGHT_TOKENS,
  DARK_TOKENS,
} from "@/constants";

import Header from "@/components/Header";
import RespectMotionPreferences from "@/components/RespectMotionPreferences";
import Footer from "@/components/Footer";
import "./styles.css";

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});

export const metadata = {
  title: {
    template: `%s • ${BLOG_TITLE}`,
    default: BLOG_TITLE,
  },
  description: BLOG_DESCRIPTION,
};

function RootLayout({ children }) {
  const savedTheme = cookies().get(COLOR_THEME_COOKIE_NAME);
  const initialTheme = savedTheme?.value || "dark";

  return (
    <html
      lang="en"
      className={clsx(mainFont.variable, monoFont.variable)}
      data-color-theme={initialTheme}
      style={initialTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS}
    >
      <body>
        <Header initialTheme={initialTheme} />
        <main>
          <RespectMotionPreferences>{children}</RespectMotionPreferences>
        </main>
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
