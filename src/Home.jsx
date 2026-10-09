import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import homeimg from "../public/home.png";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  "Graphic Design",
  "UI/UX Design",
  "Branding",
  "Social Media",
];

export const Home = () => {
  const root = useRef(null);

  useLayoutEffect(() => {
    // ---------- Smooth scroll (Lenis + GSAP) ----------
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // ---------- 1) Intro ----------
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-img", { opacity: 0, duration: 1 })
        .from(
          ".cat-btn",
          { y: 40, opacity: 0, stagger: 0.12, duration: 0.7 },
          "-=0.4",
        )
        .from(".text-inner", { y: 30, opacity: 0, duration: 0.7 }, "-=0.4");

      // ---------- 2) Scroll (scrub: down = play, up = reverse) ----------
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=100%",
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        })
        .to(".hero-img", { scale: 1.2, yPercent: -5, ease: "none" }, 0)
        .to(".btn-wrap", { y: -80, opacity: 0, ease: "none" }, 0.3)
        .to(".text-wrap", { y: -100, opacity: 0, ease: "none" }, 0.4);
    }, root);

    // recalculate once the image has loaded so pin sizes are correct
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // ---------- Hover effects ----------
  const onEnter = (e) =>
    gsap.to(e.currentTarget, {
      scale: 1.1,
      backgroundColor: "#ffffff",
      color: "#000000",
      duration: 0.3,
      ease: "power2.out",
    });

  const onLeave = (e) =>
    gsap.to(e.currentTarget, {
      scale: 1,
      backgroundColor: "rgba(255,255,255,0)",
      color: "#ffffff",
      duration: 0.3,
      ease: "power2.out",
    });

  const onTextEnter = (e) =>
    gsap.to(e.currentTarget, {
      x: 10,
      letterSpacing: "0.15em",
      duration: 0.4,
      ease: "power2.out",
    });

  const onTextLeave = (e) =>
    gsap.to(e.currentTarget, {
      x: 0,
      letterSpacing: "0.025em",
      duration: 0.4,
      ease: "power2.out",
    });

  return (
    <div
      ref={root}
      className="relative h-[100svh] w-full overflow-hidden bg-black md:h-auto"
    >
      {/* Image: covers the full screen on mobile, natural ratio on md+ */}
      <img
        src={homeimg}
        alt="Portfolio background"
        className="hero-img block h-full w-full object-cover object-[65%_center] md:h-auto md:object-fill"
      />

      {/* Category Buttons */}
      <div className="btn-wrap absolute bottom-[14%] left-4 right-4 flex flex-wrap gap-2 md:bottom-auto md:left-[2%] md:right-auto md:top-[72%] md:gap-3">
        {categories.map((item) => (
          <span
            key={item}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="cat-btn cursor-pointer rounded-full border border-white/70 px-3 py-1 text-[11px] text-white sm:text-xs md:px-4 md:py-1 md:text-[10px] lg:px-5 lg:py-1.5 lg:text-sm"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Bottom Left Text */}
      <div className="text-wrap absolute bottom-[4%] left-4 text-white md:left-[2%]">
        <div className="text-inner">
          <p className="text-[11px] text-white/70 sm:text-xs lg:text-sm">
            or just google me
          </p>
          <h1
            onMouseEnter={onTextEnter}
            onMouseLeave={onTextLeave}
            className="cursor-pointer text-base font-semibold tracking-wide sm:text-xl lg:text-2xl"
          >
            YAZHINI
          </h1>
        </div>
      </div>
    </div>
  );
};
