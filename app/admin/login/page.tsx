"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import { getTranslation } from "@/lib/translations";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { language } = useLanguage();
  const t = getTranslation(language);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            {language === "en" ? "Admin Login" : "Connexion Admin"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {language === "en"
              ? "Sign in to access the admin dashboard"
              : "Connectez-vous pour accéder au tableau de bord admin"}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {language === "en" ? "Email" : "Email"}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder={
                  language === "en" ? "admin@myprofinder" : "admin@myprofinder"
                }
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {language === "en" ? "Password" : "Mot de passe"}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder={
                  language === "en"
                    ? "Enter your password"
                    : "Entrez votre mot de passe"
                }
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? language === "en"
                  ? "Signing in..."
                  : "Connexion..."
                : language === "en"
                  ? "Sign In"
                  : "Se connecter"}
            </button>
          </div>

          <div className="text-sm text-center text-gray-600">
            <p className="font-mono bg-gray-100 p-3 rounded">
              {language === "en"
                ? "Default credentials:"
                : "Identifiants par défaut:"}
              <br />
              Email: admin@myprofinder
              <br />
              {language === "en" ? "Password" : "Mot de passe"}: admin123
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
