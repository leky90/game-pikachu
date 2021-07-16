import { FC } from "react";
import PokemonRow from "./PokemonRow";
import useAppContextActions from "../hooks/useAppContextActions";

type GamePokemonProps = {};

const GamePokemon: FC<GamePokemonProps> = () => {
  const { getGameState, getGameSettings } = useAppContextActions();

  const { matrix, selectedPokemons } = getGameState();
  const {
    settings: { mode },
  } = getGameSettings();

  return (
    <div className={`game-pokemon mode-${mode}`}>
      {matrix &&
        matrix.map((pokemons, index) => (
          <PokemonRow
            key={`row-${index}`}
            rowIndex={index}
            cards={pokemons}
            selectedPokemons={selectedPokemons}
          />
        ))}
    </div>
  );
};

export default GamePokemon;
