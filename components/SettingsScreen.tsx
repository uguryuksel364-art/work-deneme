import React from 'react';
import { ArrowLeft, Moon, Globe, Bell, Mic2, Shield, Info, LogOut } from 'lucide-react';
import { useStore } from '../store';
import { Card } from './Shared';

export const SettingsScreen = () => {
  const { setView, theme, toggleTheme } = useStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 px-4 h-16 flex items-center gap-4">
         <button onClick={() => setView('HOME')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
             <ArrowLeft />
         </button>
         <h1 className="text-xl font-bold">Settings</h1>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-6 mt-4">
        
        {/* General */}
        <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">General</h2>
            <Card className="!p-0 overflow-hidden">
                <SettingItem 
                    icon={Globe} 
                    label="Language" 
                    value="English" 
                    onClick={() => {}} 
                />
                <div className="h-px bg-gray-100 dark:bg-gray-700 mx-4" />
                <SettingItem 
                    icon={Moon} 
                    label="Dark Mode" 
                    toggle 
                    checked={theme === 'dark'} 
                    onToggle={toggleTheme} 
                />
                <div className="h-px bg-gray-100 dark:bg-gray-700 mx-4" />
                <SettingItem 
                    icon={Bell} 
                    label="Notifications" 
                    toggle 
                    checked={true} 
                    onToggle={() => {}} 
                />
            </Card>
        </section>

        {/* Audio & Translation */}
        <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">Audio & Translation</h2>
            <Card className="!p-0 overflow-hidden">
                <SettingItem 
                    icon={Mic2} 
                    label="AI Voice" 
                    value="Female (Sarah)" 
                    onClick={() => {}} 
                />
                <div className="h-px bg-gray-100 dark:bg-gray-700 mx-4" />
                <div className="p-4 flex flex-col gap-2">
                    <span className="text-sm font-medium">Speech Speed</span>
                    <input type="range" className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600" />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Slow</span>
                        <span>Normal</span>
                        <span>Fast</span>
                    </div>
                </div>
            </Card>
        </section>

        {/* Privacy */}
        <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">Privacy</h2>
            <Card className="!p-0 overflow-hidden">
                 <SettingItem 
                    icon={Shield} 
                    label="Save Conversation History" 
                    toggle 
                    checked={true} 
                    onToggle={() => {}} 
                />
                 <div className="h-px bg-gray-100 dark:bg-gray-700 mx-4" />
                 <SettingItem 
                    icon={LogOut} 
                    label="Auto-delete transcripts" 
                    value="30 Days"
                    onClick={() => {}} 
                />
            </Card>
        </section>
        
        {/* About */}
        <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">About</h2>
            <Card className="!p-0 overflow-hidden">
                 <SettingItem 
                    icon={Info} 
                    label="Version" 
                    value="1.0.0 (Beta)"
                    onClick={() => {}} 
                />
                <div className="h-px bg-gray-100 dark:bg-gray-700 mx-4" />
                <button className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-red-500 font-medium">
                    Delete Account
                </button>
            </Card>
        </section>

        <div className="text-center text-xs text-gray-400 py-4">
            VoiceBridge © 2024. All rights reserved.
        </div>
      </div>
    </div>
  );
};

const SettingItem = ({ 
    icon: Icon, 
    label, 
    value, 
    toggle, 
    checked, 
    onToggle,
    onClick 
}: { 
    icon: React.ElementType, 
    label: string, 
    value?: string, 
    toggle?: boolean, 
    checked?: boolean, 
    onToggle?: () => void,
    onClick?: () => void
}) => (
    <div 
        onClick={toggle ? onToggle : onClick}
        className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
    >
        <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
                <Icon size={18} />
            </div>
            <span className="font-medium text-gray-900 dark:text-gray-100">{label}</span>
        </div>
        
        {toggle ? (
            <div className={`w-11 h-6 rounded-full relative transition-colors ${checked ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${checked ? 'left-6' : 'left-1'}`} />
            </div>
        ) : (
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{value}</span>
                {onClick && <span className="text-gray-400">›</span>}
            </div>
        )}
    </div>
);
