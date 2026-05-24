import type { GameState } from "../useGame";

export function HUD({ state }: { state: GameState }) {
  const hpPct = (state.hp / state.maxHp) * 100;
  const xpNeeded = state.level * 40;
  const xpPct = (state.xp / xpNeeded) * 100;
  return (
    <div className="parchment-panel rounded-md px-5 py-3 flex items-center gap-6 text-sm">
      <div>
        <div className="font-display text-gold text-xs uppercase tracking-widest opacity-70">
          {state.playerName}
        </div>
        <div className="font-display text-foreground">Lv. {state.level}</div>
      </div>
      <div className="flex-1 min-w-[140px]">
        <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
          <span>Vitality</span>
          <span className="font-mono">{state.hp}/{state.maxHp}</span>
        </div>
        <div className="h-2 rounded-full bg-ink/60 overflow-hidden border border-border">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${hpPct}%`,
              background:
                hpPct > 50
                  ? "linear-gradient(90deg, oklch(0.5 0.18 25), oklch(0.65 0.22 28))"
                  : "linear-gradient(90deg, oklch(0.4 0.2 22), oklch(0.55 0.24 25))",
            }}
          />
        </div>
      </div>
      <div className="flex-1 min-w-[120px]">
        <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
          <span>Lore</span>
          <span className="font-mono">{state.xp}/{xpNeeded}</span>
        </div>
        <div className="h-2 rounded-full bg-ink/60 overflow-hidden border border-border">
          <div
            className="h-full bg-gradient-to-r from-arcane to-arcane-glow transition-all duration-500"
            style={{ width: `${xpPct}%` }}
          />
        </div>
      </div>
      <div className="text-center">
        <div className="font-display text-gold text-lg leading-none">{state.potions}</div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Elixirs</div>
      </div>
    </div>
  );
}