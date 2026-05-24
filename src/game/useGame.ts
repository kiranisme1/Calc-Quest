import { useState, useCallback } from "react";
import { areas } from "./world";

export type Phase = "title" | "intro" | "map" | "battle" | "victory" | "defeat" | "ending";

export type GameState = {
  phase: Phase;
  areaIdx: number;
  encounterIdx: number;
  playerName: string;
  level: number;
  xp: number;
  hp: number;
  maxHp: number;
  potions: number;
  startTime: number;
};

const initial = (): GameState => ({
  phase: "title",
  areaIdx: 0,
  encounterIdx: 0,
  playerName: "Mathemage",
  level: 1,
  xp: 0,
  hp: 40,
  maxHp: 40,
  potions: 2,
  startTime: Date.now(),
});

export function useGame() {
  const [state, setState] = useState<GameState>(initial);

  const set = (patch: Partial<GameState>) =>
    setState((s) => ({ ...s, ...patch }));

  const startGame = (name: string) =>
    setState({ ...initial(), playerName: name || "Mathemage", phase: "intro", startTime: Date.now() });

  const enterMap = () => set({ phase: "map" });

  const startBattle = () => set({ phase: "battle" });

  const damagePlayer = useCallback((d: number) => {
    setState((s) => {
      const hp = Math.max(0, s.hp - d);
      return { ...s, hp, phase: hp === 0 ? "defeat" : s.phase };
    });
  }, []);

  const usePotion = () =>
    setState((s) => {
      if (s.potions <= 0) return s;
      return { ...s, potions: s.potions - 1, hp: Math.min(s.maxHp, s.hp + 25) };
    });

  const finishBattle = (xpGained: number) => {
    setState((s) => {
      const area = areas[s.areaIdx];
      const isLast = s.encounterIdx >= area.encounters.length - 1;
      const isFinalBoss = isLast && s.areaIdx >= areas.length - 1;
      let xp = s.xp + xpGained;
      let level = s.level;
      let maxHp = s.maxHp;
      let hp = s.hp;
      let potions = s.potions;
      while (xp >= level * 40) {
        xp -= level * 40;
        level += 1;
        maxHp += 12;
        hp = maxHp;
        potions += 1;
      }
      return {
        ...s,
        xp,
        level,
        maxHp,
        hp,
        potions,
        phase: isFinalBoss ? "ending" : "victory",
      };
    });
  };

  const advance = () => {
    setState((s) => {
      const area = areas[s.areaIdx];
      const isLast = s.encounterIdx >= area.encounters.length - 1;
      if (isLast) {
        const nextArea = s.areaIdx + 1;
        if (nextArea >= areas.length) return { ...s, phase: "ending" };
        return { ...s, areaIdx: nextArea, encounterIdx: 0, phase: "map" };
      }
      return { ...s, encounterIdx: s.encounterIdx + 1, phase: "map" };
    });
  };

  const reset = () => setState(initial());

  return {
    state,
    startGame,
    enterMap,
    startBattle,
    damagePlayer,
    usePotion,
    finishBattle,
    advance,
    reset,
  };
}