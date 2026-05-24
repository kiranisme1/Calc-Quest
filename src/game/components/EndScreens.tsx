import { motion } from "motion/react";
import type { GameState } from "../useGame";
import { areas } from "../world";

export function IntroScreen({ state, onContinue }: { state: GameState; onContinue: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        className="max-w-2xl text-center"
      >
        <div className="font-mono text-xs uppercase tracking-[0.4em] text-gold/70 mb-6">Prologue</div>
        <p className="font-body text-xl text-foreground/90 leading-relaxed italic">
          Long ago, the world was held aloft by a single elegant proof — the Infinite Theorem.
          Then a Lord of Discontinuity tore it apart, and reality began to drift.
          <br /><br />
          You, <span className="text-gold font-display not-italic">{state.playerName}</span>, are the last apprentice of the
          old school. Walk the four regions. Solve what must be solved.
          Restore the proof.
        </p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          onClick={onContinue}
          className="mt-10 px-10 py-3 bg-gradient-to-b from-gold to-gold/70 text-ink font-display font-bold tracking-widest uppercase rounded-sm rune-glow"
        >
          Walk the path
        </motion.button>
      </motion.div>
    </div>
  );
}

export function VictoryScreen({
  state,
  onContinue,
}: {
  state: GameState;
  onContinue: () => void;
}) {
  const enemy = areas[state.areaIdx].encounters[state.encounterIdx];
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="parchment-panel rounded-md p-10 text-center max-w-md"
      >
        <div className="text-6xl text-arcane text-glow-arcane">*</div>
        <h2 className="font-display text-3xl text-foreground mt-4 text-glow-gold">Solved.</h2>
        <p className="italic text-muted-foreground mt-2">
          {enemy.name} dissolves into a fine arithmetic dust.
        </p>
        <div className="font-mono text-arcane mt-6 text-lg">+{enemy.xp} lore</div>
        <button
          onClick={onContinue}
          className="mt-8 px-8 py-3 bg-gradient-to-b from-gold to-gold/70 text-ink font-display font-bold tracking-widest uppercase rounded-sm rune-glow"
        >
          Press on
        </button>
      </motion.div>
    </div>
  );
}

export function DefeatScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="text-center max-w-lg"
      >
        <h2 className="font-display text-6xl text-blood text-glow-arcane">Q.E.D. X</h2>
        <p className="italic text-muted-foreground mt-4 text-lg">
          The proof falters. Your form dissolves into an indeterminate form.
          The Theorem remains broken.
        </p>
        <button
          onClick={onRestart}
          className="mt-10 px-10 py-3 border border-gold text-gold font-display tracking-widest uppercase rounded-sm hover:bg-gold hover:text-ink transition"
        >
          Try again
        </button>
      </motion.div>
    </div>
  );
}

export function EndingScreen({
  state,
  onRestart,
}: {
  state: GameState;
  onRestart: () => void;
}) {
  const minutes = Math.max(1, Math.round((Date.now() - state.startTime) / 60000));
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-gold/10 via-transparent to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6 }}
        className="relative text-center max-w-2xl"
      >
        <div className="font-mono text-xs uppercase tracking-[0.4em] text-gold/70 mb-6">Epilogue</div>
        <h1 className="font-display text-5xl md:text-7xl font-black text-gold text-glow-gold">
          The Theorem holds.
        </h1>
        <p className="font-body italic text-foreground/90 mt-8 text-lg leading-relaxed">
          At the last step, you write Q.E.D. — and the world snaps back into continuity.
          The Lord of Discontinuity unravels into a single, well-behaved function. The mist clears.
          Somewhere, a bell rings on the limit of hearing.
          <br /><br />
          <span className="not-italic text-gold font-display">{state.playerName}</span>,
          you have proven yourself.
        </p>

        <div className="mt-10 inline-flex gap-8 parchment-panel rounded-md px-8 py-4 font-mono text-sm">
          <div><div className="text-gold text-xl">{state.level}</div><div className="text-muted-foreground text-xs uppercase">Final level</div></div>
          <div><div className="text-gold text-xl">{minutes}m</div><div className="text-muted-foreground text-xs uppercase">Journey</div></div>
          <div><div className="text-gold text-xl">4</div><div className="text-muted-foreground text-xs uppercase">Regions</div></div>
        </div>

        <div className="mt-10">
          <button
            onClick={onRestart}
            className="px-10 py-3 border border-gold text-gold font-display tracking-widest uppercase rounded-sm hover:bg-gold hover:text-ink transition"
          >
            Begin anew
          </button>
        </div>
      </motion.div>
    </div>
  );
}