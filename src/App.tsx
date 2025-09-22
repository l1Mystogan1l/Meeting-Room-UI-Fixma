import React, { useState } from 'react';
import { MeetingRoomDisplay } from './components/MeetingRoomDisplay';
import { SettingsPage } from './components/SettingsPage';

type AppView = 'display' | 'settings';

interface AppSettings {
  roomName: string;
  roomNameFontSize: number;
  borderThickness: string;
  enableBackgrounds: boolean;
  displayTimeout: string;
  autoBook: boolean;
  showWeekend: boolean;
  timeFormat: string;
  theme: string;
  useLocation: boolean;
  manualLocation: string;
  temperatureUnit: string;
  dateFormat: string;
  microsoftEnabled: boolean;
  googleEnabled: boolean;
  logoUrl: string;
  logoSize: number;
  showWeather: boolean;
  showLogo: boolean;
}

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('display');
  
  // Set initial scroll behavior
  React.useEffect(() => {
    if (currentView === 'display') {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [currentView]);
  const [settings, setSettings] = useState<AppSettings>({
    roomName: 'Conference Room A',
    roomNameFontSize: 4,
    borderThickness: '8',
    enableBackgrounds: false,
    displayTimeout: '30',
    autoBook: false,
    showWeekend: false,
    timeFormat: '12',
    theme: 'dark',
    useLocation: true,
    manualLocation: 'San Francisco, CA',
    temperatureUnit: 'celsius',
    dateFormat: 'full',
    microsoftEnabled: false,
    googleEnabled: false,
    logoUrl: '',
    logoSize: 6,
    showWeather: true,
    showLogo: true
  });

  const handleOpenSettings = () => {
    setCurrentView('settings');
    // Allow scrolling when in settings
    document.body.classList.remove('no-scroll');
  };

  const handleBackToDisplay = () => {
    setCurrentView('display');
    // Prevent scrolling when in display mode
    document.body.classList.add('no-scroll');
  };

  const handleSettingsUpdate = (newSettings: AppSettings) => {
    setSettings(newSettings);
  };

  return (
    <>
      {currentView === 'settings' ? (
        <SettingsPage 
          onBack={handleBackToDisplay} 
          settings={settings}
          onSettingsUpdate={handleSettingsUpdate}
        />
      ) : (
        <MeetingRoomDisplay onOpenSettings={handleOpenSettings} settings={settings} />
      )}
    </>
  );
}