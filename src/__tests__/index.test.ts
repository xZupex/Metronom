import { greeting } from '../src/index';

describe('greeting function', () => {
  it('should return a greeting message', () => {
    const result = greeting('Test');
    expect(result).toBe('Hallo, Test! 👋');
  });
});

