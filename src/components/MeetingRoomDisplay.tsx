import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Settings, Cloud, Sun, CloudRain, Wind } from 'lucide-react';

interface TimeSlot {
  duration: string;
  label: string;
}

interface Meeting {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  organizer: string;
}

type RoomStatus = 'available' | 'warning' | 'unavailable';

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  location: string;
}

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

interface MeetingRoomDisplayProps {
  onOpenSettings?: () => void;
  settings: AppSettings;
}

export function MeetingRoomDisplay({ onOpenSettings, settings }: MeetingRoomDisplayProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [roomStatus, setRoomStatus] = useState<RoomStatus>('available');
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 22,
    condition: 'Partly Cloudy',
    icon: 'cloud',
    location: settings.useLocation ? 'Current Location' : settings.manualLocation
  });

  // Sample meetings data
  const [todaysMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Team Standup',
      startTime: '9:00 AM',
      endTime: '9:30 AM',
      organizer: 'Sarah Johnson'
    },
    {
      id: '2',
      title: 'Product Planning Session',
      startTime: '11:00 AM',
      endTime: '12:00 PM',
      organizer: 'Mike Chen'
    },
    {
      id: '3',
      title: 'Client Presentation',
      startTime: '2:00 PM',
      endTime: '3:30 PM',
      organizer: 'Emily Davis'
    },
    {
      id: '4',
      title: 'Engineering Review',
      startTime: '4:00 PM',
      endTime: '5:00 PM',
      organizer: 'Alex Rivera'
    }
  ]);

  const quickBookSlots: TimeSlot[] = [
    { duration: '15min', label: '15m' },
    { duration: '30min', label: '30m' },
    { duration: '60min', label: '1h' },
    { duration: '120min', label: '2h' }
  ];

  // Background images for dynamic rotation
  const landscapeImages = [
    'https://images.unsplash.com/photo-1571951477560-a4f11030fcad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBsYW5kc2NhcGUlMjBuYXR1cmV8ZW58MXx8fHwxNzU4MDc2MTMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1723233528142-3e1fa74c44d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHNjZW5lcnklMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NTgxOTI4NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1612675093148-c62b44b1b780?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHN1bnNldCUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTgxOTI4ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1632735179686-ffb3b31f5e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBncmVlbiUyMG5hdHVyZXxlbnwxfHx8fDE3NTgxNDIyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1690942566357-90489170ebd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBsYW5kc2NhcGUlMjBnb2xkZW58ZW58MXx8fHwxNzU4MTkyODg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1577642665234-b1abe52cd0ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHN1bnNldCUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTg2NTYwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1669978001934-fe67cfb25585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXR1bW4lMjBmb3Jlc3QlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU4NzAyMTQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1737372079419-3c4411ec49e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwcmVmbGVjdGlvbiUyMHNjZW5lcnl8ZW58MXx8fHwxNzU4NzAyMTQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1619719973329-5504db6e23e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FzdGFsJTIwY2xpZmYlMjBvY2VhbnxlbnwxfHx8fDE3NTg3MDIxNDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1641755842771-165180b90ba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBzbm93JTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1ODY5MjkyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1725388284208-d8f19a9111b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWFkb3clMjBmaWVsZCUyMGZsb3dlcnN8ZW58MXx8fHwxNzU4NzAyMTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1604070168580-bfeeed3db441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXZlciUyMHZhbGxleSUyMHNjZW5lcnl8ZW58MXx8fHwxNzU4NzAyMTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1672841828482-45faa4c70e50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwc3Vuc2V0fGVufDF8fHx8MTc1ODYxMzQ5NXww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1701238937492-364ec8023b21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW55b24lMjBkZXNlcnQlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU4NzAyMTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1603460154924-7471ed0c111d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5yaXNlJTIwaGlsbHMlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU4NzAyMTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Check for meeting status based on current time and today's meetings
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTimeInMinutes = currentHour * 60 + currentMinute;
      
      let newStatus: RoomStatus = 'available';
      
      for (const meeting of todaysMeetings) {
        const [time, period] = meeting.startTime.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        let meetingHours = hours;
        if (period === 'PM' && hours !== 12) meetingHours += 12;
        if (period === 'AM' && hours === 12) meetingHours = 0;
        
        const meetingStartInMinutes = meetingHours * 60 + minutes;
        
        // Parse end time
        const [endTime, endPeriod] = meeting.endTime.split(' ');
        const [endHours, endMinutes] = endTime.split(':').map(Number);
        let meetingEndHours = endHours;
        if (endPeriod === 'PM' && endHours !== 12) meetingEndHours += 12;
        if (endPeriod === 'AM' && endHours === 12) meetingEndHours = 0;
        
        const meetingEndInMinutes = meetingEndHours * 60 + endMinutes;
        
        // Check if meeting is currently active
        if (currentTimeInMinutes >= meetingStartInMinutes && currentTimeInMinutes < meetingEndInMinutes) {
          newStatus = 'unavailable';
          break;
        }
        
        // Check if meeting starts within 15 minutes
        const minutesUntilMeeting = meetingStartInMinutes - currentTimeInMinutes;
        if (minutesUntilMeeting > 0 && minutesUntilMeeting <= 15) {
          newStatus = 'warning';
          break;
        }
      }
      
      setRoomStatus(newStatus);
    }, 1000);

    return () => clearInterval(timer);
  }, [todaysMeetings]);

  // Background rotation effect
  useEffect(() => {
    if (settings.enableBackgrounds) {
      const rotateBackground = () => {
        const randomIndex = Math.floor(Math.random() * landscapeImages.length);
        setBackgroundImage(landscapeImages[randomIndex]);
      };

      // Set initial background
      rotateBackground();

      // Change background every 30 seconds
      const backgroundTimer = setInterval(rotateBackground, 30000);
      
      return () => clearInterval(backgroundTimer);
    } else {
      setBackgroundImage('');
    }
  }, [settings.enableBackgrounds]);

  // Mock weather data rotation
  useEffect(() => {
    const weatherConditions = [
      { temperature: 22, condition: 'Partly Cloudy', icon: 'cloud', location: settings.useLocation ? 'Current Location' : settings.manualLocation },
      { temperature: 20, condition: 'Sunny', icon: 'sun', location: settings.useLocation ? 'Current Location' : settings.manualLocation },
      { temperature: 18, condition: 'Rainy', icon: 'cloud-rain', location: settings.useLocation ? 'Current Location' : settings.manualLocation },
      { temperature: 14, condition: 'Windy', icon: 'wind', location: settings.useLocation ? 'Current Location' : settings.manualLocation }
    ];

    const updateWeather = () => {
      const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      setWeather(randomWeather);
    };

    // Update weather every 5 minutes
    const weatherTimer = setInterval(updateWeather, 300000);

    return () => clearInterval(weatherTimer);
  }, [settings.useLocation, settings.manualLocation]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: settings.timeFormat === '12'
    });
  };

  const formatDate = (date: Date) => {
    switch (settings.dateFormat) {
      case 'short':
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      case 'numeric':
        return date.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        });
      case 'weekday-short':
        return date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        });
      case 'weekday-day-month':
        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
        const day = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'long' });
        const year = date.getFullYear();
        return `${weekday} ${day}, ${month}, ${year}`;
      case 'full':
      default:
        return date.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
    }
  };

  const convertTemperature = (temp: number) => {
    if (settings.temperatureUnit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    }
    return temp;
  };

  const getTemperatureUnit = () => {
    return settings.temperatureUnit === 'fahrenheit' ? '°F' : '°C';
  };

  const getRoomNameFontSizeClass = () => {
    const fontSizeMap: { [key: number]: string } = {
      1: 'text-lg',
      2: 'text-xl',
      3: 'text-2xl',
      4: 'text-4xl',
      5: 'text-5xl',
      6: 'text-6xl',
      7: 'text-7xl',
      8: 'text-8xl'
    };
    return fontSizeMap[settings.roomNameFontSize] || 'text-4xl';
  };

  const getTimeFontSizeClass = () => {
    const fontSizeMap: { [key: number]: string } = {
      1: 'text-lg',
      2: 'text-xl',
      3: 'text-2xl',
      4: 'text-4xl',
      5: 'text-5xl',
      6: 'text-6xl',
      7: 'text-7xl',
      8: 'text-8xl'
    };
    return fontSizeMap[settings.timeFontSize] || 'text-6xl';
  };

  const getDateFontSizeClass = () => {
    const fontSizeMap: { [key: number]: string } = {
      1: 'text-lg',
      2: 'text-xl',
      3: 'text-2xl',
      4: 'text-4xl',
      5: 'text-5xl',
      6: 'text-6xl',
      7: 'text-7xl',
      8: 'text-8xl'
    };
    return fontSizeMap[settings.dateFontSize] || 'text-xl';
  };

  const getLogoSize = () => {
    const logoSizeMap: { [key: number]: number } = {
      1: 64,  // Extra Small
      2: 96,  // Small
      3: 128, // Medium
      4: 160, // Large
      5: 192, // Extra Large
      6: 224, // Huge
      7: 256, // Massive
      8: 288  // Giant
    };
    return logoSizeMap[settings.logoSize] || 160;
  };

  const handleQuickBook = (duration: string) => {
    console.log(`Booking room for ${duration}`);
    // In a real app, this would connect to a booking system
  };

  // Test function to cycle through statuses (for demonstration)
  const handleStatusTest = () => {
    const statuses: RoomStatus[] = ['available', 'warning', 'unavailable'];
    const currentIndex = statuses.indexOf(roomStatus);
    const nextIndex = (currentIndex + 1) % statuses.length;
    setRoomStatus(statuses[nextIndex]);
  };

  // Removed getBorderStyle function as we're now using background color approach

  const getStatusBadge = () => {
    switch (roomStatus) {
      case 'available':
        return (
          <Badge className="text-lg px-4 py-2 bg-green-500 text-white hover:bg-green-500">
            Available
          </Badge>
        );
      case 'warning':
        return (
          <Badge className="text-lg px-4 py-2 bg-amber-500 text-white hover:bg-amber-500">
            Meeting Starting Soon
          </Badge>
        );
      case 'unavailable':
        return (
          <Badge className="text-lg px-4 py-2 bg-red-500 text-white hover:bg-red-500">
            In Use
          </Badge>
        );
    }
  };

  const getNextMeeting = () => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    
    for (const meeting of todaysMeetings) {
      const [time, period] = meeting.startTime.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      let meetingHours = hours;
      if (period === 'PM' && hours !== 12) meetingHours += 12;
      if (period === 'AM' && hours === 12) meetingHours = 0;
      
      const meetingTimeInMinutes = meetingHours * 60 + minutes;
      
      if (meetingTimeInMinutes > currentTimeInMinutes) {
        return meeting;
      }
    }
    return null;
  };

  const nextMeeting = getNextMeeting();

  const getWeatherIcon = (iconType: string) => {
    switch (iconType) {
      case 'sun':
        return <Sun className="h-8 w-8 text-yellow-400" />;
      case 'cloud':
        return <Cloud className="h-8 w-8 text-gray-300" />;
      case 'cloud-rain':
        return <CloudRain className="h-8 w-8 text-blue-400" />;
      case 'wind':
        return <Wind className="h-8 w-8 text-gray-400" />;
      default:
        return <Cloud className="h-8 w-8 text-gray-300" />;
    }
  };

  const containerStyle = settings.enableBackgrounds && backgroundImage ? {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } : {};

  const borderThickness = parseInt(settings.borderThickness);
  const hasBorder = borderThickness > 0;

  return (
    <div className="h-screen w-screen fixed inset-0">
      {/* Border layer - only show when border thickness > 0 */}
      {hasBorder && (
        <div 
          className="absolute inset-0 transition-all duration-1000" 
          style={{
            backgroundColor: (() => {
              switch (roomStatus) {
                case 'warning': return '#f59e0b'; // amber-500
                case 'unavailable': return '#ef4444'; // red-500
                default: return '#000000'; // black
              }
            })()
          }}
        />
      )}
      
      {/* Background layer - fills screen when no border, has margin when border exists */}
      <div 
        className={`absolute bg-black ${hasBorder ? 'rounded-3xl' : ''}`}
        style={{
          margin: hasBorder ? `${borderThickness}px` : '0',
          height: hasBorder ? `calc(100vh - ${borderThickness * 2}px)` : '100vh',
          width: hasBorder ? `calc(100vw - ${borderThickness * 2}px)` : '100vw',
          ...containerStyle
        }}
      />
      
      {/* Content layer */}
      <div 
        className="relative text-white flex flex-col overflow-hidden z-10"
        style={{
          margin: hasBorder ? `${borderThickness}px` : '0',
          height: hasBorder ? `calc(100vh - ${borderThickness * 2}px)` : '100vh',
          width: hasBorder ? `calc(100vw - ${borderThickness * 2}px)` : '100vw',
          padding: '24px'
        }}
      >
      {/* Header with room name and logo */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h1 className={`${getRoomNameFontSizeClass()} mb-3 text-white font-medium`}>{settings.roomName}</h1>
          {getStatusBadge()}
        </div>
        
        {/* Logo area - only show if enabled */}
        {settings.showLogo && (
          <div className="rounded-2xl flex items-center justify-center overflow-hidden">
            {settings.logoUrl && (
              <img 
                src={settings.logoUrl} 
                alt="Room Logo" 
                className="object-contain"
                style={{
                  maxWidth: `${getLogoSize()}px`,
                  maxHeight: `${getLogoSize()}px`
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* Main content area - split layout */}
      <div className="flex-1 flex gap-6">
        {/* Left side - Time, Date, Status, Quick Book */}
        <div className="w-1/2 flex flex-col">
          {/* Time, date, and weather */}
          <div className="mb-6">
            <div className="flex items-start gap-8">
              <div className="flex-1">
                <div className={`${getTimeFontSizeClass()} mb-2 tabular-nums text-white font-medium`}>
                  {formatTime(currentTime)}
                </div>
                <div className={`${getDateFontSizeClass()} text-gray-300 font-normal`}>
                  {formatDate(currentTime)}
                </div>
              </div>
              
              {/* Weather - only show if enabled */}
              {settings.showWeather && (
                <div className="flex items-center gap-3 bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-700">
                  {getWeatherIcon(weather.icon)}
                  <div>
                    <div className="text-2xl text-white font-medium">{convertTemperature(weather.temperature)}{getTemperatureUnit()}</div>
                    <div className="text-sm text-gray-300">{weather.condition}</div>
                    <div className="text-xs text-gray-400">{weather.location}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Status */}
          {roomStatus === 'available' && nextMeeting && (
            <Card className="p-4 bg-gray-800/70 border-gray-700 mb-6 rounded-2xl backdrop-blur-sm">
              <div>
                <div className="text-lg mb-1 text-gray-300">Free until</div>
                <div className="text-3xl text-white font-medium">{nextMeeting.startTime}</div>
              </div>
            </Card>
          )}

          {/* Quick booking options */}
          <div className="mt-auto">
            <h3 className="text-lg mb-4 text-white font-medium">Quick Book</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickBookSlots.map((slot) => (
                <Button
                  key={slot.duration}
                  className="h-12 text-sm bg-blue-600/90 hover:bg-blue-700 text-white border-0 font-medium rounded-xl backdrop-blur-sm"
                  onClick={() => handleQuickBook(slot.duration)}
                  disabled={roomStatus === 'unavailable'}
                >
                  {slot.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Today's Schedule */}
        <div className="w-1/2">
          <h2 className="text-2xl mb-4 text-white font-medium">Today's Schedule</h2>
          <div className="space-y-3">
            {todaysMeetings.map((meeting, index) => (
              <Card key={meeting.id} className="p-4 bg-gray-800/70 border-gray-700 rounded-2xl backdrop-blur-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-lg text-white font-medium">{meeting.title}</div>
                  <div className="text-sm text-gray-400">
                    {meeting.startTime} - {meeting.endTime}
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  Organizer: {meeting.organizer}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

        {/* Settings icon */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-6 right-6 w-12 h-12 bg-gray-800/70 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-600 rounded-2xl backdrop-blur-sm"
          onClick={onOpenSettings}
        >
          <Settings className="h-6 w-6" />
        </Button>

        {/* Test button for status changes (hidden in production) */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute bottom-6 left-6 bg-gray-800/70 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-600 rounded-xl backdrop-blur-sm text-xs"
          onClick={handleStatusTest}
        >
          Test Status: {roomStatus}
        </Button>
      </div>
    </div>
  );
}