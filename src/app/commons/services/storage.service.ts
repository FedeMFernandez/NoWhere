import { Injectable } from '@angular/core';


@Injectable()
export class StorageService {

  constructor() { }

  public exists(key: string): boolean {
    return (localStorage.getItem(key) != null);
  }

  public get(key: string): string | null {
    return (this.exists(key)) ? localStorage.getItem(key) : null;
  }

  public set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getObject<T>(key: string): T | null {
    return (this.exists(key)) ? JSON.parse(localStorage.getItem(key)) as T : null;
  }

  public setObject(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }

  public getBoolean(key: string): boolean {
    if (this.exists(key)) {
      return (this.get(key) === 'true');
    }
    return false;
  }

  public setBoolean(key: string, value: boolean): void {
    const stringValue = (value) ? 'true' : 'false';
    this.set(key, stringValue);
  }
}
