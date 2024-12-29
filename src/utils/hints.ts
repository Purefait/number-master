export interface Hint {
  numbers: number[];
  correct: number;
  misplaced: number;
}

// Vérifie si tous les chiffres du code apparaissent au moins une fois dans les indices utiles
const allCodeNumbersInUsefulHints = (hints: Hint[], code: number[]): boolean => {
  // On exclut l'indice "aucun chiffre correct"
  const usefulHints = hints.filter(hint => hint.correct > 0 || hint.misplaced > 0);
  const numbersInUsefulHints = usefulHints.flatMap(hint => hint.numbers);
  return code.every(num => numbersInUsefulHints.includes(num));
};

// Vérifie qu'un tableau de nombres ne contient aucun chiffre du code
const containsNoCodeNumbers = (numbers: number[], code: number[]): boolean => {
  return numbers.every(num => !code.includes(num));
};

// Génère un tableau de nombres uniques différents du code secret
const generateUniqueNumbers = (exclude: number[]): number[] => {
  const numbers: number[] = [];
  while (numbers.length < 3) {
    const num = Math.floor(Math.random() * 10);
    if (!numbers.includes(num) && !exclude.includes(num)) {
      numbers.push(num);
    }
  }
  return numbers;
};

// Trouve tous les codes possibles qui correspondent aux indices donnés
const findPossibleCodes = (hints: Hint[]): number[][] => {
  const possibleCodes: number[][] = [];
  
  // Teste toutes les combinaisons de 3 chiffres
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (j === i) continue;
      for (let k = 0; k < 10; k++) {
        if (k === i || k === j) continue;
        
        const testCode = [i, j, k];
        let matchesAllHints = true;

        // Vérifie si le code correspond à tous les indices
        for (const hint of hints) {
          const comparison = compareCode(hint.numbers, testCode);
          if (comparison.correct !== hint.correct || 
              comparison.misplaced !== hint.misplaced) {
            matchesAllHints = false;
            break;
          }
        }

        if (matchesAllHints) {
          possibleCodes.push(testCode);
        }
      }
    }
  }

  return possibleCodes;
};

// Vérifie si les indices sont valides et mènent à une solution unique
const validateHints = (hints: Hint[], targetCode: number[]): boolean => {
  // Trouve tous les codes qui correspondent aux indices
  const possibleCodes = findPossibleCodes(hints);
  
  // Vérifie qu'il n'y a qu'une seule solution et que c'est le bon code
  return possibleCodes.length === 1 && 
         JSON.stringify(possibleCodes[0]) === JSON.stringify(targetCode);
};

