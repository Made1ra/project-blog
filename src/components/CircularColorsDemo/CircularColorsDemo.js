"use client";

import { useId, useState, useEffect } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";

import useToggle from "@/app/hooks/use-toggle";
import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const id = useId();

  const [isPlaying, toggleIsPlaying] = useToggle();
  const [timeElapsed, setTimeElapsed] = useState(0);

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  const reset = () => {
    setTimeElapsed(0);
    if (isPlaying) {
      toggleIsPlaying();
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeElapsed((timeElapsed) => timeElapsed + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying]);

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId={id}
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={toggleIsPlaying}>
            {isPlaying ? <Pause /> : <Play />}
            <VisuallyHidden>{isPlaying ? "Pause" : "Play"}</VisuallyHidden>
          </button>
          <button onClick={reset}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
