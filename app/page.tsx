"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import EnvelopeCard from "@/components/envelope-card"
import CelebrationEffect from "@/components/celebration-effect"
import QRCodeModal from "@/components/qr-code-modal"
import DisplayedWish from "@/components/displayed-wish"
import { saveWish, getWishById } from "@/lib/wish-storage"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationMessage, setCelebrationMessage] = useState("")
  const [showQRModal, setShowQRModal] = useState(false)
  const [displayedWishId, setDisplayedWishId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const wishId = searchParams.get("wish")
    if (wishId) {
      const wish = getWishById(wishId)
      if (wish) {
        setDisplayedWishId(wishId)
        setIsOpen(true)
      }
    }
  }, [searchParams])

  const handleSendWish = (senderName: string, message: string) => {
    const wishId = saveWish({ senderName, message })

    setCelebrationMessage(`${senderName}: ${message}`)
    setShowCelebration(true)

    setTimeout(() => {
      setShowCelebration(false)
    }, 3000)

    return wishId
  }

  const handleShareQR = () => {
    setShowQRModal(true)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowQRModal(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <main
      ref={containerRef}
      className="min-h-screen w-full bg-gradient-to-br from-yellow-50 via-rose-50 to-orange-50 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-2xl">
        {displayedWishId ? (
          <DisplayedWish wishId={displayedWishId} />
        ) : (
          <>
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-3">Chúc Mừng</h1>
              <p className="text-amber-700 text-4xl">Ngày Nhà Giáo Việt Nam - 20/11</p>
              
            </div>

            <div className="flex flex-col items-center gap-8">
              <EnvelopeCard
                isOpen={isOpen}
                onOpen={() => setIsOpen(true)}
                onSendWish={handleSendWish}
                onShareQR={handleShareQR}
              />

              {showCelebration && <CelebrationEffect message={celebrationMessage} containerRef={containerRef} />}
            </div>

            <div className="mt-12 text-center text-amber-700 text-sm">
              <p>✨ Cảm ơn các thầy cô đã dạy dỗ chúng em ✨</p>
            </div>
          </>
        )}

        {showQRModal && <QRCodeModal onClose={() => setShowQRModal(false)} />}
      </div>
    </main>
  )
}
