import { FC } from "react";
import { Pokemon, PokemonCoords } from "../context/AppContext";
import PokemonCard from "./PokemonCard";

type PokemonRowProps = {
  cards: Pokemon[];
  selectedPokemons: PokemonCoords[];
  rowIndex: number;
  selectPokemon: (
    pokemonId: string,
    rowIndex: number,
    colIndex: number
  ) => void;
};

const PokemonRow: FC<PokemonRowProps> = ({
  cards,
  selectedPokemons,
  rowIndex,
  selectPokemon,
}) => {
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
