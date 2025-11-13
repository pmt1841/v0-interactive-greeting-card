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

  return (
    <div className="w-full max-w-xl mx-auto">
      {!isOpen ? (
        // Envelope closed state
        <div className="relative w-full h-64 md:h-80 cursor-pointer group perspective" onClick={onOpen}>
          {/* Envelope body */}
          <div className="relative w-full h-full bg-gradient-to-br from-rose-200 via-pink-100 to-red-100 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center group-hover:shadow-3xl transition-all duration-300 group-hover:envelope-hover">
            {/* Envelope flap */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-red-400 to-red-300 rounded-t-2xl transform group-hover:scale-105 transition-transform duration-300 origin-top flex items-center justify-center text-4xl opacity-90">
              ✉️
            </div>

            {/* Decoration on envelope */}
            <div className="absolute inset-8 border-4 border-dashed border-amber-300/40 rounded-lg"></div>

            {/* Center content */}
            <div className="relative z-10 text-center">
              <p className="text-2xl md:text-3xl font-bold text-amber-900 mb-2">Lời chúc</p>
              <p className="text-amber-700 text-sm md:text-base">Từ các em học sinh</p>
              <p className="text-3xl mt-4">👨‍🏫 👩‍🏫</p>
            </div>

            {/* Hover hint */}
            <div className="absolute bottom-4 text-xs md:text-sm text-amber-600 animate-bounce">Nhấn để mở ✨</div>
          </div>
        </div>
      ) : (
        // Envelope opened state
        <div className="envelope-open-animation">
          <div className="w-full bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-2xl p-8 md:p-12 border-4 border-amber-200">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-2">❤️ Cảm Ơn Thầy/Cô ❤️</h2>
              <p className="text-amber-700 text-lg">Ngày Nhà Giáo Việt Nam - 20/11</p>
            </div>

            {/* Teacher illustration area */}
            <div className="flex justify-center mb-8">
              <div className="text-center">
                <div className="text-9xl md:text-10xl mb-4">🎓</div>
                
              </div>
            </div>

            {/* Wish form or saved wishes */}
            {!showForm ? (
              <div className="flex flex-col gap-4 items-center mb-8">
                <p className="text-amber-700 text-center mb-2">Hãy viết lời chúc chân thành nhất</p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  ✍️ Viết Lời Chúc
                </Button>
              </div>
            ) : (
              <div className="mb-8">
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
            <div className="flex justify-center gap-4 flex-wrap">
              <Button
                onClick={onShareQR}
                variant="outline"
                className="border-2 border-amber-400 text-amber-700 hover:bg-amber-50 font-semibold px-6 py-4 rounded-full transition-all duration-300 bg-transparent"
              >
                📱 Chia Sẻ QR Code
              </Button>
            </div>

            {/* Decorative elements */}
            <div className="flex justify-center gap-8 mt-8 text-4xl">
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
