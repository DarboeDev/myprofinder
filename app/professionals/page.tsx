"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { getTranslation } from "@/lib/translations";
import { categories } from "@/lib/dummy-data";
import { IProfessional } from "@/lib/models/Professional";

export default function ProfessionalsPage() {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [professionals, setProfessionals] = useState<IProfessional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const url = new URL("/api/professionals", window.location.origin);
        if (searchQuery) url.searchParams.set("search", searchQuery);
        if (selectedCategory !== "all")
          url.searchParams.set("category", selectedCategory);

        const response = await fetch(url.toString());
        if (response.ok) {
          const data = await response.json();
          setProfessionals(data.professionals || []);
        }
      } catch (error) {
        console.error("Error fetching professionals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, [searchQuery, selectedCategory]);

  const filteredProfessionals = professionals;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.professionalsTitle}
          </h1>
          <p className="text-xl text-gray-600">{t.professionalsSubtitle}</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder={
                  language === "en"
                    ? "Search by name, title, or skills..."
                    : "Rechercher par nom, titre ou compétences..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <select
              title={
                language === "en"
                  ? "Filter by category"
                  : "Filtrer par catégorie"
              }
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 bg-white"
            >
              <option value="all">
                {language === "en" ? "All Categories" : "Toutes les Catégories"}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {language === "en" ? category.name : category.nameFr}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Professionals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-3 text-center py-12">
              <div className="text-gray-600">
                {language === "en"
                  ? "Loading professionals..."
                  : "Chargement des professionnels..."}
              </div>
            </div>
          ) : filteredProfessionals.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <div className="text-gray-600">
                {language === "en"
                  ? "No professionals found"
                  : "Aucun professionnel trouvé"}
              </div>
            </div>
          ) : (
            filteredProfessionals.map((professional) => (
              <Link
                key={professional._id}
                href={`/professionals/${professional._id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <Image
                      src={professional.avatar}
                      alt={professional.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-gray-900">
                        {professional.name}
                      </h3>
                      <p className="text-gray-600">{professional.title}</p>
                      <p className="text-gray-500 text-sm flex items-center mt-1">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {professional.location}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 line-clamp-2">
                      {language === "en"
                        ? professional.bio
                        : professional.bioFr}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-gray-900 font-semibold">
                        {professional.rating}
                      </span>
                      <span className="ml-1 text-gray-500 text-sm">
                        ({professional.totalReviews})
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {professional.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-emerald-600 font-semibold text-lg">
                      ${professional.hourlyRate}/hr
                    </div>
                    <span className="text-emerald-600 font-medium hover:underline">
                      {t.viewProfile} →
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
