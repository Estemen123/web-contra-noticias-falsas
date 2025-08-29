import { create } from 'zustand'

interface SingnsState {
  open: boolean
  setOpen: (value: boolean) => void
}
interface VideElemtState {
  video: number
  setvideo: (value: number) => void
}
interface VideoResultState {
  video: number
  setvideo: (value: number) => void
}

export const useSignsStore = create<SingnsState>()((set) => ({
  open: false,
  setOpen: (value: boolean) => set((state) => ({ open: value })),
}))

export const useVideoElemtStore = create<VideElemtState>()((set) => ({
  video: 100,
  setvideo: (value: number) => set((state) => ({ video: value })),
}))
export const useVideoResultState = create<VideoResultState>()((set) => ({
  video: 100,
  setvideo: (value: number) => set((state) => ({ video: value })),
}))
