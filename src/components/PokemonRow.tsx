import { FC } from "react";
import { Pokemon, PokemonCoords } from "../context/AppContext";
import { AppAction } from "../context/AppReducer";
import useAppContextActions from "../hooks/useAppContextActions";
import PokemonCard from "./PokemonCard";

type PokemonRowProps = {
  cards: Pokemon[];
  selectedPokemons: PokemonCoords[];
  rowIndex: number;
};

const PokemonRow: FC<PokemonRowProps> = ({
  cards,
  selectedPokemons,
  rowIndex,
}) => {
  const { dispatch } = useAppContextActions();

  const selectPokemon = (
    pokemonId: string,
    rowIndex: number,
    colIndex: number
  ) => {
    dispatch({
      type: AppAction.SELECT_POKEMON,
      payload: { nid: pokemonId, rowIndex, colIndex },
    });
  };

  return (
    <>
      {cards.map((pokemon, index) => (
        <PokemonCard
          key={`card-${index}`}
          pokemon={pokemon}
          rowIndex={rowIndex}
          colIndex={index}
          selectPokemon={selectPokemon}
          isSelected={
            pokemon.nid !== undefined &&
            selectedPokemons.findIndex(({ nid }) => nid === pokemon.nid) >= 0
          }
        />
      ))}
    </>
  );
};

export default PokemonRow;
