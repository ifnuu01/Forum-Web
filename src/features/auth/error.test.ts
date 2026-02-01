import { describe, expect, it } from 'vitest';

describe('should fail', () => {
  it('fails intentionally', () => {
    expect(true).toBe(false);
  });
});