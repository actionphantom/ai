"use client"
import { Brain, Zap, Code2, Lightbulb, ArrowRight, Play, Star, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { RegistrationForm } from "@/components/registration-form"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useEffect, useRef } from "react"

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  element?.scrollIntoView({ behavior: "smooth" })
}

const modules = [
  {
    id: "module-1",
    icon: <Brain className="w-8 h-8" />,
    color: "from-violet-500 to-indigo-600",
    bgColor: "from-violet-500/10 to-indigo-600/10",
  },
  {
    id: "module-2",
    icon: <Code2 className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-600",
    bgColor: "from-blue-500/10 to-cyan-600/10",
  },
  {
    id: "module-3",
    icon: <Zap className="w-8 h-8" />,
    color: "from-pink-500 to-orange-600",
    bgColor: "from-pink-500/10 to-orange-600/10",
  },
  {
    id: "module-4",
    icon: <Lightbulb className="w-8 h-8" />,
    color: "from-cyan-500 to-teal-600",
    bgColor: "from-cyan-500/10 to-teal-600/10",
  },
]

export default function Home() {
  const { t } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{ x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }> = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "rgba(124, 58, 237, 0.3)"

      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.globalAlpha = p.opacity
        ctx.fillRect(p.x, p.y, p.size, p.size)
      })
      ctx.globalAlpha = 1

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-40" />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 animate-slide-in-left" style={{ animationDelay: "0s" }}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center glow-primary">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">{t.navBrand}</span>
          </div>
          <div className="flex items-center gap-4 animate-slide-in-right" style={{ animationDelay: "0s" }}>
            <LanguageSwitcher />
            <Button
              onClick={() => scrollToSection("registration")}
              className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 text-white font-semibold transition-all duration-300"
            >
              {t.heroCTA}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 px-4 sm:px-6 lg:px-8 gradient-hero overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/3 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "4s" }}
          />
        </div>

        <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
          <div
            className="inline-block px-4 py-2 rounded-full bg-primary/20 border border-primary/40 animate-fade-in-up"
            style={{ animationDelay: "0s" }}
          >
            <p className="text-primary font-semibold flex items-center gap-2">
              <Star className="w-4 h-4" /> {t.heroSubtitle}
            </p>
          </div>

          <h1
            className="text-6xl sm:text-7xl lg:text-8xl font-black leading-tight text-balance animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="gradient-text">{t.heroTitle}</span>
          </h1>

          <p
            className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t.heroDescription}
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("registration")}
              className="gap-2 bg-gradient-to-r from-primary to-accent text-white hover:shadow-xl hover:shadow-primary/50 font-semibold text-lg px-8 py-6 transition-all duration-300"
            >
              {t.heroCTA} <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("features")}
              className="gap-2 bg-transparent border-border hover:bg-white/5 font-semibold text-lg px-8 py-6"
            >
              <Play className="w-5 h-5" /> {t.heroDemo}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fade-in-up" style={{ animationDelay: "0s" }}>
            <h2 className="text-5xl sm:text-6xl font-black mb-6 gradient-text">{t.featuresTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.featuresSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: t.feature1Title,
                desc: t.feature1Desc,
                image: "/business-automation-modern-workflow.jpg",
                idx: 0,
              },
              { title: t.feature2Title, desc: t.feature2Desc, image: "/ai-creative-media-generation.jpg", idx: 1 },
              { title: t.feature3Title, desc: t.feature3Desc, image: "/digital-avatar-technology.jpg", idx: 2 },
              { title: t.feature4Title, desc: t.feature4Desc, image: "/advanced-ai-solutions-real-world.jpg", idx: 3 },
            ].map((feature, idx) => (
              <div key={idx} className="animate-fade-in-up group" style={{ animationDelay: `${0.1 * (idx + 1)}s` }}>
                <div className="relative h-full rounded-2xl overflow-hidden border border-border/40 hover:border-accent/60 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-background/50 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fade-in-up" style={{ animationDelay: "0s" }}>
            <h2 className="text-5xl sm:text-6xl font-black mb-6 gradient-text">{t.modulesTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.modulesSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: t.module1Title, key: "module1", idx: 0 },
              { title: t.module2Title, key: "module2", idx: 1 },
              { title: t.module3Title, key: "module3", idx: 2 },
              { title: t.module4Title, key: "module4", idx: 3 },
            ].map((module, idx) => (
              <div key={module.key} className="animate-fade-in-up" style={{ animationDelay: `${0.1 * (idx + 1)}s` }}>
                <div
                  className={`p-8 rounded-2xl border border-border/40 hover:border-accent/60 transition-all duration-300 bg-gradient-to-br ${modules[idx].bgColor} hover:shadow-2xl hover:shadow-primary/20 group`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-4 rounded-xl bg-gradient-to-br ${modules[idx].color} text-white glow-primary group-hover:scale-110 transition-transform duration-300`}
                    >
                      {modules[idx].icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-4 text-foreground">{module.title}</h3>
                      <ul className="space-y-3">
                        {[1, 2, 3, 4].map((i) => (
                          <li key={i} className="text-muted-foreground flex items-start gap-3">
                            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent mt-2 flex-shrink-0" />
                            <span>{t[`${module.key}Desc${i}` as keyof typeof t]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: t.stat1Number, label: t.stat1Label, icon: <Users className="w-8 h-8" />, idx: 0 },
              { number: t.stat2Number, label: t.stat2Label, icon: <TrendingUp className="w-8 h-8" />, idx: 1 },
              { number: t.stat3Number, label: t.stat3Label, icon: <Star className="w-8 h-8" />, idx: 2 },
            ].map((stat) => (
              <div key={stat.idx} className="animate-fade-in-up" style={{ animationDelay: `${0.1 * (stat.idx + 1)}s` }}>
                <div className="p-8 rounded-2xl border border-border/40 bg-gradient-to-br from-primary/10 to-accent/10 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 text-center group">
                  <div className="flex justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-5xl sm:text-6xl font-black gradient-text mb-3">{stat.number}</div>
                  <p className="text-muted-foreground text-lg">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-background/50 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fade-in-up" style={{ animationDelay: "0s" }}>
            <h2 className="text-5xl sm:text-6xl font-black mb-6 gradient-text">{t.benefitsTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.benefitsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${0.05 * i}s` }}>
                <div className="p-6 bg-card/40 rounded-2xl border border-border/40 hover:border-accent/60 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">{t[`benefit${i}Title` as keyof typeof t]}</h3>
                  <p className="text-muted-foreground text-sm">{t[`benefit${i}Desc` as keyof typeof t]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fade-in-up" style={{ animationDelay: "0s" }}>
            <h2 className="text-5xl sm:text-6xl font-black mb-6 gradient-text">{t.testimonialsTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.testimonialsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Chen", role: "Marketing Director", image: "/professional-woman-portrait.png", idx: 0 },
              {
                name: "Michael Rodriguez",
                role: "Business Consultant",
                image: "/professional-man-portrait.png",
                idx: 1,
              },
              {
                name: "Emily Johnson",
                role: "Content Creator",
                image: "/professional-woman-smiling-portrait.png",
                idx: 2,
              },
            ].map((testimonial) => (
              <div
                key={testimonial.idx}
                className="animate-fade-in-up"
                style={{ animationDelay: `${0.1 * (testimonial.idx + 1)}s` }}
              >
                <div className="p-8 rounded-2xl border border-border/40 bg-card/40 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:border-accent/60">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "This course transformed my career. I went from curious about AI to building production systems in
                    just 3 months!"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary/40"
                    />
                    <div>
                      <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="registration" className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up" style={{ animationDelay: "0s" }}>
            <h2 className="text-5xl sm:text-6xl font-black mb-6 gradient-text">{t.registrationTitle}</h2>
            <p className="text-lg text-muted-foreground">{t.registrationSubtitle}</p>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <RegistrationForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4 sm:px-6 lg:px-8 bg-background/50 text-center text-muted-foreground text-sm">
        <p>{t.footerText}</p>
      </footer>
    </main>
  )
}
