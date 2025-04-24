// src/Pages/Analytics.jsx
import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, Users, MessageCircle, PieChart as PieChartIcon } from 'lucide-react';

// Mock data for demonstrations
const weeklyJoinsData = [
  { name: 'Mon', value: 4 },
  { name: 'Tue', value: 7 },
  { name: 'Wed', value: 12 },
  { name: 'Thu', value: 8 },
  { name: 'Fri', value: 16 },
  { name: 'Sat', value: 20 },
  { name: 'Sun', value: 14 },
];

const weeklyLeavesData = [
  { name: 'Mon', value: 2 },
  { name: 'Tue', value: 1 },
  { name: 'Wed', value: 5 },
  { name: 'Thu', value: 3 },
  { name: 'Fri', value: 4 },
  { name: 'Sat', value: 6 },
  { name: 'Sun', value: 2 },
];

const messageData = [
  { name: 'Mon', value: 120 },
  { name: 'Tue', value: 87 },
  { name: 'Wed', value: 143 },
  { name: 'Thu', value: 156 },
  { name: 'Fri', value: 192 },
  { name: 'Sat', value: 238 },
  { name: 'Sun', value: 167 },
];

const channelActivityData = [
  { name: 'general', value: 423 },
  { name: 'gaming', value: 287 },
  { name: 'music', value: 164 },
  { name: 'memes', value: 329 },
  { name: 'help', value: 218 },
];

const roleDistributionData = [
  { name: 'Admin', value: 4, color: '#b25fce' },
  { name: 'Moderator', value: 12, color: '#8431a0' },
  { name: 'VIP', value: 27, color: '#c382d9' },
  { name: 'Member', value: 182, color: '#d8aee6' },
];

const memberActivityData = [
  { name: 'Active', value: 143, color: '#4CAF50' },
  { name: 'Inactive', value: 82, color: '#FF5F5F' },
];

// Stat card component
const StatCard = ({ title, icon, value, change, color = 'amethyst' }) => {
  const Icon = icon;
  return (
    <div className="bg-coal p-4 rounded-2xl border border-plum/30">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-snow font-medium">{title}</h3>
        <div className={`p-2 bg-${color}/20 rounded-lg`}>
          <Icon className={`w-5 h-5 text-${color}`} />
        </div>
      </div>
      <p className="text-2xl font-bold text-snow">{value}</p>
      <p className={`text-xs ${change >= 0 ? 'text-meadow' : 'text-rose'}`}>
        {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last week
      </p>
    </div>
  );
};

// Chart card component
const ChartCard = ({ title, children, icon }) => {
  const Icon = icon;
  return (
    <div className="bg-coal p-4 rounded-2xl border border-plum/30 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-snow font-medium">{title}</h3>
        {icon && (
          <div className="p-2 bg-amethyst/20 rounded-lg">
            <Icon className="w-5 h-5 text-amethyst" />
          </div>
        )}
      </div>
      <div className="w-full h-64">{children}</div>
    </div>
  );
};

const Analytics = () => {
  return (
    <>
      <h1 className="text-2xl font-bold text-snow mb-6">Analytics</h1>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Members" 
          icon={Users} 
          value="225" 
          change={5.3} 
          color="amethyst"
        />
        <StatCard 
          title="New Joins" 
          icon={TrendingUp} 
          value="81" 
          change={12.7} 
          color="meadow"
        />
        <StatCard 
          title="Leaves" 
          icon={Users} 
          value="23" 
          change={-3.2} 
          color="rose"
        />
        <StatCard 
          title="Messages Today" 
          icon={MessageCircle} 
          value="567" 
          change={8.5} 
          color="orchid"
        />
      </div>
      
      {/* Chart Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Member Growth" icon={TrendingUp}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={weeklyJoinsData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorJoins" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#b25fce" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#b25fce" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A1A1A', 
                  borderColor: '#67267d',
                  color: '#F9FAFB' 
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#8431a0" 
                fillOpacity={1} 
                fill="url(#colorJoins)" 
                name="Joins"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        
        <ChartCard title="Server Leaves" icon={Users}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyLeavesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A1A1A', 
                  borderColor: '#FF5F5F',
                  color: '#F9FAFB' 
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#FF5F5F" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                name="Leaves"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      
      {/* Chart Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Message Activity" icon={MessageCircle}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={messageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A1A1A', 
                  borderColor: '#8431a0',
                  color: '#F9FAFB' 
                }} 
              />
              <Bar 
                dataKey="value" 
                fill="#8431a0" 
                radius={[4, 4, 0, 0]} 
                name="Messages"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        
        <ChartCard title="Channel Activity" icon={MessageCircle}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={channelActivityData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" stroke="#999" />
              <YAxis dataKey="name" type="category" stroke="#999" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A1A1A', 
                  borderColor: '#b25fce',
                  color: '#F9FAFB' 
                }} 
              />
              <Bar 
                dataKey="value" 
                fill="#b25fce" 
                radius={[0, 4, 4, 0]} 
                name="Messages"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      
      {/* Chart Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Role Distribution" icon={PieChartIcon}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={roleDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {roleDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A1A1A', 
                  borderColor: '#67267d',
                  color: '#F9FAFB' 
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        
        <ChartCard title="Member Activity" icon={Users}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={memberActivityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {memberActivityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A1A1A', 
                  borderColor: '#67267d',
                  color: '#F9FAFB' 
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        
        <div className="bg-coal p-4 rounded-2xl border border-plum/30">
          <h3 className="text-snow font-medium mb-4">Weekly Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-ash">Total Messages</span>
              <span className="text-snow font-medium">1,103</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ash">New Members</span>
              <span className="text-meadow font-medium">+81</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ash">Left Members</span>
              <span className="text-rose font-medium">-23</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ash">Active Users</span>
              <span className="text-snow font-medium">143 (64%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ash">Most Active Channel</span>
              <span className="text-snow font-medium">#general</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ash">Busiest Day</span>
              <span className="text-snow font-medium">Saturday</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;