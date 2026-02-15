// Beispiel Entry Point
const greeting = (name: string): string => {
  return `Hallo, ${name}! 👋`;
};

const main = (): void => {
  console.log(greeting('TypeScript'));
  console.log('🚀 Deine TypeScript App läuft!');
};

main();

