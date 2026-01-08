import React, { useCallback, useState, useEffect } from 'react';
import { useSchemeConfig } from '@/components/providers/scheme-provider';
import { Button } from '@/components/ui/button';

interface CustomSchemePickerProps {
  customColor: string;
  activeScheme: string;
  disabled?: boolean;
}

export function CustomSchemePicker({
  customColor,
  disabled = false
}: CustomSchemePickerProps) {
  const { setCustomColor, setCustomForeground } = useSchemeConfig();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // Compute foreground color based on background color luminance
  const computeForeground = (color: string) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  const handleColorChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const newColor = event.target.value;

      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set new timeout for debounced updates
      const newTimeoutId = setTimeout(() => {
        try {
          const newForeground = computeForeground(newColor);
          setCustomColor(newColor);
          setCustomForeground(newForeground);
          document.documentElement.style.setProperty(
            '--custom-color',
            newColor
          );
          document.documentElement.style.setProperty(
            '--custom-foreground',
            newForeground
          );
          document.cookie = `custom_color=${newColor}; path=/; max-age=31536000; SameSite=Lax; ${window.location.protocol === 'https:' ? 'Secure;' : ''}`;
          document.cookie = `custom_foreground=${newForeground}; path=/; max-age=31536000; SameSite=Lax; ${window.location.protocol === 'https:' ? 'Secure;' : ''}`;
        } catch (error) {
          console.warn('Error handling color change:', error);
        }
      }, 100);

      setTimeoutId(newTimeoutId);
    },
    [disabled, timeoutId, setCustomColor, setCustomForeground]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const displayColor = customColor;

  return (
    <div className='relative'>
      <Button
        variant='outline'
        size='icon'
        className={`h-8 w-8 rounded-md border border-neutral-300 transition-all ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
        aria-label='Select Custom Color'
        asChild
      >
        <div>
          <input
            id='colorInput'
            type='color'
            value={displayColor}
            onChange={handleColorChange}
            className={`absolute inset-0 cursor-pointer opacity-0 ${disabled ? 'pointer-events-none' : ''}`}
            disabled={disabled}
          />
          <div
            className={`m-auto h-[1.2rem] w-[1.2rem] rounded-sm ${disabled ? 'bg-primary' : ''}`}
            style={disabled ? {} : { backgroundColor: displayColor }}
          />
        </div>
      </Button>
    </div>
  );
}
