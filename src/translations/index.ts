export type Language = 'en' | 'fr' | 'de' | 'es' | 'it';

export interface Translation {
  title: string;
  rules: string;
  rulesTitle: string;
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
}

export const translations: Record<Language, Translation> = {
  en: {
    title: 'Number Master',
    rulesTitle: 'How to Play',
    rules: 'Try to guess the 3-digit code. You have 2 attempts!\n\nAfter each guess, the colors mean:\n• Green: correct digit in correct position\n• Yellow: correct digit in wrong position\n• Red: no correct digits',
    placeholder: 'Enter 3 digits',
    submit: 'Submit',
    win: 'Congratulations! You won! 🎉',
    lose: 'Game Over! The code was:',
    newGame: 'New Game',
    share: 'Share',
    copied: 'Copied!',
    hints: 'Hints',
    noCorrect: 'No correct digits',
    correctWellPlaced: 'correct and well placed',
    correctMisplaced: 'correct but misplaced',
  },
  fr: {
    title: 'Maître des Nombres',
    rulesTitle: 'Comment Jouer',
    rules: 'Essayez de deviner le code à 3 chiffres. Vous avez 2 essais !\n\nAprès chaque essai, les couleurs signifient :\n• Vert : chiffre correct bien placé\n• Jaune : chiffre correct mal placé\n• Rouge : aucun chiffre correct',
    placeholder: 'Entrez 3 chiffres',
    submit: 'Valider',
    win: 'Félicitations ! Vous avez gagné ! 🎉',
    lose: 'Partie terminée ! Le code était :',
    newGame: 'Nouvelle Partie',
    share: 'Partager',
    copied: 'Copié !',
    hints: 'Indices',
    noCorrect: 'Aucun chiffre correct',
    correctWellPlaced: 'correct et bien placé',
    correctMisplaced: 'correct mais mal placé',
  },
  de: {
    title: 'Zahlenmeister',
    rulesTitle: 'Spielregeln',
    rules: 'Versuche den 3-stelligen Code zu erraten. Du hast 2 Versuche!\n\nNach jedem Versuch bedeuten die Farben:\n• Grün: richtige Ziffer an richtiger Position\n• Gelb: richtige Ziffer an falscher Position\n• Rot: keine richtigen Ziffern',
    placeholder: '3 Ziffern eingeben',
    submit: 'Prüfen',
    win: 'Glückwunsch! Du hast gewonnen! 🎉',
    lose: 'Spiel vorbei! Der Code war:',
    newGame: 'Neues Spiel',
    share: 'Teilen',
    copied: 'Kopiert!',
    hints: 'Hinweise',
    noCorrect: 'Keine richtigen Ziffern',
    correctWellPlaced: 'richtig und richtig platziert',
    correctMisplaced: 'richtig aber falsch platziert',
  },
  es: {
    title: 'Maestro de Números',
    rulesTitle: 'Cómo Jugar',
    rules: 'Intenta adivinar el código de 3 dígitos. ¡Tienes 2 intentos!\n\nDespués de cada intento, los colores significan:\n• Verde: dígito correcto en posición correcta\n• Amarillo: dígito correcto en posición incorrecta\n• Rojo: ningún dígito correcto',
    placeholder: 'Ingresa 3 dígitos',
    submit: 'Enviar',
    win: '¡Felicitaciones! ¡Has ganado! 🎉',
    lose: '¡Juego terminado! El código era:',
    newGame: 'Nuevo Juego',
    share: 'Compartir',
    copied: '¡Copiado!',
    hints: 'Pistas',
    noCorrect: 'Ningún dígito correcto',
    correctWellPlaced: 'correcto y bien ubicado',
    correctMisplaced: 'correcto pero mal ubicado',
  },
  it: {
    title: 'Maestro dei Numeri',
    rulesTitle: 'Come Giocare',
    rules: 'Prova a indovinare il codice di 3 cifre. Hai 2 tentativi!\n\nDopo ogni tentativo, i colori significano:\n• Verde: cifra corretta in posizione corretta\n• Giallo: cifra corretta in posizione sbagliata\n• Rosso: nessuna cifra corretta',
    placeholder: 'Inserisci 3 cifre',
    submit: 'Invia',
    win: 'Congratulazioni! Hai vinto! 🎉',
    lose: 'Game Over! Il codice era:',
    newGame: 'Nuova Partita',
    share: 'Condividi',
    copied: 'Copiato!',
    hints: 'Indizi',
    noCorrect: 'Nessuna cifra corretta',
    correctWellPlaced: 'corretta e ben posizionata',
    correctMisplaced: 'corretta ma mal posizionata',
  },
};

export default translations;
