"use client";

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export const FACTION_INFO = {
  terran: {
    id: 'terran',
    name: 'Terran',
    designation: 'Terran Command Center',
    log: 'Personnel log',
    idLabel: 'ID',
    tags: { work: 'Mission log', skills: 'Loadout', exp: 'Service record' },
  },
  protoss: {
    id: 'protoss',
    name: 'Protoss',
    designation: 'Protoss Nexus',
    log: 'Archive',
    idLabel: 'Designation',
    tags: { work: 'Archive', skills: 'Disciplines', exp: 'Chronicle' },
  },
  zerg: {
    id: 'zerg',
    name: 'Zerg',
    designation: 'Zerg Hive',
    log: 'Strain log',
    idLabel: 'Strain',
    tags: { work: 'Strain log', skills: 'Adaptations', exp: 'Evolution' },
  },
};

const STORAGE_KEY = 'dbm-faction';
const FactionContext = createContext({ faction: 'terran', setFaction: () => {} });

export function ThemeProvider({ children }) {
  const [faction, setFactionState] = useState('terran');

  // layout.js inline script already set data-faction before paint; sync React to it
  useEffect(() => {
    const current = document.documentElement.dataset.faction;
    if (current && FACTION_INFO[current]) setFactionState(current);
  }, []);

  const setFaction = useCallback((id) => {
    if (!FACTION_INFO[id]) return;
    setFactionState(id);
    document.documentElement.dataset.faction = id;
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {}
  }, []);

  return (
    <FactionContext.Provider value={{ faction, setFaction }}>
      {children}
    </FactionContext.Provider>
  );
}

export const useFaction = () => useContext(FactionContext);