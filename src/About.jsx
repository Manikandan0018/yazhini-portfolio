import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Split } from "./utils/Split";

gsap.registerPlugin(ScrollTrigger);

/* ================= DATA (from your resume) ================= */
const categories = [
  "HTML & CSS",
  "JavaScript",
  "Java & Android",
  "SQL & Firebase",
];

const links = [
  ["Email:", "yazhini0304@outlook.com"],
  ["Phone:", "+91 90258 52241"],
  ["Location:", "Puducherry, India"],
  ["Education:", "MCA, 2025 · CGPA 9.32"],
];

export const About = () => {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const toggle = "play reverse play reverse"; // scroll down = play, scroll up = reverse

      // Headings: letters rise one by one
      gsap.utils.toArray(".reveal-title").forEach((title) => {
        gsap.fromTo(
          title.querySelectorAll(".letter"),
          { y: 60, opacity: 0, rotate: 8 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
              toggleActions: toggle,
            },
          },
        );
      });

      // Paragraphs: soft fade up
      gsap.utils.toArray(".reveal-text").forEach((p) => {
        gsap.fromTo(
          p,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: p,
              start: "top 88%",
              toggleActions: toggle,
            },
          },
        );
      });

      // Big statement: letters wave in
      gsap.fromTo(
        ".statement .letter",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: { each: 0.02, from: "start" },
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".statement",
            start: "top 85%",
            toggleActions: toggle,
          },
        },
      );

      // Links: slide in one by one
      gsap.fromTo(
        ".link-row",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".links",
            start: "top 90%",
            toggleActions: toggle,
          },
        },
      );

      // Buttons: slide in from the right
      gsap.fromTo(
        ".side-btn",
        { x: 120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".side-btns",
            start: "top 85%",
            toggleActions: toggle,
          },
        },
      );

      // Background glow: parallax
      gsap.to(".glow", {
        yPercent: 40,
        xPercent: -15,
        scale: 1.3,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Content drifts at a different speed than the scroll
      gsap.to(".content", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  /* ---------- Button hover ---------- */
  const onEnter = (e) =>
    gsap.to(e.currentTarget, {
      scale: 1.08,
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

  return (
    <section
      ref={root}
      id="about"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#0a0a0a] px-6 py-10 text-white sm:px-10 lg:px-16"
    >
      {/* Background glow */}
      <div
        className="glow pointer-events-none absolute -right-40 -top-40 h-[900px] w-[900px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)",
        }}
      />

      <div className="content relative grid min-h-[calc(100vh-5rem)] w-full grid-cols-1 gap-10 lg:grid-cols-[1fr_auto]">
        {/* Left: text */}
        <div className="flex flex-col justify-between gap-8">
          <div>
            <h2 className="reveal-title mb-3 text-4xl font-extrabold uppercase sm:text-5xl lg:text-6xl">
              <Split text="About Me" />
            </h2>
            <p className="reveal-text text-justify text-base leading-snug text-white/80 sm:text-xl lg:text-2xl xl:text-3xl">
              I am Yazhini Saravanan, an MCA graduate from Puducherry
              Technological University with a CGPA of 9.32, and a B.Sc. in
              Computer Science. I am a fresher looking for a responsible role in
              a reputable organization where I can use my technical and
              interpersonal skills to contribute to its growth while continuing
              to learn.
            </p>
          </div>

          <div>
            <h2 className="reveal-title mb-3 text-4xl font-extrabold uppercase sm:text-5xl lg:text-6xl">
              <Split text="What I Do" />
            </h2>
            <p className="reveal-text text-justify text-base leading-snug text-white/80 sm:text-xl lg:text-2xl xl:text-3xl">
              I build responsive, user-friendly web pages with HTML, CSS and
              JavaScript, and I write backend code in Java for mobile
              applications. I design and query relational databases with SQL,
              and I have built a movie ticket booking system on MySQL and an
              Android app, CGPA Buddy, using Firebase Firestore.
            </p>
          </div>

          <h3 className="statement text-4xl leading-[1.05] sm:text-6xl lg:text-7xl xl:text-8xl">
            <Split
              text="I build clean, responsive web experiences"
              className="font-light"
            />
            <br />
            <Split
              text="that turn ideas into useful digital products."
              className="font-extrabold"
            />
          </h3>

          <div className="links w-full space-y-1 text-lg sm:text-xl lg:text-2xl">
            {links.map(([label, value]) => (
              <div
                key={label}
                className="link-row grid w-full max-w-4xl grid-cols-[130px_1fr] gap-4 sm:grid-cols-[160px_1fr]"
              >
                <span className="font-semibold">{label}</span>
                <span className="break-all text-right text-white/80">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: skill buttons */}
        <div className="side-btns flex flex-row flex-wrap gap-4 lg:flex-col lg:justify-end">
          {categories.map((item) => (
            <span
              key={item}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              className="side-btn cursor-pointer rounded-full border border-white/80 px-10 py-4 text-center text-lg text-white lg:w-80 lg:text-xl"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
