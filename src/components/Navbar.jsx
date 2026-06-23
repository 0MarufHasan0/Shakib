"use client";

import { useState, useEffect } from "react";

export default function Navbar({ personalInfo }) {
  const brandName = personalInfo?.name || "Md Shakib Al Hasan";
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Synchronize theme on initial mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Research", href: "#research" },
    { label: "Simulator", href: "#simulator" },
    { label: "Clinical Cases", href: "#clinical-cases" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-surface-container-lowest/90 backdrop-blur-md shadow-md py-3 border-outline-variant/30"
            : "bg-surface-container-lowest border-outline-variant py-4"
        }`}
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center">
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-stack-sm group">
            <span className="material-symbols-outlined text-primary text-3xl transition-transform group-hover:scale-110" style={{ fontVariationSettings: "'FILL' 1" }}>
              science
            </span>
            <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
              {brandName}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-gutter">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant cursor-pointer"
              aria-label="Toggle dark mode"
            >
              <span className="material-symbols-outlined text-xl flex items-center justify-center">
                {isDark ? "light_mode" : "dark_mode"}
              </span>
            </button>

            {/* Connect Button */}
            <a
              href="#contact"
              className="font-label-md text-label-md bg-primary text-on-primary px-stack-md py-2.5 rounded hover:bg-primary-container shadow-sm transition-all active:scale-[0.98]"
            >
              Connect
            </a>
          </nav>

          {/* Tablet/Mobile Action Section */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant"
              aria-label="Toggle dark mode"
            >
              <span className="material-symbols-outlined text-xl flex items-center justify-center">
                {isDark ? "light_mode" : "dark_mode"}
              </span>
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-2 rounded-lg cursor-pointer"
              aria-label="Open navigation menu"
            >
              menu
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 w-80 h-full bg-surface shadow-2xl p-margin-mobile flex flex-col justify-between transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex justify-between items-center mb-stack-lg border-b border-outline-variant/30 pb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  science
                </span>
                <span className="font-headline-md text-headline-md font-bold text-primary">Menu</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-1 rounded-full hover:bg-surface-container"
              >
                close
              </button>
            </div>
            
            <nav className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-headline-md font-semibold text-on-surface hover:text-primary transition-colors border-b border-outline-variant/10 pb-2.5 flex items-center justify-between"
                >
                  {link.label}
                  <span className="material-symbols-outlined text-outline-variant text-sm">arrow_forward_ios</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-auto pt-6 border-t border-outline-variant/30 flex flex-col gap-4">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-primary text-on-primary font-label-md text-label-md py-3 rounded-lg hover:bg-primary-container shadow-md transition-colors"
            >
              Get In Touch
            </a>
            <p className="text-center font-body-sm text-body-sm text-on-surface-variant">
              © {new Date().getFullYear()} {brandName}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
