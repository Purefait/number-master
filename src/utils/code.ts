// Génère un code secret de 3 chiffres uniques
export const generateCode = (): number[] => {
  const code: number[] = [];
  while (code.length < 3) {
    const num = Math.floor(Math.random() * 10);
    if (!code.includes(num)) {
      code.push(num);
    }
  }
  return code;
};
