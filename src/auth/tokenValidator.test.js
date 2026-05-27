const { validateToken } = require('./tokenValidator');

describe('validateToken', () => {
  test('accepts a valid Bearer token with sufficient length', () => {
    expect(validateToken('Bearer abcdefghijklmnopqrstu')).toBe(true);
  });

  test('rejects token without Bearer prefix', () => {
    expect(validateToken('abcdefghijklmnopqrstuvwxyz')).toBe(false);
  });

  test('rejects token with payload shorter than minimum length', () => {
    expect(validateToken('Bearer short')).toBe(false);
  });

  test('rejects null input', () => {
    expect(validateToken(null)).toBe(false);
  });

  test('rejects non-string input', () => {
    expect(validateToken(12345)).toBe(false);
  });

  test('rejects token with special characters in payload', () => {
    expect(validateToken('Bearer abc!def@ghi#jkl$mno%pqr')).toBe(false);
  });

  test('accepts exactly minimum-length payload', () => {
    expect(validateToken('Bearer abcdefghijklmnopqrst')).toBe(true);
  });
});
