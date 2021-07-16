import { FC, memo } from "react";
import { Pokemon } from "../context/AppContext";

type PokemonCardProps = {
  pokemon: Pokemon;
  isSelected: number | boolean;
  selectPokemon: (
    pokemonId: string,
    rowIndex: number,
    colIndex: number
  ) => void;
  rowIndex: number;
  colIndex: number;
};

const PokemonCard: FC<PokemonCardProps> = ({
  pokemon,
  isSelected,
  selectPokemon,
  rowIndex,
  colIndex,
}) => {
  const selected = isSelected ? "selected" : "";
  const hidden = pokemon.matched ? "hidden" : "";

  return (
    <div
      style={{
        backgroundImage: `url(${pokemon.image ?? ""})`,
      }}
      className={`pokemon-card ${selected} ${hidden}`}
      onClick={() => {
        if (!isSelected && !pokemon.matched && pokemon.nid) {
          selectPokemon(pokemon.nid, rowIndex, colIndex);
        }
      }}
    >
      {/* {pokemon.image && (
        <img key={pokemon.nid} src={pokemon.image} alt={pokemon.id} />
      )} */}
    </div>
  );
};

function propsAreEquals(
  prevProps: PokemonCardProps,
  nextProps: PokemonCardProps
) {
  return (
    prevProps.pokemon.nid === nextProps.pokemon.nid &&
    prevProps.pokemon.image === nextProps.pokemon.image &&
    prevProps.pokemon.matched === nextProps.pokemon.matched &&
    prevProps.isSelected === nextProps.isSelected
  );
}

export default memo(PokemonCard, propsAreEquals);
