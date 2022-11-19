import * as bcrypt from 'bcrypt';
// хэширование строки
export function hash(text): Promise<string> {
  return new Promise((resolve) => {
    bcrypt.hash(text, 10, (err, hash) => {
      resolve(hash);
    });
  });
}

// метод сравнения захэшированной строки с незахэшированной
export function compare(text, hash): Promise<boolean> {
  return new Promise((resolve) => {
    bcrypt.compare(text, hash, (err, result) => {
      resolve(result);
    });
  });
}
