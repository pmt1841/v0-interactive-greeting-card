export interface Wish {
  id: string
  senderName: string
  message: string
  createdAt: number
}

export const generateWishId = (): string => {
  return Math.random().toString(36).substring(2, 11)
}

export const saveWish = (wish: Omit<Wish, "id" | "createdAt">): string => {
  const id = generateWishId()
  const fullWish: Wish = {
    id,
    ...wish,
    createdAt: Date.now(),
  }

  // Get existing wishes
  const existingWishes = getWishes()
  existingWishes.push(fullWish)

  // Save to localStorage
  localStorage.setItem("greeting_wishes", JSON.stringify(existingWishes))

  return id
}

export const getWishes = (): Wish[] => {
  if (typeof window === "undefined") return []

  try {
    const wishes = localStorage.getItem("greeting_wishes")
    return wishes ? JSON.parse(wishes) : []
  } catch {
    return []
  }
}

export const getWishById = (id: string): Wish | null => {
  const wishes = getWishes()
  return wishes.find((w) => w.id === id) || null
}

export const generateShareUrl = (wishId: string): string => {
  if (typeof window === "undefined") return ""
  const baseUrl = window.location.origin + window.location.pathname
  return `${baseUrl}?wish=${wishId}`
}
