import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Split } from "./utils/Split";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "yazhini0304@outlook.com";
const PHONE = "+91 90258 52241";

const rows = [
  ["Email", EMAIL, `mailto:${EMAIL}`],
  ["Phone", PHONE, "tel:+919025852241"],
  ["Location", "Puducherry, India", null],
];

export const Contact = () => {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const toggle = "play reverse play reverse";

      /* big marquee text: two rows scrubbed in opposite directions */
      gsap.fromTo(
        ".m1",
        { xPercent: 0 },
        {
          xPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
      gsap.fromTo(
        ".m2",
        { xPercent: -30 },
        {
          xPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );

      /* headline: letters rise with a slight rotation */
      gsap.fromTo(
        ".contact-title .letter",
        { y: 120, opacity: 0, rotate: 10 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 1,
          stagger: 0.03,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: ".contact-title",
            start: "top 85%",
            toggleActions: toggle,
          },
        },
      );

      /* paragraph */
      gsap.fromTo(
        ".contact-text",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-text",
            start: "top 88%",
            toggleActions: toggle,
          },
        },
      );

      /* contact rows: slide in + underline draws */
      gsap.fromTo(
        ".c-row",
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".c-rows",
            start: "top 85%",
            toggleActions: toggle,
          },
        },
      );
      gsap.fromTo(
        ".c-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.inOut",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: ".c-rows",
            start: "top 85%",
            toggleActions: toggle,
          },
        },
      );

      /* hire button: pops in, ring keeps spinning */
      gsap.fromTo(
        ".hire-wrap",
        { scale: 0, rotate: -90 },
        {
          scale: 1,
          rotate: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: ".hire-wrap",
            start: "top 90%",
            toggleActions: toggle,
          },
        },
      );
      gsap.to(".spin", {
        rotation: 360,
        duration: 14,
        repeat: -1,
        ease: "none",
      });

      /* footer fade */
      gsap.fromTo(
        ".c-foot",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".c-foot",
            start: "top 98%",
            toggleActions: toggle,
          },
        },
      );
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  /* row hover: white fill wipes in */
  const rowEnter = (e) => {
    gsap.to(e.currentTarget.querySelector(".r-fill"), {
      scaleX: 1,
      duration: 0.45,
      ease: "power3.out",
    });
    gsap.to(e.currentTarget, { color: "#000", duration: 0.3 });
    gsap.to(e.currentTarget.querySelector(".r-val"), {
      x: 14,
      duration: 0.4,
      ease: "power3.out",
    });
  };
  const rowLeave = (e) => {
    gsap.to(e.currentTarget.querySelector(".r-fill"), {
      scaleX: 0,
      duration: 0.45,
      ease: "power3.out",
    });
    gsap.to(e.currentTarget, { color: "#fff", duration: 0.3 });
    gsap.to(e.currentTarget.querySelector(".r-val"), {
      x: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  /* magnetic hire button */
  const btnMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(e.currentTarget, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.4,
      ease: "power3.out",
    });
  };
  const btnEnter = (e) =>
    gsap.to(e.currentTarget, {
      backgroundColor: "#fff",
      color: "#000",
      scale: 1.08,
      duration: 0.3,
    });
  const btnLeave = (e) =>
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      scale: 1,
      backgroundColor: "rgba(255,255,255,0)",
      color: "#fff",
      duration: 0.9,
      ease: "elastic.out(1, 0.4)",
    });

  const marq = "HIRE ME — LET'S TALK — OPEN TO WORK — ";

  return (
    <section
      ref={root}
      id="contact"
      className="relative w-full overflow-hidden bg-[#0a0a0a] py-20 text-white"
    >
      {/* giant marquee background */}
      <div className="pointer-events-none select-none space-y-2 opacity-[0.07]">
        <div className="m1 flex w-max whitespace-nowrap text-7xl font-extrabold uppercase sm:text-9xl">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>{marq}</span>
          ))}
        </div>
        <div className="m2 flex w-max whitespace-nowrap text-7xl font-extrabold uppercase sm:text-9xl">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>{marq}</span>
          ))}
        </div>
      </div>

      <div className="relative mt-16 grid grid-cols-1 gap-16 px-6 sm:px-10 lg:grid-cols-[1.2fr_1fr] lg:px-16">
        {/* left */}
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/50">
            Contact
          </p>
          <h2 className="contact-title text-5xl font-extrabold uppercase leading-[1.05] sm:text-7xl lg:text-8xl">
            <Split text="Let's work" />
            <br />
            <Split text="together." />
          </h2>
          <p className="contact-text mt-8 max-w-xl text-base leading-relaxed text-white/70 sm:text-xl">
            I'm looking for a responsible position in a reputable organization
            where I can use my technical and interpersonal skills to contribute
            to the company's growth, while continuously learning and developing
            my abilities.
          </p>

          {/* Hire me button */}
          <div className="hire-wrap relative mt-12 h-48 w-48 sm:h-56 sm:w-56">
            <div className="spin absolute inset-0 rounded-full border border-dashed border-white/50" />
            <a
              href={`mailto:${EMAIL}?subject=Hiring%20Inquiry`}
              onMouseMove={btnMove}
              onMouseEnter={btnEnter}
              onMouseLeave={btnLeave}
              className="absolute inset-4 flex items-center justify-center rounded-full border border-white text-xl font-extrabold uppercase sm:text-2xl"
            >
              Hire me ↗
            </a>
          </div>
        </div>

        {/* right: contact rows */}
        <div className="c-rows flex flex-col justify-end">
          {rows.map(([label, value, href]) => {
            const Tag = href ? "a" : "div";
            return (
              <Tag
                key={label}
                href={href || undefined}
                onMouseEnter={rowEnter}
                onMouseLeave={rowLeave}
                className="c-row relative block overflow-hidden px-4 py-6 text-white"
              >
                <span className="r-fill absolute inset-0 origin-left scale-x-0 bg-white" />
                <span className="c-line absolute bottom-0 left-0 h-px w-full bg-white/30" />
                <span className="relative z-10 block text-xs uppercase tracking-widest opacity-60">
                  {label}
                </span>
                <span className="r-val relative z-10 mt-1 block break-all text-xl font-semibold sm:text-3xl">
                  {value}
                </span>
              </Tag>
            );
          })}
        </div>
      </div>

      <div className="c-foot relative mt-24 px-6 text-center text-sm text-white/40 sm:px-10">
        © 2026 Yazhini Saravanan · Puducherry, India
      </div>
    </section>
  );
};
