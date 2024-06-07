import { useCallback, useEffect, useState } from "react";

export default function useKeyStorage() {
  const [keyStorage, setKeyStorage] = useState<any>(null);
  const [storageKeys, setStorageKeys] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false)

  const getKey = useCallback((vaultId: number) => {
    return `v_${vaultId}`;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      throw new Error('no session storage');
    }

    setKeyStorage(() => ({
      set: (vaultId: number, password: string) => {
        const key = getKey(vaultId);
        sessionStorage.setItem(key, password);
        setStorageKeys((prev) => [...prev, key]);
      },
      get: (vaultId: number): string | null => {
        const _vaultKey = getKey(vaultId);
        const key = sessionStorage.getItem(_vaultKey);
        console.log(`key store: ${vaultId}, ${key}`)
        return key
      },
      remove: (vaultId: number): void => {
        const key = getKey(vaultId);
        sessionStorage.removeItem(key);
        setStorageKeys((prev) => prev.filter((k) => k !== key));
      },
      clear: () => {
        storageKeys.forEach((key) => {
          sessionStorage.removeItem(key);
        });
        setStorageKeys([]);
      },
    }));
    setLoaded(true)
  }, [getKey, storageKeys]);

  return {loaded, keyStorage};
}
