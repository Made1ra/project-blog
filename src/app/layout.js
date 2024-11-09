import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";

import {
  BLOG_TITLE,
  BLOG_DESCRIPTION,
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
  // TODO: Dynamic theme depending on user preference
  const theme = "light";

  return (
    <html
      lang="en"
      className={clsx(mainFont.variable, monoFont.variable)}
      data-color-theme={theme}
      style={theme === "light" ? LIGHT_TOKENS : DARK_TOKENS}
    >
      <body>
        <Header theme={theme} />
        <main>
          <RespectMotionPreferences>{children}</RespectMotionPreferences>
        </main>
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
