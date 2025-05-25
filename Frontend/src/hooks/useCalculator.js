import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useCalculator = () => {
  const [savedConfigurations, setSavedConfigurations] = useLocalStorage('calculator-configs', []);
  const [calculationHistory, setCalculationHistory] = useLocalStorage('calculation-history', []);
  const [favorites, setFavorites] = useLocalStorage('favorite-configs', []);

  const saveConfiguration = useCallback((name, configuration) => {
    if (!name || !configuration) {
      throw new Error('Name and configuration are required');
    }

    const newConfig = {
      id: Date.now().toString(),
      name,
      configuration,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setSavedConfigurations(prev => {
      // Remove existing config with same name
      const filtered = prev.filter(config => config.name !== name);
      return [...filtered, newConfig].sort((a, b) => a.name.localeCompare(b.name));
    });

    return newConfig.id;
  }, [setSavedConfigurations]);

  const loadConfiguration = useCallback((nameOrId) => {
    const config = savedConfigurations.find(
      config => config.name === nameOrId || config.id === nameOrId
    );
    return config?.configuration || null;
  }, [savedConfigurations]);

  const deleteConfiguration = useCallback((nameOrId) => {
    setSavedConfigurations(prev => 
      prev.filter(config => config.name !== nameOrId && config.id !== nameOrId)
    );
  }, [setSavedConfigurations]);

  const updateConfiguration = useCallback((nameOrId, newConfiguration) => {
    setSavedConfigurations(prev => 
      prev.map(config => {
        if (config.name === nameOrId || config.id === nameOrId) {
          return {
            ...config,
            configuration: newConfiguration,
            updatedAt: new Date().toISOString(),
          };
        }
        return config;
      })
    );
  }, [setSavedConfigurations]);

  const addToHistory = useCallback((services, configuration, results) => {
    const historyEntry = {
      id: Date.now().toString(),
      services,
      configuration,
      results,
      timestamp: new Date().toISOString(),
    };

    setCalculationHistory(prev => {
      // Keep only last 50 entries
      const newHistory = [historyEntry, ...prev].slice(0, 50);
      return newHistory;
    });
  }, [setCalculationHistory]);

  const clearHistory = useCallback(() => {
    setCalculationHistory([]);
  }, [setCalculationHistory]);

  const addToFavorites = useCallback((configId) => {
    if (!favorites.includes(configId)) {
      setFavorites(prev => [...prev, configId]);
    }
  }, [favorites, setFavorites]);

  const removeFromFavorites = useCallback((configId) => {
    setFavorites(prev => prev.filter(id => id !== configId));
  }, [setFavorites]);

  const isFavorite = useCallback((configId) => {
    return favorites.includes(configId);
  }, [favorites]);

  const getFavoriteConfigurations = useCallback(() => {
    return savedConfigurations.filter(config => favorites.includes(config.id));
  }, [savedConfigurations, favorites]);

  const exportConfigurations = useCallback(() => {
    const data = {
      configurations: savedConfigurations,
      history: calculationHistory,
      favorites,
      exportedAt: new Date().toISOString(),
      version: '1.0',
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cloud-calculator-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [savedConfigurations, calculationHistory, favorites]);

  const importConfigurations = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          
          if (data.configurations) {
            setSavedConfigurations(prev => {
              const combined = [...prev, ...data.configurations];
              // Remove duplicates by name
              const unique = combined.filter((config, index, self) =>
                index === self.findIndex(c => c.name === config.name)
              );
              return unique;
            });
          }
          
          if (data.history) {
            setCalculationHistory(prev => [...data.history, ...prev].slice(0, 100));
          }
          
          if (data.favorites) {
            setFavorites(prev => [...new Set([...prev, ...data.favorites])]);
          }
          
          resolve(data);
        } catch (error) {
          reject(new Error('Invalid backup file format'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }, [setSavedConfigurations, setCalculationHistory, setFavorites]);

  return {
    // Configuration management
    savedConfigurations,
    saveConfiguration,
    loadConfiguration,
    deleteConfiguration,
    updateConfiguration,
    
    // History management
    calculationHistory,
    addToHistory,
    clearHistory,
    
    // Favorites management
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    getFavoriteConfigurations,
    
    // Import/Export
    exportConfigurations,
    importConfigurations,
  };
};

export default useCalculator;