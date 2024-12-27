interface GameState {
  code: number[];
  hints: {
    numbers: number[];
    correct: number;
    misplaced: number;
  }[];
}

// Caractères valides pour l'encodage (62 caractères)
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// Clé de chiffrement (change l'ordre des caractères)
const CIPHER_KEY = 'mK8fL2hN4jP6qR9sT3vW5xY7zA2bC4dE6gH8kM1nQ3pS5uV7wX9yZaBcDeFiJo';

// Encode un nombre en caractère
const encodeChar = (num: number): string => {
  const shifted = (num + CIPHER_KEY.length) % CIPHER_KEY.length;
  return CIPHER_KEY[shifted];
};

// Décode un caractère en nombre
const decodeChar = (char: string): number => {
  const pos = CIPHER_KEY.indexOf(char);
  if (pos === -1) return 0;
  return (pos + CIPHER_KEY.length) % CIPHER_KEY.length;
};

// Mélange une chaîne avec une clé
const scramble = (str: string, key: number): string => {
  return str
    .split('')
    .map((char, i) => {
      const pos = CHARS.indexOf(char);
      if (pos === -1) return char;
      const newPos = (pos + key + i) % CHARS.length;
      return CHARS[newPos];
    })
    .join('');
};

// Démélange une chaîne avec une clé
const unscramble = (str: string, key: number): string => {
  return str
    .split('')
    .map((char, i) => {
      const pos = CHARS.indexOf(char);
      if (pos === -1) return char;
      const newPos = (pos - key - i + CHARS.length * 2) % CHARS.length;
      return CHARS[newPos];
    })
    .join('');
};

// Encode l'état du jeu en une chaîne courte
export const encodeGameState = (state: GameState): string => {
  try {
    // Encode le code et les indices
    const parts: string[] = [];
    
    // Encode le code secret
    parts.push(state.code.map(n => encodeChar(n)).join(''));
    
    // Encode les indices
    state.hints.forEach(hint => {
      const hintStr = 
        hint.numbers.map(n => encodeChar(n)).join('') +
        encodeChar(hint.correct) +
        encodeChar(hint.misplaced);
      parts.push(hintStr);
    });

    // Joint les parties avec un séparateur
    const rawString = parts.join('-');
    
    // Applique un brouillage final
    const key = Math.floor(Math.random() * 10) + 1;
    const scrambled = scramble(rawString, key);
    
    // Ajoute la clé au début
    return key.toString(36) + scrambled;
    
  } catch (error) {
    console.error('Failed to encode game state:', error);
    return '';
  }
};

// Décode une chaîne courte en état de jeu
export const decodeGameState = (encoded: string): GameState | null => {
  try {
    if (encoded.length < 2) return null;

    // Extrait la clé et débrouille la chaîne
    const key = parseInt(encoded[0], 36);
    const scrambled = encoded.slice(1);
    const rawString = unscramble(scrambled, key);
    
    // Sépare les parties
    const parts = rawString.split('-');
    if (parts.length < 1) return null;

    // Décode le code secret
    const code = parts[0].split('').map(decodeChar);
    
    // Décode les indices
    const hints = parts.slice(1).map(hintStr => {
      if (hintStr.length < 5) return null;
      return {
        numbers: hintStr.slice(0, 3).split('').map(decodeChar),
        correct: decodeChar(hintStr[3]),
        misplaced: decodeChar(hintStr[4])
      };
    }).filter((hint): hint is NonNullable<typeof hint> => hint !== null);
    
    // Vérifie que l'état est valide
    if (code.length === 3 && code.every(n => !isNaN(n) && n >= 0 && n <= 9)) {
      return { code, hints };
    }
    
    return null;
  } catch (error) {
    console.error('Failed to decode game state:', error);
    return null;
  }
};
