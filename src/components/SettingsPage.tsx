import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { ArrowLeft, Save, Calendar, CheckCircle, XCircle, Clock, Upload, X } from 'lucide-react';

interface AppSettings {
  roomName: string;
  roomNameFontSize: number;
  timeFontSize: number;
  dateFontSize: number;
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

interface CalendarLog {
  timestamp: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface SettingsPageProps {
  onBack?: () => void;
  settings: AppSettings;
  onSettingsUpdate: (settings: AppSettings) => void;
}

export function SettingsPage({ onBack, settings, onSettingsUpdate }: SettingsPageProps) {
  const [roomName, setRoomName] = useState(settings.roomName);
  const [roomNameFontSize, setRoomNameFontSize] = useState(settings.roomNameFontSize);
  const [timeFontSize, setTimeFontSize] = useState(settings.timeFontSize);
  const [dateFontSize, setDateFontSize] = useState(settings.dateFontSize);
  const [borderThickness, setBorderThickness] = useState(settings.borderThickness);
  const [enableBackgrounds, setEnableBackgrounds] = useState(settings.enableBackgrounds);
  const [displayTimeout, setDisplayTimeout] = useState(settings.displayTimeout);
  const [autoBook, setAutoBook] = useState(settings.autoBook);
  const [showWeekend, setShowWeekend] = useState(settings.showWeekend);
  const [timeFormat, setTimeFormat] = useState(settings.timeFormat);
  const [theme, setTheme] = useState(settings.theme);
  const [useLocation, setUseLocation] = useState(settings.useLocation);
  const [manualLocation, setManualLocation] = useState(settings.manualLocation);
  const [temperatureUnit, setTemperatureUnit] = useState(settings.temperatureUnit);
  const [dateFormat, setDateFormat] = useState(settings.dateFormat);
  const [microsoftEnabled, setMicrosoftEnabled] = useState(settings.microsoftEnabled);
  const [googleEnabled, setGoogleEnabled] = useState(settings.googleEnabled);
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl);
  const [logoSize, setLogoSize] = useState(settings.logoSize);
  const [showWeather, setShowWeather] = useState(settings.showWeather);
  const [showLogo, setShowLogo] = useState(settings.showLogo);

  // Mock calendar logs
  const [microsoftLogs] = useState<CalendarLog[]>([
    { timestamp: '2025-09-19 14:32:15', type: 'success', message: 'Successfully synced 12 meetings' },
    { timestamp: '2025-09-19 14:31:45', type: 'info', message: 'Connecting to Microsoft Graph API' },
    { timestamp: '2025-09-19 14:30:22', type: 'success', message: 'Authentication successful' },
    { timestamp: '2025-09-19 13:15:03', type: 'error', message: 'Rate limit exceeded, retrying in 60 seconds' },
    { timestamp: '2025-09-19 12:45:18', type: 'success', message: 'Meeting "Team Standup" created successfully' }
  ]);

  const [googleLogs] = useState<CalendarLog[]>([
    { timestamp: '2025-09-19 14:25:33', type: 'info', message: 'Service currently disabled' },
    { timestamp: '2025-09-19 10:15:42', type: 'success', message: 'Last successful sync: 8 meetings' },
    { timestamp: '2025-09-19 09:30:11', type: 'success', message: 'OAuth token refreshed' },
    { timestamp: '2025-09-19 08:45:22', type: 'error', message: 'Network timeout, retrying connection' },
    { timestamp: '2025-09-19 08:00:05', type: 'success', message: 'Connected to Google Calendar API' }
  ]);

  const handleSave = () => {
    const newSettings = {
      roomName,
      roomNameFontSize,
      timeFontSize,
      dateFontSize,
      borderThickness,
      enableBackgrounds,
      displayTimeout,
      autoBook,
      showWeekend,
      timeFormat,
      theme,
      useLocation,
      manualLocation,
      temperatureUnit,
      dateFormat,
      microsoftEnabled,
      googleEnabled,
      logoUrl,
      logoSize,
      showWeather,
      showLogo
    };
    onSettingsUpdate(newSettings);
    console.log('Settings saved:', newSettings);
    onBack?.();
  };

