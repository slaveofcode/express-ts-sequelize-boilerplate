import bcrypt from 'bcrypt';

const SALT_ROUNDS = 18;

const crypt = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  return hash;
};

const compare = async (password: string, hash: string): Promise<boolean> => {
  const match = await bcrypt.compare(password, hash);
  return match;
};

export {
  crypt,
  compare,
};
