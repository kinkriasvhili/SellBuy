// useLocalStorage.jsx
import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const getStoredValue = () => {
    try {
      const item = localStorage.getItem(key);
      if (item === null || item === "undefined") {
        return initialValue;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(getStoredValue);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
