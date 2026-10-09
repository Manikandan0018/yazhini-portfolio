import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Split } from "./utils/Split";

gsap.registerPlugin(ScrollTrigger);

/* ================= DATA (from your resume) ================= */
const skills = [
  {
    name: "HTML & CSS",
    desc: "Creating responsive and user-friendly web pages.",
    tone: "bg-white text-black",
  },
  {
    name: "JavaScript",
    desc: "DOM manipulation, event handling and building interactive web features.",
    tone: "bg-neutral-200 text-black",
  },
  {
    name: "Java",
    desc: "Strong grasp of OOP concepts and backend code for mobile applications.",
    tone: "bg-neutral-400 text-black",
  },
  {
    name: "XML",
    desc: "Data representation.",
    tone: "bg-neutral-700 text-white",
  },
  {
    name: "SQL",
    desc: "Designing, querying and optimizing relational databases.",
    tone: "bg-neutral-900 text-white border border-white/30",
  },
];

const otherSkills = [
  "MS Word",
  "MS Excel",
  "MS PowerPoint",
  "Effective Communication",
  "Teamwork",
  "Problem Solving",
  "Time Management",
];

const education = [
  {
    course: "MCA",
    school: "Puducherry Technological University",
    year: "2025",
    end: 9.32,
    dec: 2,
    label: "CGPA",
    suffix: "",
  },
  {
    course: "B.Sc. Computer Science",
    school: "Bharathidasan Govt. College for Women",
    year: "2022",
    end: 8.19,
    dec: 2,
    label: "CGPA",
    suffix: "",
  },
  {
    course: "HSC (12th)",
    school: "Thiruvalluvar Govt. Girls Hr. Sec. School",
    year: "2019",
    end: 73.5,
    dec: 1,
    label: "Score",
    suffix: "%",
  },
];

