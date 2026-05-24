import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { areas } from "../world";
import { pickProblem, type Problem } from "../problems";
import type { GameState } from "../useGame";
import { HUD } from "./HUD";

type Log = { id: number; text: string; tone: "good" | "bad" | "neutral" };

export function BattleScreen({
  state,
  onPlayerDamage,
  onVictory,
  onPotion,
}: {
  state: GameState;
  onPlayerDamage: (d: number) => void;
  onVictory: (xp: number) => void;
  onPotion: () => void;
}) {
  const enemy = areas[state.areaIdx].encounters[state.encounterIdx];
  const [enemyHp, setEnemyHp] = useState(enemy.maxHp);
  const usedRef = useRef<Set<string>>(new Set());
  const [problem, setProblem] = useState<Problem>(() => {
    const p = pickProblem(enemy.tier, usedRef.current);
    usedRef.current.add(p.q);
    return p;
  });
  const [picked, setPicked] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [logs, setLogs] = useState<Log[]>([
    { id: 0, text: `${enemy.name} blocks the path.`, tone: "neutral" },
  ]);
  const [shake, setShake] = useState<"player" | "enemy" | null>(null);

  const log = (text: string, tone: Log["tone"]) =>
    setLogs((l) => [...l.slice(-4), { id: Date.now() + Math.random(), text, tone }]);

  const playerPower = 10 + state.level * 3;

  useEffect(() => {
    if (enemyHp <= 0 && !locked) {
      setLocked(true);
      setTimeout(() => onVictory(enemy.xp), 900);
    }
  }, [enemyHp, locked, enemy.xp, onVictory]);

  const answer = (idx: number) => {
    if (locked) return;
    setLocked(true);
    setPicked(idx);
    const correct = idx === problem.answer;
    setTimeout(() => {
      if (correct) {
        const dmg = playerPower + Math.floor(Math.random() * 6);
        const next = Math.max(0, enemyHp - dmg);
        setEnemyHp(next);
        setShake("enemy");
        log(`You channel the proof. ${enemy.name} takes ${dmg}.`, "good");
        if (next > 0) {
          setTimeout(() => {
            const ed = enemy.damage + Math.floor(Math.random() * 4) - 2;
            onPlayerDamage(Math.max(1, Math.floor(ed * 0.5)));
            setShake("player");
            log(`${enemy.name} retaliates for ${Math.max(1, Math.floor(ed * 0.5))}.`, "bad");
            nextProblem();
          }, 700);
        }
      } else {
        const ed = enemy.damage + Math.floor(Math.random() * 4);
        onPlayerDamage(ed);
        setShake("player");
        log(`Wrong! ${enemy.name} strikes for ${ed}. (Answer: ${problem.choices[problem.answer]})`, "bad");
        nextProblem();
      }
    }, 600);
  };

  const nextProblem = () => {
    setTimeout(() => {
      const p = pickProblem(enemy.tier, usedRef.current);
      usedRef.current.add(p.q);
      setProblem(p);
      setPicked(null);
      setShake(null);
      setLocked(false);
    }, 900);
  };

  const enemyHpPct = (enemyHp / enemy.maxHp) * 100;

  return (
    <div className="min-h-screen px-6 py-6 bg-gradient-to-b from-stone-950 via-stone-950 to-ink">
      <div className="max-w-4xl mx-auto space-y-5">
        <HUD state={state} />

        {/* Enemy stage */}
        <motion.div
          animate={shake === "enemy" ? { x: [0, -10, 10, -6, 6, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="parchment-panel rounded-md p-6 text-center"
        >
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
            <span>{enemy.isBoss ? "Boss" : "Adversary"}</span>
            <span className="font-mono text-blood">{enemyHp}/{enemy.maxHp}</span>
          </div>
          <div className="h-2 rounded-full bg-ink/60 border border-border overflow-hidden mb-5">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${enemyHpPct}%`,
                background: "linear-gradient(90deg, oklch(0.4 0.2 22), oklch(0.6 0.24 25))",
              }}
            />
          </div>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className={`text-6xl font-display ${enemy.isBoss ? "text-blood" : "text-arcane"} text-glow-arcane`}
          >
            {enemy.glyph}
          </motion.div>
          <div className="font-display text-xl text-foreground mt-2">{enemy.name}</div>
        </motion.div>

        {/* Problem */}
        <motion.div
          animate={shake === "player" ? { x: [0, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="parchment-panel rounded-md p-6"
        >
          <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-gold/70 mb-3">
            Inscribe the answer
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={problem.q}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-mono text-2xl md:text-3xl text-foreground text-center py-6 px-4 bg-ink/40 border border-gold/20 rounded-sm"
            >
              {problem.q}
            </motion.div>
          </AnimatePresence>

          <div className="grid grid-cols-2 gap-3 mt-5">
            {problem.choices.map((c, i) => {
              const isPicked = picked === i;
              const reveal = picked !== null;
              const isCorrect = i === problem.answer;
              let cls =
                "px-4 py-4 font-mono text-lg rounded-sm border transition-all text-left";
              if (!reveal) {
                cls += " border-gold/30 hover:border-gold hover:bg-gold/10 text-foreground";
              } else if (isCorrect) {
                cls += " border-arcane bg-arcane/20 text-foreground rune-glow";
              } else if (isPicked) {
                cls += " border-blood bg-blood/20 text-foreground";
              } else {
                cls += " border-border text-muted-foreground opacity-50";
              }
              return (
                <button
                  key={i}
                  onClick={() => answer(i)}
                  disabled={locked}
                  className={cls}
                >
                  <span className="text-gold/60 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {c}
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex justify-between items-center">
            <div className="text-xs text-muted-foreground italic">
              Correct answer → strike for {playerPower}+ damage
            </div>
            <button
              onClick={onPotion}
              disabled={state.potions === 0 || state.hp === state.maxHp || locked}
              className="px-4 py-2 text-xs border border-arcane/50 text-arcane font-display uppercase tracking-widest rounded-sm hover:bg-arcane/10 disabled:opacity-30"
            >
              Elixir · {state.potions}
            </button>
          </div>
        </motion.div>

        {/* Battle log */}
        <div className="parchment-panel rounded-md p-4 space-y-1 max-h-40 overflow-hidden">
          {logs.slice(-4).map((l) => (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-sm italic font-body ${
                l.tone === "good"
                  ? "text-arcane-glow"
                  : l.tone === "bad"
                  ? "text-blood"
                  : "text-muted-foreground"
              }`}
            >
              › {l.text}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}