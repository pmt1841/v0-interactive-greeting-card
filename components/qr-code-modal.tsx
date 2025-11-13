"use client"

import { useEffect, useState } from "react"
import QRCode from "qrcode"
import { Button } from "@/components/ui/button"

interface QRCodeModalProps {
  onClose: () => void
}

export default function QRCodeModal({ onClose }: QRCodeModalProps) {
  const [qrCode, setQrCode] = useState<string>("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const generateQR = async () => {
      try {
        const url = typeof window !== "undefined" ? window.location.href : ""
        const qr = await QRCode.toDataURL(url, {
          errorCorrectionLevel: "H",
          type: "image/png",
          quality: 0.95,
          margin: 1,
          width: 300,
          color: {
            dark: "#92400e",
            light: "#fef3c7",
          },
        })
        setQrCode(qr)
      } catch (err) {
        console.error("Error generating QR code:", err)
      }
    }

    generateQR()
  }, [])

  const handleCopyLink = () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-2xl p-8 max-w-md w-full border-4 border-amber-200 transform transition-all">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-amber-900 mb-2">Chia Sẻ Thiệp Chúc Mừng</h3>
          <p className="text-amber-700">Quét mã QR hoặc sao chép liên kết để chia sẻ</p>
        </div>

        {qrCode && (
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <img src={qrCode || "/placeholder.svg"} alt="QR Code" className="w-64 h-64" />
            </div>
          </div>
        )}

        <div className="space-y-3 mb-6">
          <Button
            onClick={handleCopyLink}
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold py-3 rounded-full transition-all"
          >
            {copied ? "✓ Đã sao chép liên kết!" : "📋 Sao Chép Liên Kết"}
          </Button>
        </div>

        <Button
          onClick={onClose}
          variant="outline"
          className="w-full border-2 border-amber-400 text-amber-700 hover:bg-amber-50 font-semibold py-2 rounded-full bg-transparent"
        >
          Đóng
        </Button>

        <p className="text-xs text-center text-amber-600 mt-4">✨ Chia sẻ thiệp này với các bạn ✨</p>
      </div>
    </div>
  )
}
