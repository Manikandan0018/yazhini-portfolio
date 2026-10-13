
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Split } from "./utils/Split";

gsap.registerPlugin(ScrollTrigger);

/* ================= DATA FROM RESUME ================= */

const categories = [
  "PHP & Laravel",
  "CodeIgniter & REST APIs",
  "MySQL & SQL",
  "HTML, CSS & JavaScript",
  "CMS & Admin Panels",
  "E-commerce Websites",
];

const links = [
  ["Email:", "yazhini0304@outlook.com"],
  ["Phone:", "+91 90258 52241"],
  ["Location:", "Puducherry, India"],
  ["Education:", "MCA · CGPA 9.32"],
];

export const About = () => {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const toggle = "play reverse play reverse";

      // Heading animations
      gsap.utils.toArray(".reveal-title").forEach((title) => {
        gsap.fromTo(
          title.querySelectorAll(".letter"),
          { y: 35, opacity: 0, rotate: 5 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.7,
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

      // Paragraph animations
      gsap.utils.toArray(".reveal-text").forEach((p) => {
        gsap.fromTo(
          p,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: p,
              start: "top 90%",
              toggleActions: toggle,
            },
          }
        );
      });

      // Main statement animation
      gsap.fromTo(
        ".statement .letter",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".statement",
            start: "top 88%",
            toggleActions: toggle,
          },
        }
      );

      // Skill buttons animation
      gsap.fromTo(
        ".side-btn",
        { x: 35, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".side-btns",
            start: "top 90%",
            toggleActions: toggle,
          },
        }
      );

      // Background glow parallax
      gsap.to(".glow", {
        yPercent: 30,
        xPercent: -10,
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Content parallax
      gsap.to(".content", {
        yPercent: -3,
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

  /* ================= BUTTON HOVER ================= */

  const onEnter = (e) =>
    gsap.to(e.currentTarget, {
      scale: 1.04,
      backgroundColor: "#ffffff",
      color: "#000000",
      duration: 0.25,
      ease: "power2.out",
    });

  const onLeave = (e) =>
    gsap.to(e.currentTarget, {
      scale: 1,
      backgroundColor: "rgba(255,255,255,0)",
      color: "#ffffff",
      duration: 0.25,
      ease: "power2.out",
    });

  return (
    <section
      ref={root}
      id="about"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#0a0a0a] px-5 py-10 text-white sm:px-8 lg:px-12"
    >
      {/* Background glow */}
      <div
        className="glow pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full opacity-50 sm:h-[600px] sm:w-[600px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)",
        }}
      />

      {/* Main container */}
      <div className="content relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_290px] lg:items-center lg:gap-12">

        {/* Left content */}
        <div className="flex min-w-0 flex-col gap-7">

          {/* About Me */}
          <div>
            <h2 className="reveal-title mb-3 text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              <Split text="About Me" />
            </h2>

            <p className="reveal-text text-justify text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              I am Yazhini Saravanan, a PHP Developer with one year of
              professional experience at Jayam Web Solutions Pvt. Ltd.
              I hold an MCA from Puducherry Technological University
              with a CGPA of 9.32, along with a B.Sc. in Computer Science.
              I specialize in developing and maintaining web applications
              using PHP, Laravel, and CodeIgniter, with a focus on
              reliable backend functionality and practical web solutions.
            </p>
          </div>

          {/* What I Do */}
          <div>
            <h2 className="reveal-title mb-3 text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              <Split text="What I Do" />
            </h2>

            <p className="reveal-text text-justify text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              I develop and maintain dynamic web applications, CMS
              platforms, admin panels, and e-commerce websites. My work
              includes REST API integration, MySQL database operations,
              backend business logic, feature enhancements, and bug fixes.
              I also work with HTML, CSS, JavaScript, SQL, XAMPP, and
              Visual Studio Code to build and maintain functional web
              solutions.
            </p>
          </div>

          {/* Main statement */}
          <h3 className="statement text-2xl leading-snug sm:text-3xl lg:text-[2.5rem]">
            <Split
              text="Building reliable web applications"
              className="font-light"
            />
            <br />
            <Split
              text="with practical backend solutions."
              className="font-extrabold"
            />
          </h3>

          {/* Contact information */}
          <div className="links grid grid-cols-1 gap-3 border-t border-white/15 pt-5 sm:grid-cols-2">
            {links.map(([label, value]) => (
              <div
                key={label}
                className="link-row flex min-w-0 flex-wrap items-start gap-x-2 text-sm sm:text-base"
              >
                <span className="shrink-0 text-white/50">{label}</span>
                <span className="break-words text-white/90">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Technical skills */}
        <div className="side-btns mx-auto flex w-full max-w-[400px] flex-row flex-wrap justify-center gap-3 lg:max-w-none lg:flex-col lg:justify-center">
          {categories.map((item) => (
            <span
              key={item}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              className="side-btn cursor-default rounded-full border border-white/40 px-4 py-2.5 text-center text-sm text-white transition-colors sm:px-5 sm:py-3 sm:text-base lg:w-full"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
