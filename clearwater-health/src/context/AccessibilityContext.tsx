import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilitySettings {
  fontSize: number; // percentage, 100 = normal
  letterSpacing: number; // in pixels, 0 = normal
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateFontSize: (size: number) => void;
  updateLetterSpacing: (spacing: number) => void;
  resetSettings: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: 100,
  letterSpacing: 0,
};

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Failed to load accessibility settings', e);
      }
    }
  }, []);

  // Save settings to localStorage and apply to DOM
  useEffect(() => {
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    
    // Apply settings only to the app content, not the accessibility button
    const appContent = document.getElementById('app-content');
    if (appContent) {
      const fontSizePercent = settings.fontSize / 100;
      const baseSize = 16; // assuming base font size is 16px
      const fontSize = baseSize * fontSizePercent;
      
      appContent.style.fontSize = fontSize + 'px';
      appContent.style.letterSpacing = settings.letterSpacing + 'px';
    }
  }, [settings]);

  const updateFontSize = (size: number) => {
    // Clamp between 70% and 200%
    const clampedSize = Math.max(70, Math.min(200, size));
    setSettings(prev => ({ ...prev, fontSize: clampedSize }));
  };

  const updateLetterSpacing = (spacing: number) => {
    // Clamp between -2px and 8px
    const clampedSpacing = Math.max(-2, Math.min(8, spacing));
    setSettings(prev => ({ ...prev, letterSpacing: clampedSpacing }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <AccessibilityContext.Provider value={{ settings, updateFontSize, updateLetterSpacing, resetSettings }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}
