"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { getTranslation } from "@/lib/translations";

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const t = getTranslation(language);

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

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`transition font-medium ${
                pathname === "/"
                  ? "text-emerald-600"
                  : "text-gray-700 hover:text-emerald-600"
              }`}
            >
              {t.home}
            </Link>
            <Link
              href="/professionals"
              className={`transition font-medium ${
                pathname === "/professionals" || pathname?.startsWith("/professionals/")
                  ? "text-emerald-600"
                  : "text-gray-700 hover:text-emerald-600"
              }`}
            >
              {t.browseProfessionals}
            </Link>
            <Link
              href="/find-professional"
              className={`transition font-medium ${
                pathname === "/find-professional"
                  ? "text-emerald-600"
                  : "text-gray-700 hover:text-emerald-600"
              }`}
            >
              {t.findProfessional}
            </Link>
            <Link
              href="/#how-it-works"
              className="text-gray-700 hover:text-emerald-600 transition font-medium"
            >
              {t.howItWorks}
            </Link>
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
              className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
            >
              {t.findProfessional}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