/* ================= Section ================= */
export const SkillsEducation = () => {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const toggle = "play reverse play reverse"; // scroll down = play, scroll up = reverse

      /* ---------- SKILLS heading: letters pop in randomly (elastic) ---------- */
      gsap.fromTo(
        ".skills-title .letter",
        { scale: 0, opacity: 0, rotate: -30 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          stagger: { each: 0.05, from: "random" },
          scrollTrigger: {
            trigger: ".skills-title",
            start: "top 85%",
            toggleActions: toggle,
          },
        },
      );

      /* ---------- SKILLS: pinned stacking cards ---------- */
      const cards = gsap.utils.toArray(".s-card");
      const stack = gsap.timeline({
        scrollTrigger: {
          trigger: ".s-pin",
          start: "top top",
          end: () => `+=${cards.length * 80}%`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      cards.forEach((card, i) => {
        if (i === 0) return;
        stack
          .fromTo(
            card,
            { yPercent: 115, rotate: i % 2 ? 5 : -5 },
            { yPercent: 0, rotate: 0, ease: "none", duration: 1 },
          )
          .to(
            cards[i - 1],
            { scale: 0.92, opacity: 0.35, ease: "none", duration: 1 },
            "<",
          );
      });
      // progress bar for the stack
      stack.fromTo(
        ".s-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          duration: stack.duration(),
          transformOrigin: "top center",
        },
        0,
      );

      /* ---------- OTHER SKILLS: two marquee rows, opposite directions ---------- */
      gsap.fromTo(
        ".row-a",
        { xPercent: 0 },
        {
          xPercent: -35,
          ease: "none",
          scrollTrigger: {
            trigger: ".chips",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
      gsap.fromTo(
        ".row-b",
        { xPercent: -35 },
        {
          xPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".chips",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );

      /* ---------- EDUCATION heading: 3D letter flip from the centre ---------- */
      gsap.fromTo(
        ".edu-title .letter",
        { rotationX: -90, opacity: 0, transformOrigin: "50% 100%" },
        {
          rotationX: 0,
          opacity: 1,
          duration: 0.9,
          ease: "back.out(1.7)",
          stagger: { each: 0.05, from: "center" },
          scrollTrigger: {
            trigger: ".edu-title",
            start: "top 85%",
            toggleActions: toggle,
          },
        },
      );

      /* ---------- EDUCATION: timeline line draws as you scroll ---------- */
      gsap.fromTo(
        ".edu-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: ".timeline",
            start: "top 70%",
            end: "bottom 70%",
            scrub: 1,
          },
        },
      );

      gsap.utils.toArray(".edu-row").forEach((row, i) => {
        const fromX = i % 2 === 0 ? -100 : 100;
        const st = { trigger: row, start: "top 82%", toggleActions: toggle };

        gsap.fromTo(
          row.querySelector(".edu-card"),
          { x: fromX, opacity: 0, rotateY: i % 2 === 0 ? 25 : -25 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: st,
          },
        );
        gsap.fromTo(
          row.querySelector(".edu-dot"),
          { scale: 0 },
          { scale: 1, duration: 0.6, ease: "back.out(3)", scrollTrigger: st },
        );

        // CGPA / percentage count-up
        const el = row.querySelector(".count");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: parseFloat(el.dataset.end),
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = obj.v.toFixed(parseInt(el.dataset.dec, 10));
          },
          scrollTrigger: st,
        });
      });

      /* ---------- Background glow parallax ---------- */
      gsap.to(".se-glow", {
        yPercent: 80,
        xPercent: 20,
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

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  /* chip hover */
  const chipEnter = (e) =>
    gsap.to(e.currentTarget, {
      backgroundColor: "#fff",
      color: "#000",
      scale: 1.08,
      duration: 0.3,
    });
  const chipLeave = (e) =>
    gsap.to(e.currentTarget, {
      backgroundColor: "rgba(255,255,255,0)",
      color: "#fff",
      scale: 1,
      duration: 0.3,
    });

  const marquee = [...otherSkills, ...otherSkills, ...otherSkills];

  return (
    <section
      ref={root}
      id="skills"
      className="relative w-full overflow-hidden bg-[#0a0a0a] text-white"
    >
      <div
        className="se-glow pointer-events-none absolute -right-40 top-0 h-[900px] w-[900px] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.14) 0%, transparent 65%)",
        }}
      />

      {/* ================= SKILLS (pinned stacking cards) ================= */}
      <div className="s-pin relative flex min-h-screen items-center px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-white/50">
              What I know
            </p>
            <h2 className="skills-title text-6xl font-extrabold uppercase leading-none sm:text-8xl lg:text-9xl">
              <Split text="Skills" />
            </h2>
            <p className="mt-4 max-w-md text-base text-white/60 sm:text-xl">
              Scroll to flip through my technical stack.
            </p>
          </div>

          <div className="relative flex gap-4">
            {/* vertical progress */}
            <div className="relative hidden w-[2px] bg-white/15 sm:block">
              <div className="s-progress absolute inset-0 origin-top bg-white" />
            </div>

            {/* stacked cards */}
            <div className="relative h-[55vh] w-full lg:h-[60vh]">
              {skills.map((s, i) => (
                <div
                  key={s.name}
                  className={`s-card absolute inset-0 flex flex-col justify-between rounded-3xl p-6 shadow-2xl sm:p-10 ${s.tone}`}
                  style={{ zIndex: i + 1 }}
                >
                  <span className="text-sm font-semibold opacity-60">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(skills.length).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-4xl font-extrabold sm:text-6xl">
                      {s.name}
                    </h3>
                    <p className="mt-3 max-w-md text-base opacity-75 sm:text-xl">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= OTHER SKILLS (opposite-direction marquees) ================= */}
      <div className="chips relative space-y-5 overflow-hidden py-20">
        {["row-a", "row-b"].map((r, idx) => (
          <div key={r} className={`${r} flex w-max gap-4`}>
            {(idx ? [...marquee].reverse() : marquee).map((c, i) => (
              <span
                key={i}
                onMouseEnter={chipEnter}
                onMouseLeave={chipLeave}
                className="cursor-pointer whitespace-nowrap rounded-full border border-white/60 px-6 py-3 text-lg sm:px-10 sm:py-4 sm:text-3xl"
              >
                {c}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* ================= EDUCATION (timeline) ================= */}
      <div id="education" className="relative px-6 py-24 sm:px-10 lg:px-16">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-white/50">
          My journey
        </p>
        <h2
          className="edu-title mb-16 text-6xl font-extrabold uppercase leading-none sm:text-8xl lg:text-9xl"
          style={{ perspective: 800 }}
        >
          <Split text="Education" />
        </h2>

        <div className="timeline relative">
          {/* line */}
          <div className="absolute left-4 top-0 h-full w-px bg-white/15 lg:left-1/2" />
          <div className="edu-line absolute left-4 top-0 h-full w-px origin-top bg-white lg:left-1/2" />

          <div className="space-y-12 lg:space-y-20">
            {education.map((e, i) => (
              <div
                key={e.course}
                className="edu-row relative grid grid-cols-1 lg:grid-cols-2"
                style={{ perspective: 1000 }}
              >
                <span className="edu-dot absolute left-4 top-10 -ml-2 h-4 w-4 rounded-full bg-white ring-8 ring-[#0a0a0a] lg:left-1/2" />

                <div
                  className={`edu-card pl-12 lg:pl-0 ${
                    i % 2 === 0
                      ? "lg:pr-16 lg:text-right"
                      : "lg:col-start-2 lg:pl-16"
                  }`}
                >
                  <span className="inline-block rounded-full border border-white/70 px-4 py-1 text-xs uppercase tracking-widest">
                    {e.year}
                  </span>
                  <h3 className="mt-3 text-3xl font-extrabold sm:text-5xl">
                    {e.course}
                  </h3>
                  <p className="mt-2 text-base text-white/70 sm:text-xl">
                    {e.school}
                  </p>
                  <p className="mt-4 text-white/50">{e.label}</p>
                  <p className="text-6xl font-extrabold sm:text-8xl">
                    <span className="count" data-end={e.end} data-dec={e.dec}>
                      0
                    </span>
                    {e.suffix}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
