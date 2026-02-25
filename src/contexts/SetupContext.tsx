import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface DomeSetup {
  id: string;
  name: string;
  location: string;
  cropType: string;
  area: string;
  createdAt: string;
}

interface SetupContextType {
  setups: DomeSetup[];
  addSetup: (setup: Omit<DomeSetup, 'id' | 'createdAt'>) => void;
  removeSetup: (id: string) => void;
  updateSetup: (id: string, data: Partial<DomeSetup>) => void;
  activeSetupId: string | null;
  setActiveSetupId: (id: string | null) => void;
  hasSetups: boolean;
}

const SetupContext = createContext<SetupContextType | undefined>(undefined);

const STORAGE_KEY = 'krishidome_setups';
const ACTIVE_KEY = 'krishidome_active_setup';

export const SetupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [setups, setSetups] = useState<DomeSetup[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [activeSetupId, setActiveSetupId] = useState<string | null>(() => {
    return localStorage.getItem(ACTIVE_KEY);
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(setups));
  }, [setups]);

  useEffect(() => {
    if (activeSetupId) localStorage.setItem(ACTIVE_KEY, activeSetupId);
    else localStorage.removeItem(ACTIVE_KEY);
  }, [activeSetupId]);

  const addSetup = useCallback((data: Omit<DomeSetup, 'id' | 'createdAt'>) => {
    const newSetup: DomeSetup = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setSetups(prev => [...prev, newSetup]);
    setActiveSetupId(newSetup.id);
  }, []);

  const removeSetup = useCallback((id: string) => {
    setSetups(prev => prev.filter(s => s.id !== id));
    setActiveSetupId(prev => prev === id ? null : prev);
  }, []);

  const updateSetup = useCallback((id: string, data: Partial<DomeSetup>) => {
    setSetups(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  }, []);

  return (
    <SetupContext.Provider value={{
      setups,
      addSetup,
      removeSetup,
      updateSetup,
      activeSetupId,
      setActiveSetupId,
      hasSetups: setups.length > 0,
    }}>
      {children}
    </SetupContext.Provider>
  );
};

export const useSetups = () => {
  const context = useContext(SetupContext);
  if (!context) throw new Error('useSetups must be used within SetupProvider');
  return context;
};
