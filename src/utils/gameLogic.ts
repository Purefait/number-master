// Génère un nombre aléatoire entre min et max inclus
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Génère un code secret unique de 3 chiffres
export const generateCode = (): number[] => {
  const code: number[] = [];
  while (code.length < 3) {
    const num = getRandomNumber(0, 9);
    if (!code.includes(num)) {
      code.push(num);
    }
  }
  return code;
};

// Vérifie la tentative et retourne le nombre de chiffres corrects et mal placés
export const checkGuess = (guess: number[], code: number[]): { correct: number; misplaced: number } => {
  let correct = 0;
  let misplaced = 0;
  
  // Vérifie les positions correctes
  for (let i = 0; i < 3; i++) {
    if (guess[i] === code[i]) {
      correct++;
    }
  }
  
  // Vérifie les chiffres mal placés
  const guessCopy = [...guess];
  const codeCopy = [...code];
  
  // Retire d'abord les chiffres corrects
  for (let i = 2; i >= 0; i--) {
    if (guess[i] === code[i]) {
      guessCopy.splice(i, 1);
      codeCopy.splice(i, 1);
    }
  }
  
  // Vérifie les chiffres restants pour les mal placés
  guessCopy.forEach(num => {
    const index = codeCopy.indexOf(num);
    if (index !== -1) {
      misplaced++;
      codeCopy.splice(index, 1);
    }
  });
  
  return { correct, misplaced };
};