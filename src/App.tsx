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
}

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('display');
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
    googleEnabled: false
  });

  const handleOpenSettings = () => {
    setCurrentView('settings');
  };

  const handleBackToDisplay = () => {
    setCurrentView('display');
  };

  const handleSettingsUpdate = (newSettings: AppSettings) => {
    setSettings(newSettings);
  };

  if (currentView === 'settings') {
    return (
      <SettingsPage 
        onBack={handleBackToDisplay} 
        settings={settings}
        onSettingsUpdate={handleSettingsUpdate}
      />
    );
  }

  return <MeetingRoomDisplay onOpenSettings={handleOpenSettings} settings={settings} />;
}