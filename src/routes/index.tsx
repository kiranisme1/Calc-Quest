import { createFileRoute } from "@tanstack/react-router";
import { useGame } from "@/game/useGame";
import { TitleScreen } from "@/game/components/TitleScreen";
import { MapScreen } from "@/game/components/MapScreen";
import { BattleScreen } from "@/game/components/BattleScreen";
import {
  IntroScreen,
  VictoryScreen,
  DefeatScreen,
  EndingScreen,
} from "@/game/components/EndScreens";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "The Infinite Theorem — A Calculus RPG" },
      {
        name: "description",
        content:
          "A 20-minute browser RPG. Battle the Lord of Discontinuity by solving limits, derivatives, integrals and series.",
      },
    ],
  }),
});

function Index() {
  const game = useGame();
  const { state } = game;

  switch (state.phase) {
    case "title":
      return <TitleScreen onStart={game.startGame} />;
    case "intro":
      return <IntroScreen state={state} onContinue={game.enterMap} />;
    case "map":
      return (
        <MapScreen
          state={state}
          onEncounter={game.startBattle}
          onPotion={game.usePotion}
        />
      );
    case "battle":
      return (
        <BattleScreen
          state={state}
          onPlayerDamage={game.damagePlayer}
          onVictory={game.finishBattle}
          onPotion={game.usePotion}
        />
      );
    case "victory":
      return <VictoryScreen state={state} onContinue={game.advance} />;
    case "defeat":
      return <DefeatScreen onRestart={game.reset} />;
    case "ending":
      return <EndingScreen state={state} onRestart={game.reset} />;
  }
}
