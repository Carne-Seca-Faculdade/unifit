import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  constructor() {}

  public save<T>(key: string, data: T): T | null {
    try {
      const dataAsString = JSON.stringify(data);
      localStorage.setItem(key, dataAsString);
      return data;
    } catch (error) {
      console.error('Error while saving item');
      return null;
    }
  }

  public getItem<T>(key: string): T | null {
    try {
      const localStorageData = localStorage.getItem(key);

      if (!localStorageData) return null;

      return JSON.parse(localStorageData);
    } catch (error) {
      console.error('Error while getting item');
      return null;
    }
  }

  public deleteItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error while deleting item');
    }
  }

  public clearData(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error while delete all data');
    }
  }
}
