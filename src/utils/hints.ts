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

// Vérifie si les indices sont cohérents avec le code
const validateHints = (hints: Hint[], code: number[]): boolean => {
  // Vérifier que tous les chiffres du code apparaissent au moins une fois dans les indices utiles
  if (!allCodeNumbersInUsefulHints(hints, code)) {
    return false;
  }

  // Vérifier que l'indice "aucun chiffre correct" ne contient aucun chiffre du code
  const noCorrectHint = hints.find(hint => hint.correct === 0 && hint.misplaced === 0);
  if (noCorrectHint && !containsNoCodeNumbers(noCorrectHint.numbers, code)) {
    return false;
  }

  // Vérifier que les indices avec des chiffres bien placés sont cohérents
  const correctPositionHints = hints.filter(hint => hint.correct > 0);
  for (const hint of correctPositionHints) {
    let correctCount = 0;
    for (let i = 0; i < 3; i++) {
      if (hint.numbers[i] === code[i]) {
        correctCount++;
      }
    }
    if (correctCount !== hint.correct) {
      return false;
    }
  }

  // Vérifier que les indices avec des chiffres mal placés sont cohérents
  const misplacedHints = hints.filter(hint => hint.misplaced > 0);
  for (const hint of misplacedHints) {
    let misplacedCount = 0;
    for (let i = 0; i < 3; i++) {
      if (code.includes(hint.numbers[i]) && hint.numbers[i] !== code[i]) {
        misplacedCount++;
      }
    }
    if (misplacedCount !== hint.misplaced) {
      return false;
    }
  }

  return true;
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

// Génère les indices en fonction du code secret
export const generateHints = (code: number[]): Hint[] => {
  let attempts = 0;
  let hints: Hint[];
  
  do {
    const correctPosition = Math.floor(Math.random() * 3);
    
    hints = [
      // Premier indice : 1 chiffre correct et bien placé
      {
        numbers: generateNumbersWithCorrectPosition(code, correctPosition),
        correct: 1,
        misplaced: 0
      },
      // Deuxième indice : 1 chiffre correct mal placé
      {
        numbers: generateNumbersWithMisplaced(code, 1),
        correct: 0,
        misplaced: 1
      },
      // Troisième indice : 1 chiffre correct mal placé (différent du deuxième)
      {
        numbers: generateNumbersWithMisplaced(code, 1),
        correct: 0,
        misplaced: 1
      },
      // Quatrième indice : 2 chiffres corrects mal placés
      {
        numbers: generateNumbersWithMisplaced(code, 2),
        correct: 0,
        misplaced: 2
      },
      // Cinquième indice : aucun chiffre correct (DOIT être complètement différent du code)
      {
        numbers: generateUniqueNumbers(code),
        correct: 0,
        misplaced: 0
      }
    ];

    // S'assurer que tous les chiffres du code sont distribués dans les indices utiles
    if (!allCodeNumbersInUsefulHints(hints, code)) {
      distributeCodeNumbers(code, hints);
    }
    
    attempts++;
  } while (!validateHints(hints, code) && attempts < 10);

  // Si après 10 tentatives on n'a toujours pas des indices valides,
  // on génère un nouveau code et de nouveaux indices
  if (!validateHints(hints, code)) {
    return generateHints(generateCode());
  }
  
  return hints;
};