// Vérifie si un code est valide (3 chiffres uniques)
export const isValidCode = (code: string): boolean => {
  if (code.length !== 3) return false;
  if (!/^\d+$/.test(code)) return false;
  const digits = new Set(code.split(''));
  return digits.size === 3;
};

// Génère un code aléatoire de 3 chiffres uniques
export const generateCode = (): number[] => {
  const digits = Array.from({ length: 10 }, (_, i) => i);
  const code: number[] = [];
  
  // Sélectionne 3 chiffres aléatoires uniques
  for (let i = 0; i < 3; i++) {
    const index = Math.floor(Math.random() * digits.length);
    code.push(digits[index]);
    digits.splice(index, 1);
  }
  
  return code;
};

// Compare deux codes et retourne le nombre de chiffres corrects et mal placés
export const compareCode = (guess: number[], code: number[]): { correct: number; misplaced: number } => {
  const result = { correct: 0, misplaced: 0 };
  const usedIndices = new Set<number>();
  const usedGuessIndices = new Set<number>();

  // Vérifie d'abord les chiffres bien placés
  for (let i = 0; i < code.length; i++) {
    if (guess[i] === code[i]) {
      result.correct++;
      usedIndices.add(i);
      usedGuessIndices.add(i);
    }
  }

  // Vérifie ensuite les chiffres mal placés
  for (let i = 0; i < code.length; i++) {
    if (!usedGuessIndices.has(i)) {
      for (let j = 0; j < code.length; j++) {
        if (!usedIndices.has(j) && guess[i] === code[j]) {
          result.misplaced++;
          usedIndices.add(j);
          usedGuessIndices.add(i);
          break;
        }
      }
    }
  }

  return result;
};

// Vérifie si les indices contiennent tous les chiffres du code
export const validateIndicesContainCode = (hints: { numbers: number[] }[], code: number[]): boolean => {
  const allNumbers = new Set(hints.flatMap(hint => hint.numbers));
  return code.every(digit => allNumbers.has(digit));
};
