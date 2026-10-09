import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import greenImg from "../public/green.png";
import cooperImg from "../public/cooper.png";
import cirImg from "../public/cir.png";
import wingImg from "../public/wing.png";
import crosImg from "../public/cros.png";
import krishImg from "../public/krish.png";
import namImg from "../public/nam.png";
import coImg from "../public/co.png";
import waterImg from "../public/water.png";
import chriImg from "../public/chri.png";

gsap.registerPlugin(ScrollTrigger);

/* ================= DATA ================= */
const featured = {
  title: "Green Flyers",
  tag: "API Integration",
  desc: "A platform built around API integrations: live data, secure endpoints and a smooth user experience.",
  url: "https://greenflyers.club/",
  img: greenImg,
};

const webProjects = [
  {
    title: "Cooper Elevators",
    tag: "Corporate Website",
    url: "https://www.cooperelevators.com/",
    img: cooperImg,
  },
  {
    title: "Circuit Brilliance",
    tag: "Business Website",
    url: "https://circuitbrilliance.com/",
    img: cirImg,
  },
  {
    title: "Wings Job Consultancy",
    tag: "Consultancy Website",
    url: "https://www.wingsjobconsultancyservices.com/",
    img: wingImg,
  },
  {
    title: "Cross Survey & Consultants",
    tag: "Corporate Website",
    url: "https://www.crosssurveyandconsultants.com/",
    img: crosImg,
  },
  {
    title: "Krish Global Solutions",
    tag: "Business Website",
    url: "https://krishglobalsolutions.com/",
    img: krishImg,
  },
  {
    title: "Thamizh Perarasu Katchi",
    tag: "Political Party Website",
    url: "https://www.thamizhperarasukatchi.com/",
    img: namImg,
  },
  {
    title: "Cogent Tech Solutions",
    tag: "IT Company Website",
    url: "https://www.cogenttechsolutions.in/",
    img: coImg,
  },
];

const ecommerce = [
  {
    title: "Espure",
    url: "https://www.espure.in/",
    img: waterImg,
  },
  {
    title: "Christian Books World",
    url: "https://www.christianbooksworld.com/",
    img: chriImg,
  },
];

/* ...the rest of your file (wave, Split, Card, Projects) stays exactly the same... */