// Compare deux codes et retourne le nombre de chiffres corrects et mal placés
const compareCode = (guess: number[], code: number[]): { correct: number; misplaced: number } => {
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

// Génère un tableau de 3 nombres avec exactement un nombre à la bonne position
const generateNumbersWithCorrectPosition = (code: number[], position: number): number[] => {
  const result = generateUniqueNumbers(code);
  result[position] = code[position];
  return result;
};

// Génère un tableau de 3 nombres avec des nombres mal placés
const generateNumbersWithMisplaced = (code: number[], count: number): number[] => {
  const result = new Array(3).fill(-1);
  const codeNumbers = [...code];
  const usedPositions = new Set<number>();

  // Sélectionner aléatoirement 'count' nombres du code
  for (let i = 0; i < count; i++) {
    if (codeNumbers.length === 0) break;

    const randomIndex = Math.floor(Math.random() * codeNumbers.length);
    const number = codeNumbers[randomIndex];
    codeNumbers.splice(randomIndex, 1);

    // Trouver une position différente de la position originale
    let originalPos = code.indexOf(number);
    let newPos;
    do {
      newPos = Math.floor(Math.random() * 3);
    } while (newPos === originalPos || usedPositions.has(newPos));

    result[newPos] = number;
    usedPositions.add(newPos);
  }

  // Remplir les positions restantes avec des nombres qui ne sont pas dans le code
  const fillerNumbers = generateUniqueNumbers(code);
  let fillerIndex = 0;
  for (let i = 0; i < 3; i++) {
    if (result[i] === -1) {
      result[i] = fillerNumbers[fillerIndex++];
    }
  }

  return result;
};

// Distribue les chiffres du code dans les indices utiles de manière équilibrée
const distributeCodeNumbers = (code: number[], hints: Hint[]): void => {
  const codeNumbers = [...code];
  
  // S'assurer que chaque chiffre du code est utilisé au moins une fois dans les indices utiles
  while (codeNumbers.length > 0) {
    const number = codeNumbers.pop()!;
    // On exclut l'indice "aucun chiffre correct"
    const availableHints = hints.filter(hint => 
      hint.numbers.every(n => !code.includes(n)) && 
      (hint.correct > 0 || hint.misplaced > 0) // Seulement les indices utiles
    );
    
    if (availableHints.length > 0) {
      const randomHint = availableHints[Math.floor(Math.random() * availableHints.length)];
      const randomPosition = Math.floor(Math.random() * 3);
      randomHint.numbers[randomPosition] = number;
    }
  }
};

// Vérifie si un indice est cohérent avec le code
const isHintValid = (hint: number[], code: number[], expectedCorrect: number, expectedMisplaced: number): boolean => {
  let correct = 0;
  let misplaced = 0;
  const usedIndices = new Set<number>();
  const usedHintIndices = new Set<number>();

  // Vérifie d'abord les chiffres bien placés
  for (let i = 0; i < code.length; i++) {
    if (hint[i] === code[i]) {
      correct++;
      usedIndices.add(i);
      usedHintIndices.add(i);
    }
  }

  // Vérifie ensuite les chiffres mal placés
  for (let i = 0; i < hint.length; i++) {
    if (!usedHintIndices.has(i)) {
      for (let j = 0; j < code.length; j++) {
        if (!usedIndices.has(j) && hint[i] === code[j]) {
          misplaced++;
          usedIndices.add(j);
          usedHintIndices.add(i);
          break;
        }
      }
    }
  }

  return correct === expectedCorrect && misplaced === expectedMisplaced;
};

// Génère un indice valide avec le nombre spécifié de chiffres corrects et mal placés
const generateValidHint = (
  code: number[],
  expectedCorrect: number,
  expectedMisplaced: number,
  correctPositions: number[] = [],
  incorrectDigits: number[]
): number[] => {
  let attempts = 0;
  const maxAttempts = 100;
  
  while (attempts < maxAttempts) {
    const hint = Array(3).fill(0);
    const usedPositions = new Set<number>();
    const usedDigits = new Set<number>();

    // Place les chiffres corrects aux positions spécifiées
    for (let i = 0; i < correctPositions.length; i++) {
      const pos = correctPositions[i];
      hint[pos] = code[pos];
      usedPositions.add(pos);
      usedDigits.add(code[pos]);
    }

    // Place les chiffres mal placés
    const availableCodeDigits = code.filter(d => !usedDigits.has(d));
    for (let i = 0; i < expectedMisplaced; i++) {
      if (availableCodeDigits.length === 0) break;
      
      let pos;
      do {
        pos = Math.floor(Math.random() * 3);
      } while (
        usedPositions.has(pos) || 
        code[pos] === availableCodeDigits[0]
      );

      hint[pos] = availableCodeDigits[0];
      usedPositions.add(pos);
      usedDigits.add(availableCodeDigits[0]);
      availableCodeDigits.shift();
    }

    // Remplit les positions restantes avec des chiffres incorrects
    for (let i = 0; i < 3; i++) {
      if (!usedPositions.has(i)) {
        let num;
        do {
          num = incorrectDigits[Math.floor(Math.random() * incorrectDigits.length)];
        } while (usedDigits.has(num));
        hint[i] = num;
        usedDigits.add(num);
      }
    }

    // Vérifie si l'indice est valide
    if (isHintValid(hint, code, expectedCorrect, expectedMisplaced)) {
      return hint;
    }

    attempts++;
  }

  throw new Error("Impossible de générer un indice valide");
};

// Vérifie que tous les chiffres du code apparaissent dans les indices utiles
const allCodeDigitsAppearInHints = (hints: Hint[], code: number[]): boolean => {
  // On exclut le dernier indice (aucun nombre correct)
  const usefulHints = hints.slice(0, -1);
  const allNumbers = new Set(usefulHints.flatMap(hint => hint.numbers));
  return code.every(digit => allNumbers.has(digit));
};

// Génère les indices en fonction du code secret
export const generateHints = (code: number[]): Hint[] => {
  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    try {
      const hints: Hint[] = [];
      const incorrectDigits = Array.from({ length: 10 }, (_, i) => i)
        .filter(n => !code.includes(n));

      // Premier indice : un chiffre correct et bien placé
      const wellPlacedPosition = Math.floor(Math.random() * 3);
      const firstHint = generateValidHint(code, 1, 0, [wellPlacedPosition], incorrectDigits);
      hints.push({
        numbers: firstHint,
        correct: 1,
        misplaced: 0
      });

      // Deuxième indice : un chiffre correct mal placé
      const secondHint = generateValidHint(code, 0, 1, [], incorrectDigits);
      hints.push({
        numbers: secondHint,
        correct: 0,
        misplaced: 1
      });

      // Troisième indice : un chiffre correct mal placé
      const thirdHint = generateValidHint(code, 0, 1, [], incorrectDigits);
      hints.push({
        numbers: thirdHint,
        correct: 0,
        misplaced: 1
      });

      // Quatrième indice : deux chiffres corrects mal placés
      const fourthHint = generateValidHint(code, 0, 2, [], incorrectDigits);
      hints.push({
        numbers: fourthHint,
        correct: 0,
        misplaced: 2
      });

      // Cinquième indice : aucun chiffre correct
      const fifthHint = generateValidHint(code, 0, 0, [], incorrectDigits);
      hints.push({
        numbers: fifthHint,
        correct: 0,
        misplaced: 0
      });

      // Vérifie que tous les chiffres du code apparaissent dans les indices utiles
      if (!allCodeDigitsAppearInHints(hints, code)) {
        throw new Error("Tous les chiffres du code doivent apparaître dans les indices");
      }

      // Vérifie si les indices sont valides et mènent à une solution unique
      if (!validateHints(hints, code)) {
        throw new Error("Les indices ne sont pas valides ou ne mènent pas à une solution unique");
      }

      return hints;
    } catch (error) {
      attempts++;
      if (attempts >= maxAttempts) {
        throw new Error("Impossible de générer des indices valides après " + maxAttempts + " tentatives");
      }
    }
  }

  throw new Error("Impossible de générer des indices valides");
};