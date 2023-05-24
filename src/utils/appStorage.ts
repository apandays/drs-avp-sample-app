export class AppStorage {
  public static get<T>(key: string): T {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
  }

  public static set(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public static remove(key: string) {
    sessionStorage.removeItem(key);
  }
}
