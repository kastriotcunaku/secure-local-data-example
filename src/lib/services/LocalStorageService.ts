import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = import.meta.env.VITE_DATA_ENCRYPTION_KEY;

export class LocalStorageService<T> {
  private ENCRYPTION_IV = CryptoJS.enc.Hex.parse('');
  private readonly KEY: string;

  constructor(key: string) {
    this.KEY = key;
  }

  setEncryptionIV(ENCRYPTION_IV: string): void {
    this.ENCRYPTION_IV = CryptoJS.enc.Hex.parse(ENCRYPTION_IV);
  }

  setData = (data: T): void => {
    try {
      if (!this.ENCRYPTION_IV) {
        throw new Error('Encryption IV is not set');
      }
      const encryptedData = this.encrypt(data);
      localStorage.setItem(this.KEY, encryptedData);
    } catch {
      throw new Error('Failed to set item');
    }
  };

  getData = (): T | null => {
    try {
      if (!this.ENCRYPTION_IV) {
        throw new Error('Encryption IV is not set');
      }
      const res = localStorage.getItem(this.KEY);
      if (res) {
        return this.decrypt(res);
      }
      return null;
    } catch {
      throw new Error('Failed to get item');
    }
  };

  removeData = (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      throw new Error('Failed to remove item');
    }
  };

  encryptPassword = (password: string, name: string): string => {
    return CryptoJS.SHA256(ENCRYPTION_KEY + password + name).toString();
  };

  private encrypt = (data: T): string => {
    try {
      if (!this.ENCRYPTION_IV) {
        throw new Error('Encryption IV is not set');
      }
      const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY, {
        iv: this.ENCRYPTION_IV,
      });
      return encryptedData.toString();
    } catch {
      throw new Error('Encryption failed');
    }
  };

  private decrypt = (encryptedData: string): T => {
    try {
      if (!this.ENCRYPTION_IV) {
        throw new Error('Encryption IV is not set');
      }

      const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY, {
        iv: this.ENCRYPTION_IV,
      });
      const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData);
    } catch {
      throw new Error('Decryption failed');
    }
  };
}

export default LocalStorageService;