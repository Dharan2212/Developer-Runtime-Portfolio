import { create } from 'zustand'

export type UserState = 'Observer' | 'Explorer' | 'Inspector' | 'Evaluator' | 'Connector'
export type Mode = 'Overview' | 'Deep' | 'Signal'
export type Movement = 'Context Shift' | 'Drill Down' | 'Lateral Shift'
export type ModuleKey =
  | 'identityGraph'
  | 'systemsBuilt'
  | 'capabilityMatrix'
  | 'experimental'
  | 'signals'

interface RuntimeStore {
  mode: Mode
  userState: UserState
  activeModule: ModuleKey
  selectedSignal: 'foundational' | 'validation' | 'intelligence'
  inspectorOpen: boolean
  failureVisible: boolean
  invocations: number
  movementLog: Movement[]
  setMode: (mode: Mode) => void
  contextShift: (module: ModuleKey) => void
  drillDown: () => void
  lateralShift: () => void
  toggleInspector: () => void
  toggleFailure: () => void
  setSignal: (signal: 'foundational' | 'validation' | 'intelligence') => void
}

const progression: UserState[] = ['Observer', 'Explorer', 'Inspector', 'Evaluator', 'Connector']

const nextUserState = (current: UserState): UserState =>
  progression[Math.min(progression.indexOf(current) + 1, progression.length - 1)]

const pushMovement = (movement: Movement, log: Movement[]): Movement[] => [movement, ...log].slice(0, 5)

export const useRuntimeStore = create<RuntimeStore>((set) => ({
  mode: 'Overview',
  userState: 'Observer',
  activeModule: 'identityGraph',
  selectedSignal: 'foundational',
  inspectorOpen: false,
  failureVisible: false,
  invocations: 1287,
  movementLog: [],
  setMode: (mode) => set(() => ({ mode })),
  contextShift: (activeModule) =>
    set((state) => ({
      activeModule,
      movementLog: pushMovement('Context Shift', state.movementLog),
      userState: nextUserState(state.userState),
    })),
  drillDown: () =>
    set((state) => ({
      inspectorOpen: true,
      movementLog: pushMovement('Drill Down', state.movementLog),
      userState: nextUserState(state.userState),
    })),
  lateralShift: () =>
    set((state) => ({
      selectedSignal:
        state.selectedSignal === 'foundational'
          ? 'validation'
          : state.selectedSignal === 'validation'
            ? 'intelligence'
            : 'foundational',
      movementLog: pushMovement('Lateral Shift', state.movementLog),
      userState: nextUserState(state.userState),
    })),
  toggleInspector: () => set((state) => ({ inspectorOpen: !state.inspectorOpen })),
  toggleFailure: () => set((state) => ({ failureVisible: !state.failureVisible })),
  setSignal: (selectedSignal) => set(() => ({ selectedSignal })),
}))
