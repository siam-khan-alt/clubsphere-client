import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, AreaChart, Area 
} from 'recharts';

const customTooltipStyle = {
  backgroundColor: 'rgba(15, 23, 42, 0.9)', // Dark Slate
  border: 'none',
  borderRadius: '12px',
  color: '#fff',
  fontSize: '12px',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
};

export const MembersBarChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
      <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={11} tick={{fill: '#64748b'}} />
      <YAxis axisLine={false} tickLine={false} fontSize={11} tick={{fill: '#64748b'}} />
      <Tooltip 
        cursor={{fill: 'rgba(99, 102, 241, 0.05)'}} // Subtle highlight instead of white
        contentStyle={customTooltipStyle}
        itemStyle={{ color: '#fff' }}
      />
      <Bar dataKey="members" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={35} />
    </BarChart>
  </ResponsiveContainer>
);

export const RevenueAreaChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={data}>
      <defs>
        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
      <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={11} />
      <YAxis axisLine={false} tickLine={false} fontSize={11} />
      <Tooltip contentStyle={customTooltipStyle} itemStyle={{ color: '#fff' }} />
      <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
    </AreaChart>
  </ResponsiveContainer>
);

export const EventPerformanceChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
      <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={11} />
      <YAxis axisLine={false} tickLine={false} fontSize={11} />
      <Tooltip cursor={{fill: 'rgba(16, 185, 129, 0.05)'}} contentStyle={customTooltipStyle} itemStyle={{ color: '#fff' }} />
      <Bar dataKey="revenue" radius={[10, 10, 0, 0]} barSize={60}>
        {data?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#10b981' : '#34d399'} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);