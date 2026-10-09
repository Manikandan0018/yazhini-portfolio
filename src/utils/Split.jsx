import React from "react";
import gsap from "gsap";

export const wave = (e) => {
  const el = e.currentTarget;
  const letters = Array.from(el.closest(".split").querySelectorAll(".letter"));
  const idx = letters.indexOf(el);
  letters.forEach((l, i) => {
    const d = Math.abs(i - idx);
    if (d > 3) return;
    gsap
      .timeline()
      .to(l, {
        y: -(20 - d * 5),
        duration: 0.2,
        delay: d * 0.045,
        ease: "power2.out",
        overwrite: "auto",
      })
      .to(l, { y: 0, duration: 0.7, ease: "elastic.out(1, 0.35)" });
  });
};

export const Split = ({ text, className = "" }) => (
  <span className={`split ${className}`} aria-label={text}>
    {text.split(" ").map((word, w) => (
      <React.Fragment key={w}>
        <span className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split("").map((ch, i) => (
            <span
              key={i}
              onMouseEnter={wave}
              className="letter inline-block cursor-default will-change-transform"
            >
              {ch}
            </span>
          ))}
        </span>{" "}
      </React.Fragment>
    ))}
  </span>
);
