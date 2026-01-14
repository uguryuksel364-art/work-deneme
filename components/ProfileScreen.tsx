import React from 'react';
import { ArrowLeft, Camera, BarChart3, Clock, Languages } from 'lucide-react';
import { useStore } from '../store';
import { Card, Button } from './Shared';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const ProfileScreen = () => {
  const { user, stats, setView } = useStore();

  const activityData = [
    { name: 'Mon', hours: 2.5 },
    { name: 'Tue', hours: 1.2 },
    { name: 'Wed', hours: 3.8 },
    { name: 'Thu', hours: 2.1 },
    { name: 'Fri', hours: 4.5 },
    { name: 'Sat', hours: 1.0 },
    { name: 'Sun', hours: 0.5 },
  ];

  const langData = [
      { name: 'TR-EN', value: 65 },
      { name: 'TR-DE', value: 25 },
      { name: 'TR-FR', value: 10 },
  ];
  const COLORS = ['#6366f1', '#a5b4fc', '#e0e7ff'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-8">
       {/* Header */}
      <div className="bg-white dark:bg-gray-900 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 px-4 h-16 flex items-center gap-4">
         <button onClick={() => setView('HOME')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
             <ArrowLeft />
         </button>
         <h1 className="text-xl font-bold">Profile</h1>
      </div>

      <div className="max-w-3xl mx-auto p-4 space-y-6">
        {/* Profile Card */}
        <Card className="flex flex-col items-center text-center !pb-8 !pt-8">
            <div className="relative mb-4">
                <img src={user.avatar} alt="Profile" className="w-24 h-24 rounded-full border-4 border-gray-100 dark:border-gray-700" />
                <button className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors">
                    <Camera size={16} />
                </button>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
            <p className="text-gray-500 mb-6">{user.email}</p>
            <Button variant="outline" className="!px-6">Edit Profile</Button>
        </Card>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
            <StatCard icon={Clock} label="Talk Time" value={stats.totalTalkTime} color="text-blue-500" />
            <StatCard icon={Languages} label="Fav Pair" value={stats.favoritePair} color="text-purple-500" />
            <StatCard icon={BarChart3} label="Rooms" value={stats.roomsCreated} color="text-green-500" />
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
            <Card>
                <h3 className="font-bold mb-6 text-gray-900 dark:text-white">Weekly Activity</h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={activityData}>
                            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                                cursor={{fill: 'transparent'}}
                            />
                            <Bar dataKey="hours" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Card>
                <h3 className="font-bold mb-6 text-gray-900 dark:text-white">Language Usage</h3>
                <div className="h-64 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={langData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {langData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <Card className="!p-4 flex flex-col items-center justify-center text-center">
        <Icon className={`w-6 h-6 mb-2 ${color}`} />
        <div className="text-xl font-bold text-gray-900 dark:text-white">{value}</div>
        <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
    </Card>
);
