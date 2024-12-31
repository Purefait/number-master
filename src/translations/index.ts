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
    rules: `Try to find the secret 3-digit code in 3 attempts!

The numbers in your guess will be colored:
• Numbers in green are correct and well placed
• Numbers in orange are correct but misplaced
• Numbers in red are not in the code

Click on a number to highlight all its occurrences.`,
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
    rules: `Essayez de trouver le code secret de 3 chiffres en 3 tentatives !

Les chiffres de votre proposition seront colorés :
• Les chiffres en vert sont corrects et bien placés
• Les chiffres en orange sont corrects mais mal placés
• Les chiffres en rouge ne sont pas dans le code

Cliquez sur un chiffre pour mettre en évidence toutes ses occurrences.`,
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
    rules: `Versuche den geheimen 3-stelligen Code in 3 Versuchen zu knacken!

Die Zahlen in deinem Versuch werden farbig markiert:
• Zahlen in grün sind richtig und an der richtigen Position
• Zahlen in orange sind richtig, aber an der falschen Position
• Zahlen in rot sind nicht im Code enthalten

Klicke auf eine Zahl, um alle ihre Vorkommen hervorzuheben.`,
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
    rules: `¡Intenta encontrar el código secreto de 3 dígitos en 3 intentos!

Los números en tu intento serán coloreados:
• Los números en verde son correctos y están bien ubicados
• Los números en naranja son correctos pero están mal ubicados
• Los números en rojo no están en el código

Haz clic en un número para resaltar todas sus apariciones.`,
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
    rules: `Prova a trovare il codice segreto di 3 cifre in 3 tentativi!

I numeri del tuo tentativo saranno colorati:
• I numeri in verde sono corretti e ben posizionati
• I numeri in arancione sono corretti ma mal posizionati
• I numeri in rosso non sono nel codice

Clicca su un numero per evidenziare tutte le sue occorrenze.`,
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
