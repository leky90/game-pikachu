import { FC } from "react";
import PokemonRow from "./PokemonRow";
import useAppContextActions from "../hooks/useAppContextActions";

type GamePokemonProps = {
  selectPokemon: (
    pokemonId: string,
    rowIndex: number,
    colIndex: number
  ) => void;
};

const GamePokemon: FC<GamePokemonProps> = ({ selectPokemon }) => {
  const { getGameState, getGameSettings, dispatch } = useAppContextActions();

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
            selectPokemon={selectPokemon}
          />
        ))}
    </div>
  );
};

export default GamePokemon;
