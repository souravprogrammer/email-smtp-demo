"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

export const TextGenerateEffect = ({
  words,
  Icon,
  className,
  valid = false,
}: {
  words: string;
  className?: string;
  Icon?: IconType;
  valid: boolean;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="flex gap-2 items-center flex-wrap">
        <motion.span
          className={`opacity-0 ${valid ? "text-green-500" : "text-red-500"}`}
        >
          {Icon ? <Icon className="w-[1.2rem]" /> : null}
        </motion.span>

        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className={`opacity-0 text-sm ${
                valid ? "text-green-500" : "text-red-500"
              }`}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div>
        <div className="flex items-center gap-2 dark:text-white text-black text-2xl leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