/* ================= Letter wave (hover) ================= */
const wave = (e) => {
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

const Split = ({ text, className = "" }) => (
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

/* ================= Project card (image reveal + cursor-follow "View" button) ================= */
const Card = ({
  p,
  index,
  className = "",
  aspect = "aspect-[4/3]",
  cardClass = "p-card",
}) => {
  const btn = useRef(null);

  const onEnter = () =>
    gsap.to(btn.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "back.out(2)",
    });
  const onLeave = () =>
    gsap.to(btn.current, { scale: 0, opacity: 0, duration: 0.25 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(btn.current, {
      x: e.clientX - r.left,
      y: e.clientY - r.top,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <a
      href={p.url}
      target="_blank"
      rel="noreferrer"
      className={`${cardClass} group block ${className}`}
    >
      <div
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onMouseMove={onMove}
        className={`img-mask relative w-full overflow-hidden rounded-2xl bg-neutral-900 ${aspect}`}
      >
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110">
          <img
            src={p.img}
            alt={p.title}
            className="p-img h-full w-[125%] max-w-none -ml-[12%] object-cover"
          />
        </div>

        {/* Cursor-follow button */}
        <div
          ref={btn}
          className="pointer-events-none absolute left-0 top-0 flex h-20 w-20 items-center justify-center rounded-full bg-white text-xs font-semibold text-black opacity-0"
          style={{ margin: "-40px 0 0 -40px", transform: "scale(0)" }}
        >
          View ↗
        </div>
      </div>

      <div className="p-info mt-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">
            {p.tag}
          </p>
          <h4 className="text-xl font-bold sm:text-2xl lg:text-3xl">
            {p.title}
          </h4>
        </div>
        <span className="text-sm text-white/40">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </a>
  );
};

/* ================= Section ================= */
export const Projects = () => {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const toggle = "play reverse play reverse"; // scroll down = play, scroll up = reverse

      /* ---- 1) Headings: letters rise one by one ---- */
      gsap.utils.toArray(".reveal-title").forEach((t) => {
        gsap.fromTo(
          t.querySelectorAll(".letter"),
          { y: 80, opacity: 0, rotate: 8 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.9,
            stagger: 0.03,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: t,
              start: "top 85%",
              toggleActions: toggle,
            },
          },
        );
      });

      /* ---- 2) Featured (Green Flyers): mask reveal + parallax ---- */
      gsap.fromTo(
        ".feat-mask",
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: ".feat",
            start: "top 75%",
            toggleActions: toggle,
          },
        },
      );
      gsap.fromTo(
        ".feat-img",
        { scale: 1.35, yPercent: -8 },
        {
          scale: 1.1,
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".feat",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
      gsap.fromTo(
        ".feat-info > *",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".feat",
            start: "top 60%",
            toggleActions: toggle,
          },
        },
      );

      /* ---- 3) Web projects: pinned horizontal scroll ---- */
      const track = root.current.querySelector(".h-track");
      const distance = () => track.scrollWidth - window.innerWidth;

      const hTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: ".h-section",
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // progress bar
      gsap.fromTo(
        ".h-bar",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: ".h-section",
            start: "top top",
            end: () => "+=" + distance(),
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.utils.toArray(".h-card").forEach((card) => {
        // card scales/fades in as it enters the screen
        gsap.fromTo(
          card,
          { opacity: 0.25, scale: 0.88, rotate: 2 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: hTween,
              start: "left 95%",
              end: "left 55%",
              scrub: true,
            },
          },
        );
        // image parallax inside the card
        gsap.fromTo(
          card.querySelector(".p-img"),
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: hTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });

      /* ---- 4) E-commerce: staggered rise + mask reveal ---- */
      gsap.utils.toArray(".e-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 120, opacity: 0, rotate: i % 2 ? -3 : 3 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: toggle,
            },
          },
        );
        gsap.fromTo(
          card.querySelector(".img-mask"),
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: toggle,
            },
          },
        );
        gsap.fromTo(
          card.querySelector(".p-img"),
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });

      /* ---- Background glow parallax ---- */
      gsap.to(".p-glow", {
        yPercent: 60,
        scale: 1.3,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, root);

    // recalc after images load so pin distances are correct
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative w-full overflow-hidden bg-[#0a0a0a] text-white"
    >
      {/* Glow */}
      <div
        className="p-glow pointer-events-none absolute -left-40 top-0 h-[900px] w-[900px] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.14) 0%, transparent 65%)",
        }}
      />

      {/* ============ Intro title ============ */}
      <div className="relative px-6 pb-10 pt-24 sm:px-10 lg:px-16">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-white/50">
          Portfolio
        </p>
        <h2 className="reveal-title text-6xl font-extrabold uppercase leading-none sm:text-8xl lg:text-9xl">
          <Split text="Selected Work" />
        </h2>
      </div>

      {/* ============ Featured: Green Flyers (API) ============ */}
      <div className="feat relative px-6 py-16 sm:px-10 lg:px-16">
        <div className="feat-mask overflow-hidden rounded-3xl">
          <a
            href={featured.url}
            target="_blank"
            rel="noreferrer"
            className="block aspect-[16/8] w-full overflow-hidden"
          >
            <img
              src={featured.img}
              alt={featured.title}
              className="feat-img h-full w-full object-cover"
            />
          </a>
        </div>

        <div className="feat-info mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div>
            <span className="inline-block rounded-full border border-white/70 px-4 py-1 text-xs uppercase tracking-widest">
              Featured · {featured.tag}
            </span>
            <h3 className="mt-4 text-5xl font-extrabold sm:text-7xl">
              <Split text={featured.title} />
            </h3>
          </div>
          <div className="flex flex-col justify-end gap-4">
            <p className="text-lg text-white/70 sm:text-2xl">{featured.desc}</p>
            <a
              href={featured.url}
              target="_blank"
              rel="noreferrer"
              className="w-fit border-b border-white pb-1 text-lg hover:opacity-70"
            >
              Visit website ↗
            </a>
          </div>
        </div>
      </div>

      {/* ============ Web projects: horizontal scroll ============ */}
      <div className="h-section relative flex h-screen flex-col justify-center">
        <div className="mb-8 px-6 sm:px-10 lg:px-16">
          <h3 className="reveal-title text-4xl font-extrabold uppercase sm:text-6xl">
            <Split text="Web Projects" />
          </h3>
        </div>

        <div className="h-track flex w-max gap-8 px-6 sm:px-10 lg:px-16">
          {webProjects.map((p, i) => (
            <Card
              key={p.title}
              p={p}
              index={i}
              cardClass="h-card"
              className="w-[82vw] sm:w-[55vw] lg:w-[38vw]"
            />
          ))}
        </div>

        {/* progress bar */}
        <div className="absolute bottom-8 left-6 right-6 h-[2px] bg-white/15 sm:left-10 sm:right-10 lg:left-16 lg:right-16">
          <div className="h-bar h-full origin-left bg-white" />
        </div>
      </div>

      {/* ============ E-commerce ============ */}
      <div className="relative px-6 py-24 sm:px-10 lg:px-16">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h3 className="reveal-title text-4xl font-extrabold uppercase sm:text-6xl lg:text-8xl">
            <Split text="E-commerce" />
          </h3>
          
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {ecommerce.map((p, i) => (
            <Card
              key={p.title}
              p={p}
              index={i}
              cardClass="e-card"
              aspect="aspect-[4/3]"
              className={i % 2 ? "md:mt-24" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
