import { nanoid } from "nanoid";
import { PointCoords, Pokemon, PokemonCoords } from "../context/AppContext";

export const pokemonList: Pokemon[] = [
  { id: "poke-0", matched: false, color: "red" },
  { id: "poke-1", matched: false, color: "blue" },
  { id: "poke-2", matched: false, color: "green" },
  { id: "poke-3", matched: false, color: "yellow" },
  { id: "poke-5", matched: false, color: "pink" },
  { id: "poke-4", matched: false, color: "purple" },
  { id: "poke-6", matched: false, color: "aliceblue" },
  { id: "poke-7", matched: false, color: "aqua" },
  { id: "poke-8", matched: false, color: "aquamarine" },
  { id: "poke-9", matched: false, color: "bisque" },
  { id: "poke-10", matched: false, color: "black" },
  { id: "poke-11", matched: false, color: "gray" },
  { id: "poke-12", matched: false, color: "grey" },
  { id: "poke-13", matched: false, color: "blueviolet" },
  { id: "poke-14", matched: false, color: "brown" },
  { id: "poke-15", matched: false, color: "coral" },
];

export const randomOrderPokemonList = (nonOrderList: Pokemon[]) => {
  return nonOrderList.sort(() => Math.random() - 0.5);
};

export const makeListPokemons = (reset: boolean = false) => {
  if (reset) {
    pokemonList.map((pokemon) => ({ ...pokemon, matched: false }));
  }
  const pairPokemonList = [...pokemonList, ...pokemonList];
  const arrayPokemons = randomOrderPokemonList(pairPokemonList);
  const listPokemon: Record<string, Pokemon> = {};
  arrayPokemons.map((pokemon) => {
    const nid = nanoid();
    listPokemon[nid] = pokemon;
    return pokemon;
  });

  return listPokemon;
};

export const generatePokemonMatrix = (
  pokemons: Record<string, Pokemon>,
  totalColInRow: number = 8
) => {
  const pokemonMatrix: Pokemon[][] = [];
  if (Object.keys(pokemons).length === 0) return pokemonMatrix;
  let currentRow = 0;

  Object.entries(pokemons).map(([nid, pokemon]) => {
    if (pokemonMatrix[currentRow] === undefined) {
      pokemonMatrix[currentRow] = [];
    }

    const newPokemon = { ...pokemon, nid };

    pokemonMatrix[currentRow].push(newPokemon);

    if (pokemonMatrix[currentRow].length >= totalColInRow) {
      currentRow++;
    }

    return newPokemon;
  });

  return pokemonMatrix;
};

const checkScannedPoint = (
  rowIndex: number,
  colIndex: number,
  scannedPoints: PointCoords[]
) => {
  return (
    scannedPoints.findIndex(
      (scannedPoint) =>
        scannedPoint.rowIndex === rowIndex && scannedPoint.colIndex === colIndex
    ) >= 0
  );
};

const checkOutsidePoint = (
  rowIndex: number,
  colIndex: number,
  totalRow: number,
  totalCol: number
) => {
  return (
    rowIndex === -1 ||
    colIndex === -1 ||
    rowIndex === totalRow ||
    colIndex === totalCol
  );
};

const checkValidPoint = (
  rowIndex: number,
  colIndex: number,
  totalRow: number,
  totalCol: number
) => {
  return (
    rowIndex >= -1 &&
    rowIndex <= totalRow &&
    colIndex >= -1 &&
    colIndex <= totalCol
  );
};

const checkAvailablePoint = (
  matrix: Pokemon[][],
  rowIndex: number,
  colIndex: number
) => {
  return Boolean(
    matrix[rowIndex] &&
      matrix[rowIndex][colIndex] &&
      matrix[rowIndex][colIndex].matched
  );
};

const filterScanPoint = (
  matrix: Pokemon[][],
  rowIndex: number,
  colIndex: number,
  totalRow: number,
  totalCol: number,
  scannedPoints: PointCoords[],
  nearlyScan?: boolean
) => {
  return (
    !checkScannedPoint(rowIndex, colIndex, scannedPoints) &&
    checkValidPoint(rowIndex, colIndex, totalRow, totalCol) &&
    (nearlyScan ||
      checkOutsidePoint(rowIndex, colIndex, totalRow, totalCol) ||
      checkAvailablePoint(matrix, rowIndex, colIndex))
  );
};

const scanAvailablePoints = (
  matrix: Pokemon[][],
  rowIndex: number,
  colIndex: number,
  totalRow: number,
  totalCol: number,
  scannedPoints: PointCoords[],
  nearlyScan: boolean = false
) => {
  return [
    { rowIndex: rowIndex - 1, colIndex },
    { rowIndex: rowIndex + 1, colIndex },
    { rowIndex, colIndex: colIndex - 1 },
    { rowIndex, colIndex: colIndex + 1 },
  ].filter(({ rowIndex, colIndex }) =>
    filterScanPoint(
      matrix,
      rowIndex,
      colIndex,
      totalRow,
      totalCol,
      scannedPoints,
      nearlyScan
    )
  );
};

export const checkAvailableLine = (
  point1: PokemonCoords,
  point2: PokemonCoords,
  matrix: Pokemon[][],
  totalRow: number,
  totalCol: number
) => {
  let matched = false;
  let countCorner = 0;
  let step = 1;
  let scannedPoints: PointCoords[] = [];
  let pendingPoints = scanAvailablePoints(
    matrix,
    point1.rowIndex,
    point1.colIndex,
    totalRow,
    totalCol,
    scannedPoints,
    true
  );

  pendingPoints.map(({ rowIndex, colIndex }) => {
    if (
      rowIndex === point2.rowIndex &&
      colIndex === point2.colIndex &&
      !matrix[rowIndex][colIndex].matched
    ) {
      matched = true;
    }
  });

  if (!matched) {
    scannedPoints.push({
      rowIndex: point1.rowIndex,
      colIndex: point1.colIndex,
    });

    while (pendingPoints.length) {
      const { rowIndex, colIndex } = pendingPoints.pop() as {
        rowIndex: number;
        colIndex: number;
      };

      if (
        rowIndex === point2.rowIndex &&
        colIndex === point2.colIndex &&
        !matrix[rowIndex][colIndex].matched
      ) {
        matched = true;
        break;
      }

      if (
        filterScanPoint(
          matrix,
          rowIndex,
          colIndex,
          totalRow,
          totalCol,
          scannedPoints
        )
      ) {
        console.log(`step: ${step++}`, rowIndex, colIndex);

        scannedPoints.push({ rowIndex, colIndex });

        const newPendingPoints = scanAvailablePoints(
          matrix,
          rowIndex,
          colIndex,
          totalRow,
          totalCol,
          scannedPoints,
          true
        );
        console.log(newPendingPoints);
        pendingPoints = [...pendingPoints, ...newPendingPoints];
      }
    }
  }

  console.log(matched);

  return {
    matched,
  };
};
