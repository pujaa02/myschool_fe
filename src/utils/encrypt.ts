// Function to generate a random encryption key
export const generateKey = async (): Promise<CryptoKey> => {
  return window.crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, [
    'encrypt',
    'decrypt',
  ]);
};

// Function to generate a random initialization vector (IV)
const generateIV = (): Uint8Array => {
  return window.crypto.getRandomValues(new Uint8Array(12)); // 12 bytes IV for AES-GCM
};

// Function to encrypt data using AES-GCM algorithm
export const encryptData = async (
  data: string,
  key: CryptoKey
): Promise<{ iv: Uint8Array; encryptedData: Uint8Array }> => {
  const iv = generateIV();
  const encodedData = new TextEncoder().encode(data);
  const encryptedData = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encodedData
  );
  return { iv, encryptedData: new Uint8Array(encryptedData) };
};

// Function to decrypt data using AES-GCM algorithm
export const decryptData = async (
  encryptedData: Uint8Array,
  key: CryptoKey,
  iv: Uint8Array
): Promise<string> => {
  const decryptedData = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    encryptedData
  );
  return new TextDecoder().decode(decryptedData);
};
