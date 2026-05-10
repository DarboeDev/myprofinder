"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { getTranslation } from "@/lib/translations";

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const t = getTranslation(language);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t.home, isActive: pathname === "/" },
    {
      href: "/professionals",
      label: t.browseProfessionalsNav,
      isActive:
        pathname === "/professionals" ||
        pathname?.startsWith("/professionals/"),
    },
    {
      href: "/find-professional",
      label: t.findProfessionalNav,
      isActive: pathname === "/find-professional",
    },
    { href: "/#how-it-works", label: t.howItWorks, isActive: false },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-emerald-600">
                MyProFinder
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition font-medium text-sm xl:text-base whitespace-nowrap ${
                  link.isActive
                    ? "text-emerald-600"
                    : "text-gray-700 hover:text-emerald-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1.5 text-sm font-medium transition ${
                  language === "en"
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("fr")}
                className={`px-3 py-1.5 text-sm font-medium transition ${
                  language === "fr"
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                FR
              </button>
            </div>
            <Link
              href="/find-professional"
              className="hidden lg:inline-flex bg-emerald-600 text-white px-3 xl:px-4 py-2 rounded-md hover:bg-emerald-700 transition text-sm xl:text-base whitespace-nowrap"
            >
              {t.findProfessionalNav}
            </Link>
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 transition"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-[60] transform transition-transform duration-300 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <span className="text-lg font-semibold text-emerald-600">Menu</span>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-md p-2 text-gray-700 hover:bg-gray-100 transition"
            aria-label="Close menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-5 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={`mobile-${link.href}`}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`block rounded-md px-3 py-2 font-medium transition ${
                link.isActive
                  ? "bg-emerald-50 text-emerald-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/find-professional"
            onClick={() => setIsMenuOpen(false)}
            className="block bg-emerald-600 text-white text-center px-4 py-2 rounded-md hover:bg-emerald-700 transition"
          >
            {t.findProfessionalNav}
          </Link>
        </div>
      </aside>
    </nav>
  );
}
