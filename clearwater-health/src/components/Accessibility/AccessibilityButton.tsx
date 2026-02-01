import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';

export function AccessibilityButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateFontSize, updateLetterSpacing, resetSettings } = useAccessibility();

  return (
    <>
      {/* Fixed Accessibility Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        aria-label="Accessibility settings"
        title="Accessibility"
      >
        {/* Accessibility Icon (SVG) */}
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-72 bg-white rounded-lg shadow-xl p-6 border border-gray-200"
          style={{
            // Don't apply accessibility settings to the panel itself
            fontSize: '16px',
            letterSpacing: '0px',
          }}
        >
          {/* Panel Header - Don't apply settings */}
          <div className="mb-6" style={{ fontSize: '16px', letterSpacing: '0px' }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontSize: '16px' }}>
              Accessibility Settings
            </h3>
            <p className="text-sm text-gray-600" style={{ fontSize: '14px' }}>
              Customize text display
            </p>
          </div>

          {/* Font Size Slider */}
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              style={{ fontSize: '14px', letterSpacing: '0px' }}
            >
              Font Size: <span className="font-semibold">{settings.fontSize}%</span>
            </label>
            <input
              type="range"
              min="70"
              max="200"
              value={settings.fontSize}
              onChange={(e) => updateFontSize(Number(e.target.value))}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              aria-label="Adjust font size"
              style={{ fontSize: '14px' }}
            />
            <div
              className="flex justify-between text-xs text-gray-500 mt-1"
              style={{ fontSize: '12px', letterSpacing: '0px' }}
            >
              <span>70%</span>
              <span>200%</span>
            </div>
          </div>

          {/* Letter Spacing Slider */}
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              style={{ fontSize: '14px', letterSpacing: '0px' }}
            >
              Letter Spacing: <span className="font-semibold">{settings.letterSpacing}px</span>
            </label>
            <input
              type="range"
              min="-2"
              max="8"
              step="0.5"
              value={settings.letterSpacing}
              onChange={(e) => updateLetterSpacing(Number(e.target.value))}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              aria-label="Adjust letter spacing"
              style={{ fontSize: '14px' }}
            />
            <div
              className="flex justify-between text-xs text-gray-500 mt-1"
              style={{ fontSize: '12px', letterSpacing: '0px' }}
            >
              <span>-2px</span>
              <span>+8px</span>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetSettings}
            className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-md font-medium transition-colors duration-200"
            style={{ fontSize: '14px', letterSpacing: '0px' }}
          >
            Reset to Default
          </button>

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            aria-label="Close accessibility settings"
            style={{ fontSize: '16px', letterSpacing: '0px' }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
