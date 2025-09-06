import { create } from 'zustand';

interface IGroupStore {
  activeGroupId: string | null,
  setActiveGroupId: (groupId: string) => void;
  clearActiveGroupId: () => void;
}

const useGroupStore = create<IGroupStore>((set) => ({
  activeGroupId: null,
  setActiveGroupId: (groupId) => set({ activeGroupId: groupId }),
  clearActiveGroupId: () => set({ activeGroupId: null }),
}));

export const useGroup = () => {
  return {
    activeGroupId: useGroupStore((state) => state.activeGroupId),
    setActiveGroupId: useGroupStore((state) => state.setActiveGroupId),
    clearActiveGroupId: useGroupStore((state) => state.clearActiveGroupId),
  };
};
