import { useState } from "react";
import { motion } from "motion/react";

export function TitleScreen({ onStart }: { onStart: (name: string) => void }) {
  const [name, setName] = useState("");
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute font-mono text-gold/20 text-xs select-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 0.6, 0], y: [-20, -200] }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 8,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${60 + Math.random() * 40}%`,
            }}
          >
            {["∫", "∂", "∑", "lim", "dx", "∞", "e^x", "π", "δ", "√"][i % 10]}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative text-center max-w-2xl"
      >
        <div className="text-gold font-mono tracking-[0.4em] text-xs uppercase mb-6 opacity-70">
          ⟡  A calculus saga  ⟡
        </div>
        <h1 className="font-display text-6xl md:text-8xl font-black text-foreground leading-none text-glow-gold">
          The Infinite
        </h1>
        <h1 className="font-display text-6xl md:text-8xl font-black text-gold leading-none text-glow-gold mt-1">
          Theorem
        </h1>
        <p className="font-body italic text-muted-foreground mt-8 text-lg max-w-md mx-auto leading-relaxed">
          The Theorem has shattered. Reality unravels into discontinuities.
          Only a mathemage of sufficient rigor can restore the proof.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 18))}
            placeholder="Speak thy true name…"
            className="w-72 bg-ink/60 border border-gold/40 rounded-sm px-4 py-3 text-center font-display text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:rune-glow transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStart(name)}
            className="px-10 py-3 bg-gradient-to-b from-gold to-gold/70 text-ink font-display font-bold tracking-widest uppercase rounded-sm rune-glow border border-gold-glow"
          >
            Begin the Proof
          </motion.button>
          <p className="text-xs text-muted-foreground/70 font-mono mt-2">
            ≈ 20 minutes · 11 battles · 1 ending
          </p>
        </div>
      </motion.div>
    </div>
  );
}