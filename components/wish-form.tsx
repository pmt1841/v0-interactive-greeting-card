"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface WishFormProps {
  onSend: (senderName: string, message: string) => void
  onCancel: () => void
}

export default function WishForm({ onSend, onCancel }: WishFormProps) {
  const [message, setMessage] = useState("")
  const [senderName, setSenderName] = useState("")

  const handleSend = () => {
    if (message.trim() && senderName.trim()) {
      onSend(senderName, message)
      setMessage("")
      setSenderName("")
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-amber-900 mb-2">Tên em:</label>
        <input
          type="text"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          placeholder="Nhập tên của em"
          className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-300 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-amber-900 mb-2">Lời chúc:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Viết lời chúc của em tại đây... (max 200 ký tự)"
          maxLength={200}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-300 transition-all resize-none"
        />
        <p className="text-xs text-amber-600 mt-1">{message.length}/200 ký tự</p>
      </div>

      <div className="flex gap-3 justify-end">
        <Button
          onClick={onCancel}
          variant="outline"
          className="border-2 border-amber-300 text-amber-700 hover:bg-amber-50 font-semibold bg-transparent"
        >
          Hủy
        </Button>
        <Button
          onClick={handleSend}
          disabled={!message.trim() || !senderName.trim()}
          className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold px-6 py-2 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🎉 Gửi Lời Chúc
        </Button>
      </div>
    </div>
  )
}
