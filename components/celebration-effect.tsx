"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface CelebrationEffectProps {
  message: string
  containerRef: React.RefObject<HTMLDivElement>
}

interface Particle {
  id: number
  type: "balloon" | "flower" | "sparkle"
  left: number
  delay: number
  duration: number
}

export default function CelebrationEffect({ message, containerRef }: CelebrationEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const types: Array<"balloon" | "flower" | "sparkle"> = ["balloon", "flower", "sparkle"]
    const newParticles: Particle[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      type: types[Math.floor(Math.random() * types.length)],
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
      duration: 2 + Math.random() * 1.5,
    }))

    setParticles(newParticles)

    const timer = setTimeout(() => {
      setParticles([])
    }, 4000)

    return () => clearTimeout(timer)
  }, [message])

  const getEmoji = (type: string) => {
    switch (type) {
      case "balloon":
        const balloons = ["🎈", "🎈", "🎈"]
        return balloons[Math.floor(Math.random() * balloons.length)]
      case "flower":
        const flowers = ["🌹", "🌺", "🌼", "🌸"]
        return flowers[Math.floor(Math.random() * flowers.length)]
      case "sparkle":
        const sparkles = ["✨", "⭐", "💫"]
        return sparkles[Math.floor(Math.random() * sparkles.length)]
      default:
        return "✨"
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Message display */}
      <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
        <div className="bg-gradient-to-r from-rose-300 via-pink-300 to-red-300 text-white px-8 py-4 rounded-full shadow-xl font-bold text-lg md:text-xl text-center max-w-sm backdrop-blur-sm">
          ❤️ {message} ❤️
        </div>
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="float-animation fixed text-3xl md:text-4xl"
          style={
            {
              left: `${particle.left}%`,
              bottom: "0",
              "--tx": `${Math.random() * 200 - 100}px`,
              animation: `float-up ${particle.duration}s linear forwards`,
              animationDelay: `${particle.delay}s`,
            } as React.CSSProperties & { "--tx": string }
          }
        >
          {getEmoji(particle.type)}
        </div>
      ))}

      {/* Confetti-like effect */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`confetti-${i}`}
            className="absolute text-lg md:text-2xl opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: "50%",
              animation: `float-up ${2.5 + Math.random()}s linear forwards`,
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          >
            {["🎊", "🎉", "🎁"][Math.floor(Math.random() * 3)]}
          </div>
        ))}
      </div>
    </div>
  )
}
