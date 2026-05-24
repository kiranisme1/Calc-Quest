import { motion } from "motion/react";
import { areas } from "../world";
import type { GameState } from "../useGame";
import { HUD } from "./HUD";

export function MapScreen({
  state,
  onEncounter,
  onPotion,
}: {
  state: GameState;
  onEncounter: () => void;
  onPotion: () => void;
}) {
  const area = areas[state.areaIdx];
  const enemy = area.encounters[state.encounterIdx];
  return (
    <div className={`min-h-screen px-6 py-6 bg-gradient-to-b ${area.ambient}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        <HUD state={state} />

        <motion.div
          key={`${state.areaIdx}-${state.encounterIdx}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="parchment-panel rounded-md p-10 text-center"
        >
          <div className="text-xs font-mono uppercase tracking-[0.4em] text-gold/70">
            Region {state.areaIdx + 1} · Encounter {state.encounterIdx + 1}
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 text-glow-gold">
            {area.name}
          </h2>
          <p className="italic text-muted-foreground mt-2 text-lg">{area.subtitle}</p>
          <p className="text-foreground/80 mt-6 max-w-xl mx-auto leading-relaxed">
            {area.intro}
          </p>

          <div className="mt-10 border-t border-gold/20 pt-8">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              {enemy.isBoss ? "Boss encounter" : "A foe approaches"}
            </div>
            <div className="mt-4 flex flex-col items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className={`text-7xl font-display ${enemy.isBoss ? "text-blood text-glow-arcane" : "text-arcane text-glow-arcane"}`}
              >
                {enemy.glyph}
              </motion.div>
              <div className="font-display text-2xl text-foreground">{enemy.name}</div>
              <div className="italic text-sm text-muted-foreground max-w-sm">{enemy.flavor}</div>
            </div>
          </div>

          <div className="mt-10 flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={onEncounter}
              className="px-8 py-3 bg-gradient-to-b from-gold to-gold/70 text-ink font-display font-bold tracking-widest uppercase rounded-sm rune-glow"
            >
              Engage
            </motion.button>
            <button
              onClick={onPotion}
              disabled={state.potions === 0 || state.hp === state.maxHp}
              className="px-6 py-3 border border-arcane/60 text-arcane font-display uppercase tracking-widest text-sm rounded-sm hover:bg-arcane/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Drink Elixir (+25)
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}