  const getLogIcon = (type: CalendarLog['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-400" />;
      case 'info':
        return <Clock className="h-4 w-4 text-blue-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getLogBadgeColor = (type: CalendarLog['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'error':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'info':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getFontSizeLabel = (size: number) => {
    const fontSizeLabels: { [key: number]: string } = {
      1: 'Extra Small',
      2: 'Small', 
      3: 'Medium',
      4: 'Large (Default)',
      5: 'Extra Large',
      6: 'Huge',
      7: 'Massive',
      8: 'Giant'
    };
    return fontSizeLabels[size] || 'Large (Default)';
  };

  const getLogoSizeLabel = (size: number) => {
    const logoSizeLabels: { [key: number]: string } = {
      1: 'Extra Small (64px)',
      2: 'Small (96px)',
      3: 'Medium (128px)',
      4: 'Large (160px)',
      5: 'Extra Large (192px)',
      6: 'Huge (224px)',
      7: 'Massive (256px)',
      8: 'Giant (288px)'
    };
    return logoSizeLabels[size] || 'Large (160px)';
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoRemove = () => {
    setLogoUrl('');
  };

  return (
    <div className="h-screen w-screen fixed inset-0 bg-black text-white flex flex-col" style={{ overflow: 'auto' }}>
      {/* Header - Fixed */}
      <div className="flex-shrink-0 bg-black border-b border-gray-800 z-50">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-gray-800 rounded-xl"
              onClick={onBack}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-3xl font-medium">Room Settings</h1>
          </div>
          
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            onClick={handleSave}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>

      {/* Scrollable Settings Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full space-y-6 p-6 pb-24">
        {/* Room Configuration */}
        <Card className="p-6 bg-gray-800 border-gray-700 rounded-2xl">
          <h2 className="text-xl font-medium text-white mb-4">Room Configuration</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="room-name" className="text-gray-300">Room Name</Label>
              <Input
                id="room-name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="mt-1 bg-gray-700 border-gray-600 text-white rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="room-name-font-size" className="text-gray-300">
                Room Name Font Size
              </Label>
              <div className="mt-2 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Small</span>
                  <span className="text-gray-300">{getFontSizeLabel(roomNameFontSize)}</span>
                  <span className="text-gray-400">Large</span>
                </div>
                <Slider
                  id="room-name-font-size"
                  value={[roomNameFontSize]}
                  onValueChange={(values) => setRoomNameFontSize(values[0])}
                  min={1}
                  max={8}
                  step={1}
                  className="w-full"
                />
                <div className="text-xs text-gray-500">
                  Adjust the font size of the room name displayed on the main screen
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="logo-upload" className="text-gray-300">Room Logo</Label>
              <div className="mt-2 space-y-3">
                {logoUrl ? (
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center overflow-hidden">
                      <img 
                        src={logoUrl} 
                        alt="Logo Preview" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-300">Logo uploaded successfully</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-1 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                        onClick={handleLogoRemove}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Remove Logo
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-300 mb-2">Upload room logo</p>
                    <p className="text-xs text-gray-500 mb-3">Supports PNG, JPG, SVG files</p>
                    <label htmlFor="logo-upload" className="cursor-pointer">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="bg-blue-600/90 hover:bg-blue-700 text-white"
                        asChild
                      >
                        <span>Choose File</span>
                      </Button>
                    </label>
                  </div>
                )}
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <div className="text-xs text-gray-500">
                  The logo will be displayed in the top-right corner of the main screen
                </div>
              </div>
            </div>

            {logoUrl && (
              <div>
                <Label htmlFor="logo-size" className="text-gray-300">
                  Logo Display Size
                </Label>
                <div className="mt-2 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Small</span>
                    <span className="text-gray-300">{getLogoSizeLabel(logoSize)}</span>
                    <span className="text-gray-400">Large</span>
                  </div>
                  <Slider
                    id="logo-size"
                    value={[logoSize]}
                    onValueChange={(values) => setLogoSize(values[0])}
                    min={1}
                    max={8}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500">
                    Adjust how large the logo appears on the main display
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <Label htmlFor="timeout" className="text-gray-300">Display Timeout (minutes)</Label>
              <Select value={displayTimeout} onValueChange={setDisplayTimeout}>
                <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600 rounded-xl">
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Display Settings */}
        <Card className="p-6 bg-gray-800 border-gray-700 rounded-2xl">
          <h2 className="text-xl font-medium text-white mb-4">Display Settings</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="time-format" className="text-gray-300">Time Format</Label>
              <Select value={timeFormat} onValueChange={setTimeFormat}>
                <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600 rounded-xl">
                  <SelectItem value="12">12 Hour (AM/PM)</SelectItem>
                  <SelectItem value="24">24 Hour</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date-format" className="text-gray-300">Date Format</Label>
              <Select value={dateFormat} onValueChange={setDateFormat}>
                <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600 rounded-xl">
                  <SelectItem value="full">Friday, September 19, 2025</SelectItem>
                  <SelectItem value="weekday-day-month">Sunday 19, September, 2025</SelectItem>
                  <SelectItem value="short">Sep 19, 2025</SelectItem>
                  <SelectItem value="numeric">09/19/2025</SelectItem>
                  <SelectItem value="weekday-short">Fri, Sep 19</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="theme" className="text-gray-300">Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600 rounded-xl">
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="border-thickness" className="text-gray-300">Border Thickness</Label>
              <Select value={borderThickness} onValueChange={setBorderThickness}>
                <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600 rounded-xl">
                  <SelectItem value="0">None (Full Screen)</SelectItem>
                  <SelectItem value="2">Thin (2px)</SelectItem>
                  <SelectItem value="4">Medium (4px)</SelectItem>
                  <SelectItem value="8">Thick (8px)</SelectItem>
                  <SelectItem value="12">Extra Thick (12px)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enable-backgrounds" className="text-gray-300">Dynamic Landscape Backgrounds</Label>
                <p className="text-sm text-gray-500 mt-1">
                  Automatically change background to beautiful landscapes
                </p>
              </div>
              <Switch
                id="enable-backgrounds"
                checked={enableBackgrounds}
                onCheckedChange={setEnableBackgrounds}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-weekend" className="text-gray-300">Show Weekend Meetings</Label>
              <Switch
                id="show-weekend"
                checked={showWeekend}
                onCheckedChange={setShowWeekend}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-weather" className="text-gray-300">Show Weather Information</Label>
                <p className="text-sm text-gray-500 mt-1">
                  Display current weather conditions on the main screen
                </p>
              </div>
              <Switch
                id="show-weather"
                checked={showWeather}
                onCheckedChange={setShowWeather}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-logo" className="text-gray-300">Show Room Logo</Label>
                <p className="text-sm text-gray-500 mt-1">
                  Display the uploaded logo on the main screen
                </p>
              </div>
              <Switch
                id="show-logo"
                checked={showLogo}
                onCheckedChange={setShowLogo}
              />
            </div>

            <div>
              <Label htmlFor="time-font-size" className="text-gray-300">
                Time Display Size
              </Label>
              <div className="mt-2 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Small</span>
                  <span className="text-gray-300">{getFontSizeLabel(timeFontSize)}</span>
                  <span className="text-gray-400">Large</span>
                </div>
                <Slider
                  id="time-font-size"
                  value={[timeFontSize]}
                  onValueChange={(values) => setTimeFontSize(values[0])}
                  min={1}
                  max={8}
                  step={1}
                  className="w-full"
                />
                <div className="text-xs text-gray-500">
                  Adjust the size of the time display on the main screen
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="date-font-size" className="text-gray-300">
                Date Display Size
              </Label>
              <div className="mt-2 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Small</span>
                  <span className="text-gray-300">{getFontSizeLabel(dateFontSize)}</span>
                  <span className="text-gray-400">Large</span>
                </div>
                <Slider
                  id="date-font-size"
                  value={[dateFontSize]}
                  onValueChange={(values) => setDateFontSize(values[0])}
                  min={1}
                  max={8}
                  step={1}
                  className="w-full"
                />
                <div className="text-xs text-gray-500">
                  Adjust the size of the date display on the main screen
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Location & Weather Settings */}
        <Card className="p-6 bg-gray-800 border-gray-700 rounded-2xl">
          <h2 className="text-xl font-medium text-white mb-4">Location & Weather</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="use-location" className="text-gray-300">Use Location Services</Label>
                <p className="text-sm text-gray-500 mt-1">
                  Automatically detect location for weather updates
                </p>
              </div>
              <Switch
                id="use-location"
                checked={useLocation}
                onCheckedChange={setUseLocation}
              />
            </div>

            {!useLocation && (
              <div>
                <Label htmlFor="manual-location" className="text-gray-300">Location</Label>
                <Input
                  id="manual-location"
                  value={manualLocation}
                  onChange={(e) => setManualLocation(e.target.value)}
                  placeholder="Enter city, state or address"
                  className="mt-1 bg-gray-700 border-gray-600 text-white rounded-xl"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Used for weather display when location services are disabled
                </p>
              </div>
            )}

            <div>
              <Label htmlFor="temperature-unit" className="text-gray-300">Temperature Unit</Label>
              <Select value={temperatureUnit} onValueChange={setTemperatureUnit}>
                <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600 rounded-xl">
                  <SelectItem value="celsius">Celsius (°C)</SelectItem>
                  <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Booking Settings */}
        <Card className="p-6 bg-gray-800 border-gray-700 rounded-2xl">
          <h2 className="text-xl font-medium text-white mb-4">Booking Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-book" className="text-gray-300">Enable Auto-booking</Label>
                <p className="text-sm text-gray-500 mt-1">
                  Automatically book the room when someone enters
                </p>
              </div>
              <Switch
                id="auto-book"
                checked={autoBook}
                onCheckedChange={setAutoBook}
              />
            </div>
          </div>
        </Card>

        {/* Calendar Connectors */}
        <Card className="p-6 bg-gray-800 border-gray-700 rounded-2xl">
          <h2 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendar Connectors
          </h2>
          
          {/* Two connector icons side by side */}
          <div className="flex gap-4 mb-6">
            {/* Microsoft 365 */}
            <div className="flex-1 bg-gray-900/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <Label className="text-gray-300">Microsoft 365</Label>
                    <p className="text-xs text-gray-500">Outlook & Teams</p>
                  </div>
                </div>
                <Switch
                  checked={microsoftEnabled}
                  onCheckedChange={setMicrosoftEnabled}
                />
              </div>
              <Badge className={`w-full justify-center ${microsoftEnabled ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                {microsoftEnabled ? 'Connected' : 'Disabled'}
              </Badge>
              {microsoftEnabled && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Last sync: {microsoftLogs[0]?.timestamp.split(' ')[1]}
                </p>
              )}
            </div>

            {/* Google Calendar */}
            <div className="flex-1 bg-gray-900/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <Label className="text-gray-300">Google Calendar</Label>
                    <p className="text-xs text-gray-500">Workspace</p>
                  </div>
                </div>
                <Switch
                  checked={googleEnabled}
                  onCheckedChange={setGoogleEnabled}
                />
              </div>
              <Badge className={`w-full justify-center ${googleEnabled ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                {googleEnabled ? 'Connected' : 'Disabled'}
              </Badge>
              {googleEnabled && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Last sync: {googleLogs[1]?.timestamp.split(' ')[1]}
                </p>
              )}
            </div>
          </div>

          {/* Combined Activity Log */}
          {(microsoftEnabled || googleEnabled) && (
            <div className="bg-gray-900/50 rounded-xl p-4">
              <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Recent Activity
              </h4>
              <div className="h-24 overflow-y-auto">
                <div className="space-y-1">
                  {[...microsoftLogs.slice(0, 2), ...googleLogs.slice(0, 2)]
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .slice(0, 4)
                    .map((log, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs">
                      {getLogIcon(log.type)}
                      <span className="text-gray-500 font-mono">{log.timestamp.split(' ')[1]}</span>
                      <span className="text-gray-300 flex-1 truncate">{log.message}</span>
                      <Badge className={`text-xs ${getLogBadgeColor(log.type)}`}>
                        {log.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* System Information */}
        <Card className="p-6 bg-gray-800 border-gray-700 rounded-2xl">
          <h2 className="text-xl font-medium text-white mb-4">System Information</h2>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex justify-between">
              <span>Device ID:</span>
              <span>MRD-001-CR-A</span>
            </div>
            <div className="flex justify-between">
              <span>Software Version:</span>
              <span>v2.1.0</span>
            </div>
            <div className="flex justify-between">
              <span>Last Updated:</span>
              <span>September 15, 2025</span>
            </div>
            <div className="flex justify-between">
              <span>Network Status:</span>
              <span className="text-green-400">Connected</span>
            </div>
          </div>
        </Card>
        </div>
      </div>
    </div>
  );
}