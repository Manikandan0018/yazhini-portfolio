
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Split } from "./utils/Split";

gsap.registerPlugin(ScrollTrigger);

/* ================= SKILLS FROM RESUME ================= */

const skills = [
  {
    name: "PHP",
    desc: "Developing and maintaining dynamic web applications and backend functionality.",
    tone: "bg-white text-black",
  },
  {
    name: "Laravel",
    desc: "Building and maintaining web applications using the Laravel framework.",
    tone: "bg-neutral-200 text-black",
  },
  {
    name: "CodeIgniter",
    desc: "Working with PHP-based web applications and backend features.",
    tone: "bg-neutral-300 text-black",
  },
  {
    name: "REST APIs",
    desc: "Integrating APIs to connect web applications with external services.",
    tone: "bg-neutral-800 text-white",
  },
  {
    name: "HTML, CSS & JavaScript",
    desc: "Building web interfaces and supporting interactive website functionality.",
    tone: "bg-neutral-700 text-white",
  },
  {
    name: "MySQL & SQL",
    desc: "Working with databases, queries, and data-driven application functionality.",
    tone: "bg-neutral-900 text-white border border-white/20",
  },
];

const otherSkills = [
  "CMS Projects",
  "E-commerce Websites",
  "Admin Panels",
  "XAMPP",
  "Visual Studio Code",
  "Communication",
  "Teamwork",
  "Problem Solving",
  "Time Management",
];

const education = [
  {
    course: "MCA",
    school: "Puducherry Technological University",
    year: "2025",
    score: "9.32",
    label: "CGPA",
  },
  {
    course: "B.Sc. Computer Science",
    school: "Bharathidasan Government College for Women",
    year: "2022",
    score: "8.19",
    label: "CGPA",
  },
  {
    course: "HSC (12th)",
    school: "Thiruvalluvar Government Girls Higher Secondary School",
    year: "2019",
    score: "73.5%",
    label: "Score",
  },
];

/* ================= COMPONENT ================= */

export const SkillsEducation = () => {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const toggle = "play reverse play reverse";

      // Section headings
      gsap.utils.toArray(".skills-title, .edu-title").forEach((title) => {
        gsap.fromTo(
          title.querySelectorAll(".letter"),
          {
            y: 25,
            opacity: 0,
            rotateX: -45,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.75,
            stagger: 0.025,
            ease: "power3.out",
            scrollTrigger: {
              trigger: title,
              start: "top 88%",
              toggleActions: toggle,
            },
          }
        );
      });

      // Intro text
      gsap.utils.toArray(".section-intro").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 92%",
              toggleActions: toggle,
            },
          }
        );
      });

      // Skill cards
      gsap.fromTo(
        ".s-card",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 85%",
            toggleActions: toggle,
          },
        }
      );

      // Other skill chips
      gsap.fromTo(
        ".skill-chip",
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.045,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".other-skills",
            start: "top 88%",
            toggleActions: toggle,
          },
        }
      );

      // Education cards
      gsap.utils.toArray(".edu-row").forEach((row, i) => {
        gsap.fromTo(
          row.querySelector(".edu-card"),
          {
            x: i % 2 === 0 ? -30 : 30,
            y: 15,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: toggle,
            },
          }
        );
      });

      // Background glow
      gsap.to(".se-glow", {
        yPercent: 20,
        xPercent: -8,
        scale: 1.1,
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

  const chipEnter = (e) => {
    gsap.to(e.currentTarget, {
      backgroundColor: "#ffffff",
      color: "#000000",
      borderColor: "#ffffff",
      scale: 1.03,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const chipLeave = (e) => {
    gsap.to(e.currentTarget, {
      backgroundColor: "rgba(255,255,255,0)",
      color: "#ffffff",
      borderColor: "rgba(255,255,255,0.3)",
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={root}
      id="skills"
      className="relative isolate w-full overflow-hidden bg-[#0a0a0a] text-white"
    >
      {/* Background glow */}
      <div
        className="se-glow pointer-events-none absolute -right-32 top-0 -z-10 h-[450px] w-[450px] rounded-full opacity-40 sm:h-[600px] sm:w-[600px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)",
        }}
      />

      {/* ================= TECHNICAL SKILLS ================= */}

      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="mb-8 sm:mb-10">
          <p className="section-intro mb-2 text-xs uppercase tracking-[0.22em] text-white/50 sm:text-sm sm:tracking-[0.3em]">
            Technical expertise
          </p>

          <h2 className="skills-title text-4xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <Split text="My Skills" />
          </h2>

          <p className="section-intro mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-base sm:leading-7">
            My technical skills and experience in developing, integrating,
            and maintaining web applications.
          </p>
        </div>

        {/* Responsive skills grid */}
        <div className="skills-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, i) => (
            <article
              key={skill.name}
              className={`s-card group flex min-h-[175px] flex-col justify-between rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1 sm:min-h-[190px] sm:p-6 ${skill.tone}`}
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="text-xs font-medium opacity-60 sm:text-sm">
                  SKILL {String(i + 1).padStart(2, "0")}
                </span>

                <span className="text-lg opacity-50 transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold leading-snug sm:text-2xl">
                  {skill.name}
                </h3>

                <p className="mt-2 text-sm leading-6 opacity-75 sm:text-base sm:leading-6">
                  {skill.desc}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* ================= OTHER SKILLS ================= */}

        <div className="other-skills mt-12 border-t border-white/15 pt-8 sm:mt-14 sm:pt-10">
          <div className="mb-5">
            <h3 className="text-xl font-semibold sm:text-2xl">
              Tools & Other Skills
            </h3>

            <p className="section-intro mt-2 text-sm leading-6 text-white/60 sm:text-base">
              Project areas, development tools, and professional strengths
              listed in my resume.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {otherSkills.map((skill) => (
              <span
                key={skill}
                onMouseEnter={chipEnter}
                onMouseLeave={chipLeave}
                className="skill-chip cursor-default rounded-full border border-white/30 px-3.5 py-2 text-sm leading-5 text-white/90 sm:px-4 sm:py-2.5 sm:text-base"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ================= EDUCATION ================= */}

      <div
        id="education"
        className="mx-auto w-full max-w-7xl px-5 pb-16 pt-2 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24"
      >
        <div className="mb-8 sm:mb-10">
          <p className="section-intro mb-2 text-xs uppercase tracking-[0.22em] text-white/50 sm:text-sm sm:tracking-[0.3em]">
            Academic background
          </p>

          <h2 className="edu-title text-4xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <Split text="Education" />
          </h2>

          <p className="section-intro mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-base sm:leading-7">
            My academic journey, qualifications, and achievements.
          </p>
        </div>

        {/* Responsive education cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {education.map((item) => (
            <article
              key={item.course}
              className="edu-row min-w-0"
            >
              <div className="edu-card flex h-full min-h-[190px] flex-col justify-between rounded-2xl border border-white/15 bg-white/[0.035] p-5 transition-colors duration-300 hover:border-white/40 hover:bg-white/[0.06] sm:min-h-[210px] sm:p-6">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full border border-white/30 px-3 py-1 text-xs text-white/70 sm:text-sm">
                      {item.year}
                    </span>

                    <span className="text-xs uppercase tracking-wider text-white/50 sm:text-sm">
                      {item.label}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold leading-snug sm:text-2xl">
                    {item.course}
                  </h3>

                  <p className="mt-2 break-words text-sm leading-6 text-white/60 sm:text-base">
                    {item.school}
                  </p>
                </div>

                <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/10 pt-4">
                  <span className="text-sm text-white/50">
                    {item.label}
                  </span>

                  <span className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {item.score}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsEducation;
