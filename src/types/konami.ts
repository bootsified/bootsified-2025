export interface KonamiCodeState {
  isActivated: boolean
  progress: number
  totalLength: number
  deactivate: () => void
  resetSequence: () => void
}

export interface KonamiEasterEggProps {
  isActive: boolean
  onClose: () => void
}