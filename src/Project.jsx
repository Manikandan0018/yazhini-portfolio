
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
import microcoreresearch from "../public/microcoreresearch.png";
import segnusmediloids from "../public/segnusmediloids.png";
import thiruppugazhbiotech from "../public/thiruppugazhbiotech.png";

gsap.registerPlugin(ScrollTrigger);

/* ================= PROJECT DATA ================= */

const categories = [
  {
    id: "api",
    title: "API Integration",
    subtitle: "Connected experiences",
    projects: [
      {
        title: "Green Flyers",
        tag: "API Integration",
        desc: "A platform focused on API integrations and a smooth user experience.",
        url: "https://greenflyers.club/",
        img: greenImg,
      },
    ],
  },
  {
    id: "business",
    title: "Corporate & Business",
    subtitle: "Professional digital presence",
    projects: [
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
        tag: "Political Website",
        url: "https://www.thamizhperarasukatchi.com/",
        img: namImg,
      },
      {
        title: "Cogent Tech Solutions",
        tag: "IT Company Website",
        url: "https://www.cogenttechsolutions.in/",
        img: coImg,
      },
    ],
  },
  {
    id: "healthcare",
    title: "Healthcare & Biotech",
    subtitle: "Research, healthcare and pharmaceutical websites",
    projects: [
      {
        title: "Microcore Research",
        tag: "Biotech & Research",
        url: "https://www.microcoreresearch.com/",
        img: microcoreresearch,
      },
      {
        title: "Segnus Mediloids",
        tag: "Pharmaceutical Website",
        url: "https://www.segnusmediloids.com/",
        img: segnusmediloids,
      },
      {
        title: "Thiruppugazh Biotech",
        tag: "Biotechnology Website",
        url: "https://thiruppugazhbiotech.com/",
        img: thiruppugazhbiotech,
      },
      {
        title: "Espure",
        tag: "Epsure water solution",
        url: "https://www.espure.in/",
        img: waterImg,
      },
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    subtitle: "Online shopping experiences",
    projects: [
      {
        title: "Christian Books World",
        tag: "Online Book Store",
        url: "https://www.christianbooksworld.com/",
        img: chriImg,
      },
    ],
  },
];

/* ================= ANIMATED PROJECT CARD ================= */

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  const handleMouseEnter = () => {
    if (window.matchMedia("(hover: hover)").matches) {
      gsap.to(imageRef.current, {
        scale: 1.055,
        duration: 0.55,
        ease: "power3.out",
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  return (
    <a
      ref={cardRef}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${project.title} website`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="project-card group block min-w-0"
    >
      {/* Project image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-900 sm:rounded-2xl">
        <img
          ref={imageRef}
          src={project.img}
          alt={`${project.title} website preview`}
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/25">
          <span className="translate-y-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Visit Website ↗
          </span>
        </div>

        {/* Project number */}
        <span className="absolute right-3 top-3 rounded-full border border-white/30 bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Project information */}
      <div className="mt-3 flex items-start justify-between gap-3 sm:mt-4">
        <div className="min-w-0">
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-white/50 sm:text-sm">
            {project.tag}
          </p>

          <h4 className="text-base font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-white/70 sm:text-lg lg:text-xl">
            {project.title}
          </h4>
        </div>

        <span className="mt-1 shrink-0 text-lg text-white/50 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white">
          ↗
        </span>
      </div>
    </a>
  );
};

/* ================= PROJECTS SECTION ================= */

export const Projects = () => {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation
      gsap.fromTo(
        ".projects-intro > *",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-intro",
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Category heading animation
      gsap.utils.toArray(".project-category").forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll(".category-heading"),
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // Project cards reveal
      gsap.utils.toArray(".project-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 94%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // Subtle background glow
      gsap.to(".projects-glow", {
        yPercent: 20,
        xPercent: 8,
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

  let projectNumber = 0;

  return (
    <section
      ref={root}
      id="projects"
      className="relative isolate w-full overflow-hidden bg-[#0a0a0a] px-5 py-12 text-white sm:px-8 sm:py-14 lg:px-12 lg:py-16"
    >
      {/* Background glow */}
      <div
        className="projects-glow pointer-events-none absolute -left-40 top-20 -z-10 h-[450px] w-[450px] rounded-full opacity-40 sm:h-[600px] sm:w-[600px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.035) 45%, transparent 70%)",
        }}
      />

      <div className="mx-auto w-full max-w-7xl">

        {/* Intro */}
        <header className="projects-intro mb-10 sm:mb-12 lg:mb-14">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-white/50 sm:text-sm">
            Portfolio / Selected Work
          </p>

          <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl">
            Projects<span className="text-white/40">.</span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-base sm:leading-7">
            A collection of websites across corporate, healthcare,
            biotechnology, API integration, and e-commerce.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#category-${category.id}`}
                className="rounded-full border border-white/20 px-3 py-2 text-xs text-white/75 transition-colors hover:border-white hover:bg-white hover:text-black sm:text-sm"
              >
                {category.title}
              </a>
            ))}
          </div>
        </header>

        {/* Category-wise project grids */}
        <div className="space-y-12 sm:space-y-14 lg:space-y-16">
          {categories.map((category) => (
            <section
              key={category.id}
              id={`category-${category.id}`}
              className="project-category scroll-mt-8"
            >
              {/* Category heading */}
              <div className="category-heading mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-white/15 pb-3 sm:mb-6">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
                    {category.title}
                  </h3>

                  <p className="mt-1 text-sm text-white/50 sm:text-base">
                    {category.subtitle}
                  </p>
                </div>

                <span className="text-sm text-white/50 sm:text-base">
                  {String(category.projects.length).padStart(2, "0")} Projects
                </span>
              </div>

              {/* Responsive grid */}
              <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-9">
                {category.projects.map((project) => {
                  const currentIndex = projectNumber++;

                  return (
                    <ProjectCard
                      key={project.title}
                      project={project}
                      index={currentIndex}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-white/15 pt-5 sm:mt-14 lg:mt-16">
          <p className="text-sm text-white/50 sm:text-base">
            Designed with purpose. Built for the web.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Projects;
