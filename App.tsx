import React, { useEffect } from 'react';
import { useStore } from './store';
import { ActiveRoomScreen } from './components/ActiveRoom';
import { BluetoothScreen } from './components/BluetoothScreen';
import { TranscriptScreen } from './components/TranscriptScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { Button, Card } from './components/Shared';
import { Mic2, UserCircle, Settings as SettingsIcon, Plus, UserPlus } from 'lucide-react';
import clsx from 'clsx';

function App() {
  const { currentView, setView, theme } = useStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Simple Router Switch
  const renderView = () => {
    switch (currentView) {
      case 'ROOM': return <ActiveRoomScreen />;
      case 'BLUETOOTH': return <BluetoothScreen />;
      case 'TRANSCRIPT': return <TranscriptScreen />;
      case 'SETTINGS': return <SettingsScreen />;
      case 'PROFILE': return <ProfileScreen />;
      case 'HOME':
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans antialiased transition-colors duration-200">
      {renderView()}
    </div>
  );
}

const HomeScreen = () => {
    const { setView } = useStore();
    
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b from-primary-600 to-primary-800 rounded-b-[3rem] z-0" />
            <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            
            {/* Nav */}
            <nav className="relative z-10 p-6 flex justify-between items-center text-white">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <Mic2 /> VoiceBridge
                </div>
                <button onClick={() => setView('PROFILE')}>
                   <img src="https://picsum.photos/seed/me/200/200" alt="Profile" className="w-10 h-10 rounded-full border-2 border-white/30" />
                </button>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 space-y-8">
                <div className="text-center text-white space-y-4 mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Break Language <br/> Barriers Instantly
                    </h1>
                    <p className="text-primary-100 max-w-md mx-auto text-lg">
                        Real-time AI voice translation for seamless face-to-face communication.
                    </p>
                </div>

                {/* Action Cards */}
                <div className="w-full max-w-md space-y-4">
                    <div 
                        onClick={() => setView('ROOM')}
                        className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl flex items-center justify-between cursor-pointer transform hover:scale-[1.02] transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                <Plus size={28} />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Create Room</h3>
                                <p className="text-gray-500 text-sm">Start a new conversation</p>
                            </div>
                        </div>
                        <div className="text-gray-300 group-hover:text-primary-500">→</div>
                    </div>

                    <div 
                        onClick={() => setView('ROOM')}
                        className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl flex items-center justify-between cursor-pointer transform hover:scale-[1.02] transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                <UserPlus size={28} />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Join Room</h3>
                                <p className="text-gray-500 text-sm">Scan QR or enter code</p>
                            </div>
                        </div>
                        <div className="text-gray-300 group-hover:text-green-500">→</div>
                    </div>
                </div>
            </main>

            {/* Bottom Tools */}
            <div className="relative z-10 p-6 pb-8 flex justify-center gap-6">
                <ToolButton icon={SettingsIcon} label="Settings" onClick={() => setView('SETTINGS')} />
                <div className="w-px bg-gray-200 dark:bg-gray-700 h-10 self-center" />
                <ToolButton icon={UserCircle} label="Devices" onClick={() => setView('BLUETOOTH')} />
            </div>
        </div>
    )
}

const ToolButton = ({ icon: Icon, label, onClick }: any) => (
    <button onClick={onClick} className="flex flex-col items-center gap-2 group">
        <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm text-gray-400 group-hover:text-primary-600 group-hover:shadow-md transition-all">
            <Icon size={24} />
        </div>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</span>
    </button>
)

export default App;
