export type Enemy = {
  name: string;
  glyph: string;
  maxHp: number;
  damage: number;
  tier: number;
  xp: number;
  isBoss?: boolean;
  flavor: string;
};

export type Area = {
  id: string;
  name: string;
  subtitle: string;
  intro: string;
  ambient: string; // tailwind gradient class
  encounters: Enemy[];
};

export const areas: Area[] = [
  {
    id: "limits",
    name: "Village of Limits",
    subtitle: "Where every path approaches but never quite arrives.",
    intro:
      "The Theorem has shattered. Mist coils through the cobblestones. A whisper: solve, or be solved.",
    ambient: "from-amber-950/40 via-stone-900 to-stone-950",
    encounters: [
      { name: "Approaching Wisp", glyph: "→", maxHp: 14, damage: 6, tier: 0, xp: 10, flavor: "Translucent, forever nearing." },
      { name: "Indeterminate Shade", glyph: "0/0", maxHp: 20, damage: 8, tier: 0, xp: 14, flavor: "Its form refuses to resolve." },
      { name: "Warden of Continuity", glyph: "∘", maxHp: 32, damage: 11, tier: 1, xp: 30, isBoss: true, flavor: "The gatekeeper. Unbroken, unbreaking." },
    ],
  },
  {
    id: "derivatives",
    name: "Forest of Derivatives",
    subtitle: "Every leaf measures the slope of something dying.",
    intro:
      "The trees lean at impossible tangents. Rates of change drip from the canopy like rain.",
    ambient: "from-emerald-950/50 via-stone-950 to-stone-950",
    encounters: [
      { name: "Tangent Hound", glyph: "f′", maxHp: 24, damage: 10, tier: 1, xp: 18, flavor: "It tracks you along the curve." },
      { name: "Chain Serpent", glyph: "∘", maxHp: 30, damage: 13, tier: 2, xp: 24, flavor: "Coiled in nested compositions." },
      { name: "The Critical Hydra", glyph: "f″", maxHp: 50, damage: 16, tier: 2, xp: 50, isBoss: true, flavor: "Three heads: maxima, minima, inflection." },
    ],
  },
  {
    id: "integrals",
    name: "Caverns of Integration",
    subtitle: "Sum every infinitesimal, or be summed by them.",
    intro:
      "Stalactites of accumulated area drip from above. The river ∫ runs silent through the dark.",
    ambient: "from-indigo-950/50 via-stone-950 to-stone-950",
    encounters: [
      { name: "Riemann Wraith", glyph: "Σ", maxHp: 36, damage: 14, tier: 3, xp: 26, flavor: "Stitched from infinite rectangles." },
      { name: "Substitution Lich", glyph: "u", maxHp: 44, damage: 17, tier: 3, xp: 34, flavor: "It rewrites your very variables." },
      { name: "The Unbounded", glyph: "∞", maxHp: 70, damage: 20, tier: 3, xp: 70, isBoss: true, flavor: "An improper terror. It does not converge." },
    ],
  },
  {
    id: "throne",
    name: "Throne of Discontinuity",
    subtitle: "Where the Theorem broke. Where it must be made whole.",
    intro:
      "A jagged spire pierces the sky. Each step here is a leap — no path is continuous. The Lord waits.",
    ambient: "from-rose-950/60 via-stone-950 to-stone-950",
    encounters: [
      { name: "Series Revenant", glyph: "Σ∞", maxHp: 60, damage: 22, tier: 4, xp: 50, flavor: "Convergent only in cruelty." },
      { name: "Lord of Discontinuity", glyph: "X", maxHp: 110, damage: 26, tier: 4, xp: 200, isBoss: true, flavor: "The author of the broken Theorem. End him, and the world is whole again." },
    ],
  },
];