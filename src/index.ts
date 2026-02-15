// Beispiel Entry Point
export const greeting = (name: string): string => {
  return `Hallo, ${name}! 👋`;
};

const main = (): void => {
  const button = document.getElementById('greetBtn');
  const output = document.getElementById('output');

  button?.addEventListener('click', () => {
    if (output) {
      output.textContent = greeting('User');
      output.classList.add('show');
    }
  });
};

document.addEventListener('DOMContentLoaded', main);

