"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { getTranslation } from "@/lib/translations";
import Link from "next/link";
import { IProfessional } from "@/lib/models/Professional";

export default function ProfessionalProfilePage() {
  const params = useParams();
  const { language } = useLanguage();
  const t = getTranslation(language);
  const [professional, setProfessional] = useState<IProfessional | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProfessional = async () => {
      try {
        const response = await fetch(`/api/professionals/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setProfessional(data.professional);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching professional:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProfessional();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-gray-600">
            {language === "en" ? "Loading..." : "Chargement..."}
          </div>
        </div>
      </div>
    );
  }

  if (error || !professional) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === "en"
              ? "Professional not found"
              : "Professionnel non trouvé"}
          </h1>
          <Link
            href="/professionals"
            className="text-emerald-600 hover:underline"
          >
            {language === "en"
              ? "Back to professionals"
              : "Retour aux professionnels"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-start space-x-6 mb-6 md:mb-0">
              <Image
                src={professional.avatar}
                alt={professional.name}
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {professional.name}
                </h1>
                <p className="text-xl text-gray-600 mb-2">
                  {professional.title}
                </p>
                <p className="text-gray-500 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
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
                <div className="flex items-center mt-3">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-2 text-gray-900 font-semibold text-lg">
                    {professional.rating}
                  </span>
                  <span className="ml-2 text-gray-500">
                    ({professional.totalReviews} {t.reviews})
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-3xl font-bold text-emerald-600 mb-4">
                ${professional.hourlyRate}/hr
              </div>
              <Link
                href="/find-professional"
                className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
              >
                {t.hireNow}
              </Link>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t.aboutSection}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {language === "en" ? professional.bio : professional.bioFr}
          </p>
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              {language === "en" ? "Languages" : "Langues"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(professional.languages || []).map((lang) => (
                <span
                  key={lang}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.skills}</h2>
          <div className="flex flex-wrap gap-3">
            {(professional.skills || []).map((skill) => (
              <span
                key={skill}
                className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t.portfolio}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(professional.portfolio || []).map((item) => (
              <div
                key={item.title}
                className="rounded-lg overflow-hidden border border-gray-200"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {language === "en" ? item.title : item.titleFr}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.reviews}</h2>
          <div className="space-y-6">
            {(professional.reviews || []).map((review, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-6 last:border-b-0"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {review.clientName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString(
                        language === "en" ? "en-US" : "fr-FR",
                        { year: "numeric", month: "long", day: "numeric" },
                      )}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">
                  {language === "en" ? review.comment : review.commentFr}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
