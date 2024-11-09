"use client";

import { useId, useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import clsx from "clsx";

import { range } from "@/utils";
import Card from "@/components/Card";
import SliderControl from "@/components/SliderControl";
import Equation from "./Equation";

import styles from "./DivisionGroupsDemo.module.css";

function DivisionGroupsDemo({
  numOfItems = 12,
  initialNumOfGroups = 1,
  includeRemainderArea,
}) {
  const id = useId();

  const [numOfGroups, setNumOfGroups] = useState(initialNumOfGroups);

  const items = range(numOfItems);

  const numOfItemsPerGroup = Math.floor(numOfItems / numOfGroups);

  const remainder = includeRemainderArea ? numOfItems % numOfGroups : null;

  // When we're splitting into 1-3 groups, display side-by-side
  // columns. When we get to 4, it should switch to a 2x2 grid.
  const gridStructure =
    numOfGroups < 4
      ? {
          gridTemplateColumns: `repeat(${numOfGroups}, 1fr)`,
        }
      : {
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
        };

  return (
    <LayoutGroup>
      <Card as="section" className={styles.wrapper}>
        <header className={styles.header}>
          <SliderControl
            label="Number of Groups"
            className={styles.slider}
            step={1}
            min={1}
            max={4}
            value={numOfGroups}
            onChange={(ev) => setNumOfGroups(Number(ev.target.value))}
          />
        </header>

        <div className={styles.demoWrapper}>
          <div className={clsx(styles.demoArea)} style={gridStructure}>
            {range(numOfGroups).map((groupIndex) => (
              <div key={groupIndex} className={styles.group}>
                {items
                  .slice(
                    groupIndex * numOfItemsPerGroup,
                    groupIndex * numOfItemsPerGroup + numOfItemsPerGroup
                  )
                  .map((index) => {
                    const itemId = `${id}-${index}`;

                    return (
                      <motion.div
                        key={itemId}
                        layoutId={itemId}
                        className={styles.item}
                      />
                    );
                  })}
              </div>
            ))}
          </div>
          itemId
        </div>

        {includeRemainderArea && (
          <div className={styles.remainderArea}>
            <p className={styles.remainderHeading}>Remainder Area</p>

            {items
              .toReversed()
              .slice(0, remainder)
              .map((index) => {
                const itemId = `${id}-${index}`;

                return (
                  <motion.div
                    key={itemId}
                    layoutId={itemId}
                    className={styles.item}
                  />
                );
              })}
          </div>
        )}

        <Equation
          dividend={numOfItems}
          divisor={numOfGroups}
          remainder={remainder}
        />
      </Card>
    </LayoutGroup>
  );
}

export default DivisionGroupsDemo;
