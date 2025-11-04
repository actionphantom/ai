"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

const COUNTRY_CODES: Record<string, { code: string; flag: string }> = {
  US: { code: "+1", flag: "🇺🇸" },
  GB: { code: "+44", flag: "🇬🇧" },
  CA: { code: "+1", flag: "🇨🇦" },
  AU: { code: "+61", flag: "🇦🇺" },
  UA: { code: "+380", flag: "🇺🇦" },
  RU: { code: "+7", flag: "🇷🇺" },
  DE: { code: "+49", flag: "🇩🇪" },
  FR: { code: "+33", flag: "🇫🇷" },
  ES: { code: "+34", flag: "🇪🇸" },
  IT: { code: "+39", flag: "🇮🇹" },
  JP: { code: "+81", flag: "🇯🇵" },
  CN: { code: "+86", flag: "🇨🇳" },
  IN: { code: "+91", flag: "🇮🇳" },
}

const DEFAULT_COUNTRY = { code: "+1", flag: "🌍" }

export function RegistrationForm() {
  const { language } = useLanguage()
  const t = translations[language]

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "beginner",
  })
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()
        const detectedCountry = data.country_code || "US"
        setCountryCode(COUNTRY_CODES[detectedCountry] || DEFAULT_COUNTRY)
      } catch (err) {
        console.log("[v0] Failed to detect country, using default")
        setCountryCode(DEFAULT_COUNTRY)
      }
    }

    detectCountry()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!formData.fullName.trim()) {
      setError(t.errorName)
      setLoading(false)
      return
    }
    if (!formData.email.trim()) {
      setError(t.errorEmail)
      setLoading(false)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError(t.errorEmailInvalid)
      setLoading(false)
      return
    }
    if (!formData.phone.trim()) {
      setError(t.errorPhone)
      setLoading(false)
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitted(true)
      setFormData({ fullName: "", email: "", phone: "", experience: "beginner" })
    } catch (err) {
      setError(t.errorGeneral)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <Card className="p-8 border-primary/30 bg-gradient-to-br from-card/50 to-card/20 text-center space-y-4 animate-fade-in-up">
        <div className="flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-accent animate-glow-pulse" />
        </div>
        <div>
          <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t.successTitle}
          </h3>
          <p className="text-muted-foreground mb-6">{t.successMessage}</p>
          <Button
            variant="outline"
            onClick={() => setSubmitted(false)}
            className="border-primary/30 hover:border-primary/60"
          >
            {t.registerAnother}
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-8 border border-primary/30 bg-gradient-to-br from-card/50 to-card/20 space-y-6 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-foreground font-semibold">
            {t.fullName}
          </Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder={t.fullNamePlaceholder}
            value={formData.fullName}
            onChange={handleChange}
            className="bg-input/50 border-primary/20 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/50"
            aria-label={t.fullName}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-semibold">
            {t.email}
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={t.emailPlaceholder}
            value={formData.email}
            onChange={handleChange}
            className="bg-input/50 border-primary/20 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/50"
            aria-label={t.email}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground font-semibold">
            {t.phone}
          </Label>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-input/50 border border-primary/20 rounded-md min-w-fit">
              <span className="text-lg">{countryCode.flag}</span>
              <span className="text-foreground font-semibold">{countryCode.code}</span>
            </div>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder={t.phonePlaceholder}
              value={formData.phone}
              onChange={handleChange}
              className="flex-1 bg-input/50 border-primary/20 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/50"
              aria-label={t.phone}
              disabled={loading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience" className="text-foreground font-semibold">
            {t.experienceLevel}
          </Label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-input/50 border border-primary/20 rounded-md text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 disabled:opacity-50"
            aria-label={t.experienceLevel}
            disabled={loading}
          >
            <option value="beginner">{t.experienceBegineer}</option>
            <option value="intermediate">{t.experienceIntermediate}</option>
            <option value="advanced">{t.experienceAdvanced}</option>
          </select>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-3 items-start animate-fade-in-up">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 font-semibold"
          aria-label={loading ? t.registering : t.registerButton}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              {t.registering}
            </span>
          ) : (
            t.registerButton
          )}
        </Button>
      </form>

      <p className="text-xs text-muted-foreground text-center">{t.privacyMessage}</p>
    </Card>
  )
}
