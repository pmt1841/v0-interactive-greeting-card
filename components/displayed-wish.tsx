"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { getWishById } from "@/lib/wish-storage"
import type { Wish } from "@/lib/wish-storage"

interface DisplayedWishProps {
  wishId: string
}

export default function DisplayedWish({ wishId }: DisplayedWishProps) {
  const [wish, setWish] = useState<Wish | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const loadWish = () => {
      const foundWish = getWishById(wishId)
      setWish(foundWish)
      setLoading(false)
    }

    loadWish()
  }, [wishId])

  const handleCopyMessage = () => {
    if (wish) {
      navigator.clipboard.writeText(`${wish.senderName}: ${wish.message}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-amber-700 text-lg">Đang tải lời chúc...</p>
      </div>
    )
  }

  if (!wish) {
    return (
      <div className="text-center py-20">
        <p className="text-amber-700 text-lg mb-4">Không tìm thấy lời chúc</p>
        <Button
          onClick={() => (window.location.href = "/")}
          className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold px-6 py-3 rounded-full"
        >
          Quay lại trang chủ
        </Button>
      </div>
    )
  }

  const createdDate = new Date(wish.createdAt).toLocaleDateString("vi-VN")

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-3">Thiệp Chúc Mừng</h1>
        <p className="text-xl text-amber-700">Ngày Nhà Giáo Việt Nam - 20/11</p>
      </div>

      <div className="envelope-open-animation">
        <div className="w-full bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-2xl p-8 md:p-12 border-4 border-amber-200">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-2">❤️ Cảm Ơn Thầy/Cô ❤️</h2>
            <p className="text-amber-700 text-lg">Ngày Nhà Giáo Việt Nam - 20/11</p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="text-center">
              <div className="text-9xl md:text-10xl mb-4">🎓</div>
              <p className="text-amber-700 font-semibold">Nhà giáo - Nguồn sáng của quốc hội</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 mb-8 border-2 border-amber-200 shadow-md">
            <p className="text-amber-600 text-sm mb-4">Lời chúc từ:</p>
            <p className="text-2xl font-bold text-amber-900 mb-6">{wish.senderName}</p>

            <div className="border-t-2 border-b-2 border-amber-200 py-6 mb-6">
              <p className="text-amber-800 text-lg leading-relaxed italic">"{wish.message}"</p>
            </div>

            <p className="text-amber-600 text-xs">Ngày gửi: {createdDate}</p>
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              onClick={handleCopyMessage}
              className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white font-bold px-8 py-3 rounded-full transition-all"
            >
              {copied ? "✓ Đã sao chép" : "📋 Sao Chép Lời Chúc"}
            </Button>
            <Button
              onClick={() => (window.location.href = "/")}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold px-8 py-3 rounded-full"
            >
              Gửi Lời Chúc Của Bạn
            </Button>
          </div>

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
    </div>
  )
}
