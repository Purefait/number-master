export type Language = 'en' | 'fr' | 'de' | 'es' | 'it';

export interface Translation {
  title: string;
  rulesTitle: string;
  rules: string;
  placeholder: string;
  submit: string;
  win: string;
  lose: string;
  newGame: string;
  share: string;
  copied: string;
  hints: string;
  noCorrect: string;
  correctWellPlaced: string;
  correctMisplaced: string;
  correct: string;
  misplaced: string;
  noCorrectDigits: string;
  shareMessage: string;
  shareError: string;
  copyError: string;
  copyFallbackMessage: string;
  [key: string]: string; // Index signature pour satisfaire Record<string, string>
}

export const translations: Record<Language, Translation> = {
  en: {
    title: 'Crack the Code',
    rulesTitle: 'Rules',
    rules: 'Try to find the secret 3-digit code. After each guess, you will get hints about correct digits.',
    placeholder: 'Enter 3 digits',
    submit: 'Submit',
    win: 'Congratulations! You found the code!',
    lose: 'Game Over! The code was:',
    newGame: 'New Game',
    share: 'Share',
    copied: 'Copied!',
    hints: 'Hints',
    noCorrect: 'No correct digits',
    correctWellPlaced: 'correct and well placed',
    correctMisplaced: 'correct but misplaced',
    correct: 'correct',
    misplaced: 'misplaced',
    noCorrectDigits: 'No correct digits',
    shareMessage: 'Can you crack this code? Try to solve this puzzle!',
    copyFallbackMessage: 'Could not copy automatically. Please copy this URL manually:',
    shareError: 'Failed to share the game',
    copyError: 'Failed to copy the link',
  },
  fr: {
    title: 'Crack the Code',
    rulesTitle: 'Règles',
    rules: 'Essayez de trouver le code secret à 3 chiffres. Après chaque essai, vous aurez des indices sur les chiffres corrects.',
    placeholder: 'Entrez 3 chiffres',
    submit: 'Valider',
    win: 'Félicitations ! Vous avez trouvé le code !',
    lose: 'Game Over ! Le code était :',
    newGame: 'Nouvelle Partie',
    share: 'Partager',
    copied: 'Copié !',
    hints: 'Indices',
    noCorrect: 'Aucun chiffre correct',
    correctWellPlaced: 'correct et bien placé',
    correctMisplaced: 'correct mais mal placé',
    correct: 'correct',
    misplaced: 'mal placé',
    noCorrectDigits: 'Aucun chiffre correct',
    shareMessage: 'Peux-tu craquer ce code ? Essaie de résoudre ce puzzle !',
    copyFallbackMessage: 'Impossible de copier automatiquement. Veuillez copier cette URL manuellement :',
    shareError: 'Impossible de partager le jeu',
    copyError: 'Impossible de copier le lien',
  },
  de: {
    title: 'Crack the Code',
    rulesTitle: 'Regeln',
    rules: 'Versuche den geheimen 3-stelligen Code zu finden. Nach jedem Versuch erhältst du Hinweise zu korrekten Ziffern.',
    placeholder: 'Gib 3 Ziffern ein',
    submit: 'Absenden',
    win: 'Glückwunsch! Du hast den Code gefunden!',
    lose: 'Game Over! Der Code war:',
    newGame: 'Neues Spiel',
    share: 'Teilen',
    copied: 'Kopiert!',
    hints: 'Hinweise',
    noCorrect: 'Keine korrekten Ziffern',
    correctWellPlaced: 'korrekt und richtig platziert',
    correctMisplaced: 'korrekt aber falsch platziert',
    correct: 'korrekt',
    misplaced: 'falsch platziert',
    noCorrectDigits: 'Keine korrekten Ziffern',
    shareMessage: 'Kannst du den Code knacken? Versuche, dieses Rätsel zu lösen!',
    shareError: 'Failed to share the game',
    copyError: 'Failed to copy the link',
  },
  es: {
    title: 'Crack the Code',
    rulesTitle: 'Reglas',
    rules: 'Intenta encontrar el código secreto de 3 dígitos. Después de cada intento, recibirás pistas sobre los dígitos correctos.',
    placeholder: 'Ingresa 3 dígitos',
    submit: 'Enviar',
    win: '¡Felicitaciones! ¡Encontraste el código!',
    lose: '¡Juego terminado! El código era:',
    newGame: 'Nuevo Juego',
    share: 'Compartir',
    copied: '¡Copiado!',
    hints: 'Pistas',
    noCorrect: 'Ningún dígito correcto',
    correctWellPlaced: 'correcto y bien ubicado',
    correctMisplaced: 'correcto pero mal ubicado',
    correct: 'correcto',
    misplaced: 'mal ubicado',
    noCorrectDigits: 'Ningún dígito correcto',
    shareMessage: '¿Puedes descifrar este código? ¡Intenta resolver este rompecabezas!',
    shareError: 'Failed to share the game',
    copyError: 'Failed to copy the link',
  },
  it: {
    title: 'Crack the Code',
    rulesTitle: 'Regole',
    rules: 'Prova a trovare il codice segreto di 3 cifre. Dopo ogni tentativo, riceverai indizi sulle cifre corrette.',
    placeholder: 'Inserisci 3 cifre',
    submit: 'Invia',
    win: 'Congratulazioni! Hai trovato il codice!',
    lose: 'Game Over! Il codice era:',
    newGame: 'Nuova Partita',
    share: 'Condividi',
    copied: 'Copiato!',
    hints: 'Indizi',
    noCorrect: 'Nessuna cifra corretta',
    correctWellPlaced: 'corretto e ben posizionato',
    correctMisplaced: 'corretto ma mal posizionato',
    correct: 'corretto',
    misplaced: 'mal posizionato',
    noCorrectDigits: 'Nessuna cifra corretta',
    shareMessage: 'Puoi decifrare questo codice? Prova a risolvere questo puzzle!',
    shareError: 'Failed to share the game',
    copyError: 'Failed to copy the link',
  }
};

export default translations;
