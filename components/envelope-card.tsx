"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import WishForm from "./wish-form"

interface EnvelopeCardProps {
  isOpen: boolean
  onOpen: () => void
  onSendWish: (senderName: string, message: string) => void
  onShareQR: () => void
}

export default function EnvelopeCard({ isOpen, onOpen, onSendWish, onShareQR }: EnvelopeCardProps) {
  const [showForm, setShowForm] = useState(false)
  const [cardRevealed, setCardRevealed] = useState(false)

  const handleOpen = () => {
    onOpen()
    setTimeout(() => {
      setCardRevealed(true)
    }, 800)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!isOpen ? (
        <div className="relative w-full h-72 md:h-96 cursor-pointer group" onClick={handleOpen} style={{ perspective: "1200px" }}>
          {/* Envelope shadow */}
          <div className="absolute inset-0 bg-black/10 rounded-3xl blur-2xl"></div>

          {/* Main envelope body */}
          <div className="relative w-full h-full bg-gradient-to-br from-red-100 via-rose-50 to-pink-100 rounded-3xl shadow-2xl overflow-hidden group-hover:shadow-3xl transition-all duration-500 border-2 border-rose-200">
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-red-300 via-red-200 to-red-100 group-hover:from-red-400 group-hover:via-red-300 group-hover:to-red-200 transition-all duration-500">
              {/* Flap center fold line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1/2 bg-gradient-to-b from-red-400/50 to-red-100/20"></div>
              
              {/* Flap decoration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl md:text-7xl opacity-80 group-hover:opacity-100 transition-opacity">✉️</div>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            {/* Envelope body lower section */}
            <div className="absolute top-1/2 left-0 right-0 bottom-0 bg-gradient-to-b from-rose-100 to-pink-50">
              {/* Envelope triangle flaps at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-20">
                {/* Left triangle */}
                <div className="absolute bottom-0 left-0 w-1/2 h-20 bg-gradient-to-tr from-red-200 to-red-100/50 opacity-60" style={{
                  clipPath: "polygon(0 0, 100% 100%, 0 100%)"
                }}></div>
                {/* Right triangle */}
                <div className="absolute bottom-0 right-0 w-1/2 h-20 bg-gradient-to-tl from-red-200 to-red-100/50 opacity-60" style={{
                  clipPath: "polygon(0 100%, 100% 0, 100% 100%)"
                }}></div>
              </div>
            </div>

            {/* Center content */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-3 text-center px-6">
              <p className="text-2xl md:text-3xl font-bold text-amber-900">Lời Chúc Thầy/Cô</p>
              <p className="text-amber-700 text-sm md:text-base">Ngày Nhà Giáo Việt Nam 20/11</p>
              <div className="text-4xl md:text-5xl pt-2">🎓</div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs md:text-sm text-red-600 font-semibold animate-pulse">
              Nhấn để mở ✨
            </div>

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl border-2 border-red-400/50 shadow-inner"></div>
          </div>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-pulse"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + Math.sin(i) * 20}%`,
                  animation: `float-up ${2 + i * 0.3}s ease-in forwards`,
                  animationDelay: `${i * 0.1}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className={`absolute -top-32 left-1/2 -translate-x-1/2 w-80 md:w-96 h-40 bg-gradient-to-b from-red-300 to-red-100 rounded-t-3xl shadow-xl border-2 border-rose-200 border-b-0 envelope-scale-up-animation z-50 flex items-center justify-center text-5xl pointer-events-none transition-opacity duration-100 ${
            cardRevealed ? "opacity-0" : "opacity-100"
          }`}>
            ✉️
          </div>

          <div className={`w-full bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-amber-200 relative mt-12 transition-all duration-700 ${
            cardRevealed 
              ? "card-slide-up-animation opacity-100 translate-y-0" 
              : "opacity-0 translate-y-full"
          }`}>
            <div className="absolute inset-0 shine-flash rounded-3xl pointer-events-none"></div>

            {/* Header */}
            <div className="text-center mb-8 relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-2">❤️ Cảm Ơn Thầy/Cô ❤️</h2>
              <p className="text-amber-700 text-lg">Ngày Nhà Giáo Việt Nam - 20/11</p>
            </div>

            {/* Teacher illustration area */}
            <div className="flex justify-center mb-8 relative z-10">
              <div className="text-center">
                <div className="text-9xl md:text-10xl mb-4 animate-bounce">🎓</div>
              </div>
            </div>

            {/* Wish form or saved wishes */}
            {!showForm ? (
              <div className="flex flex-col gap-4 items-center mb-8 relative z-10">
                <p className="text-amber-700 text-center mb-2">Hãy viết lời chúc chân thành nhất</p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  ✍️ Viết Lời Chúc
                </Button>
              </div>
            ) : (
              <div className="mb-8 relative z-10">
                <WishForm
                  onSend={(senderName, message) => {
                    onSendWish(senderName, message)
                    setShowForm(false)
                  }}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            )}

            {/* Share QR code button */}
            <div className="flex justify-center gap-4 flex-wrap relative z-10">
              <Button
                onClick={onShareQR}
                variant="outline"
                className="border-2 border-amber-400 text-amber-700 hover:bg-amber-50 font-semibold px-6 py-4 rounded-full transition-all duration-300 bg-transparent"
              >
                📱 Chia Sẻ QR Code
              </Button>
            </div>

            {/* Decorative elements */}
            <div className="flex justify-center gap-8 mt-8 text-4xl relative z-10">
              <span className="animate-bounce" style={{ animationDelay: "0s" }}>
                🌼
              </span>
              <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                🎉
              </span>
              <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                🌸
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
