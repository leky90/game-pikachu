import { FC } from "react";
import PokemonRow from "./PokemonRow";
import useAppContextActions from "../hooks/useAppContextActions";

type GamePokemonProps = {};

const GamePokemon: FC<GamePokemonProps> = () => {
  const { getGameState } = useAppContextActions();

  const { matrix, selectedPokemons } = getGameState();

  return (
    <div className="game-pokemon">
      {matrix &&
        matrix.map((pokemons, index) => (
          <PokemonRow
            key={`row-${index}`}
            rowIndex={index}
            pokemons={pokemons}
            selectedPokemons={selectedPokemons}
          />
        ))}
    </div>
  );
};

export default GamePokemon;
