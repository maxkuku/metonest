import { compare, hash } from './crypto';

describe('password helpers', () => {
  it('hashes and verifies a password', async () => {
    const password = 'a-safe-test-password';
    const digest = await hash(password);

    expect(digest).not.toBe(password);
    await expect(compare(password, digest)).resolves.toBe(true);
    await expect(compare('wrong-password', digest)).resolves.toBe(false);
  });
});
