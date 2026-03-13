export interface AnimalFact {
  id: string;
  fact: string;
  highlight?: string; // Optional word/phrase to highlight in accent color
}

export const animalFacts: AnimalFact[] = [
  {
    id: "1",
    fact: "A group of flamingos is called a flamboyance.",
    highlight: "flamboyance",
  },
  {
    id: "2",
    fact: "Octopuses have three hearts and blue blood.",
    highlight: "three hearts",
  },
  {
    id: "3",
    fact: "A snail can sleep for three years.",
    highlight: "three years",
  },
  {
    id: "4",
    fact: "Butterflies taste with their feet.",
    highlight: "taste with their feet",
  },
  {
    id: "5",
    fact: "A group of owls is called a parliament.",
    highlight: "parliament",
  },
  {
    id: "6",
    fact: "Dolphins have names for each other.",
    highlight: "names for each other",
  },
  {
    id: "7",
    fact: "Sea otters hold hands while sleeping to avoid drifting apart.",
    highlight: "hold hands",
  },
  {
    id: "8",
    fact: "A group of crows is called a murder.",
    highlight: "murder",
  },
];

// Get a random fact or fact of the day
export const getFactOfTheDay = (): AnimalFact => {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      86400000,
  );
  const index = dayOfYear % animalFacts.length;
  return animalFacts[index];
};
