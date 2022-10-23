export default class StorageService {
  static localStorage =
    typeof window !== "undefined" ? window.localStorage : null;

  static getItem(key: string): string | null {
    return this.localStorage?.getItem(key) ?? null;
  }

  static setItem(key: string, value: string): void {
    this.localStorage?.setItem(key, value);
  }

  static removeItem(key: string): void {
    this.localStorage?.removeItem(key);
  }
}
