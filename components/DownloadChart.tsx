'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

interface ChartData {
    name: string;
    downloads: number;
    users?: number;
}

interface DownloadChartProps {
    data: ChartData[];
    type?: 'bar' | 'line' | 'area';
    height?: number;
    title?: string;
}

const DownloadChart = ({
    data,
    type = 'area',
    height = 300,
    title = 'Downloads Overview'
}: DownloadChartProps) => {
    const chartColors = {
        primary: '#8B5CF6',
        secondary: '#06B6D4',
        gradient: ['#8B5CF6', '#06B6D4']
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-black/90 border border-white/20 rounded-lg p-3 shadow-xl">
                    <p className="text-gray-400 text-xs mb-1">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-white font-bold">
                            {entry.name}: {entry.value.toLocaleString()}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    const renderChart = () => {
        switch (type) {
            case 'bar':
                return (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#666" tick={{ fill: '#999', fontSize: 12 }} />
                        <YAxis stroke="#666" tick={{ fill: '#999', fontSize: 12 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="downloads" fill={chartColors.primary} radius={[4, 4, 0, 0]} />
                        {data[0]?.users !== undefined && (
                            <Bar dataKey="users" fill={chartColors.secondary} radius={[4, 4, 0, 0]} />
                        )}
                    </BarChart>
                );
            case 'line':
                return (
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#666" tick={{ fill: '#999', fontSize: 12 }} />
                        <YAxis stroke="#666" tick={{ fill: '#999', fontSize: 12 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="downloads"
                            stroke={chartColors.primary}
                            strokeWidth={2}
                            dot={{ fill: chartColors.primary, strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                        />
                        {data[0]?.users !== undefined && (
                            <Line
                                type="monotone"
                                dataKey="users"
                                stroke={chartColors.secondary}
                                strokeWidth={2}
                                dot={{ fill: chartColors.secondary, strokeWidth: 2 }}
                            />
                        )}
                    </LineChart>
                );
            case 'area':
            default:
                return (
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="downloadGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.4} />
                                <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartColors.secondary} stopOpacity={0.4} />
                                <stop offset="95%" stopColor={chartColors.secondary} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#666" tick={{ fill: '#999', fontSize: 12 }} />
                        <YAxis stroke="#666" tick={{ fill: '#999', fontSize: 12 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="downloads"
                            stroke={chartColors.primary}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#downloadGradient)"
                        />
                        {data[0]?.users !== undefined && (
                            <Area
                                type="monotone"
                                dataKey="users"
                                stroke={chartColors.secondary}
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#userGradient)"
                            />
                        )}
                    </AreaChart>
                );
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6"
        >
            <h3 className="text-lg font-bold mb-4 text-white">{title}</h3>
            <div style={{ width: '100%', height }}>
                <ResponsiveContainer>
                    {renderChart()}
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default DownloadChart;
