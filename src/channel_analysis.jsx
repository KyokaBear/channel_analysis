import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ReferenceLine, Label, ScatterChart, Scatter, ZAxis } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, AlertCircle, ChevronUp, ChevronDown, ArrowUpRight, ArrowDownRight, BarChart2, PieChart as PieChartIcon, Filter } from 'lucide-react';

// 主组件
const App = () => {
    // 视图控制: 'overview', 'paid', 'organic'
    const [activeView, setActiveView] = useState('overview');

    // 'paid' 视图内部 tab 控制: 'week1', 'week2', 'comparison'
    const [paidDataView, setPaidDataView] = useState('comparison');

    // 'organic' 标签页内的视图控制 ('week1', 'week2', 'comparison')
    const [organicDataView, setOrganicDataView] = useState('comparison');

    // --- 颜色定义 ---
    const categoryColors = {
        '移动应用投放': '#3b82f6', '广告PC投放': '#8b5cf6', '活动获客': '#10b981',
        '自然流量': '#f59e0b', '海外': '#ec4899', '高校SSO': '#06b6d4',
        '其他': '#64748b', '移动投放': '#14b8a6'
    };

    // --- 数据定义 ---
    // 投放渠道数据 (Week 1: 10.13-19)
    const paidChannelsWeek1 = [
        { channel: '百度', impressions: 1710037, clicks: 81470, clickRate: 4.76, registrations: 3457, regRate: 4.24, regCost: 12.19, type: '搜索引擎' },
        { channel: '360', impressions: 3266534, clicks: 203000, clickRate: 6.21, registrations: 8373, regRate: 4.12, regCost: 7.63, type: '搜索引擎' },
        { channel: 'Bing', impressions: 1038808, clicks: 35576, clickRate: 3.42, registrations: 4100, regRate: 11.52, regCost: 4.91, type: '搜索引擎' },
        { channel: '谷歌', impressions: 2689027, clicks: 67847, clickRate: 2.52, registrations: 13196, regRate: 19.45, regCost: 6.96, type: '搜索引擎' },
        { channel: '苹果', impressions: 1252868, clicks: 13825, clickRate: 1.10, registrations: 2211, regRate: 15.99, regCost: 17.86, type: '应用商店' },
        { channel: '华为', impressions: 1406487, clicks: 17489, clickRate: 1.24, registrations: 1111, regRate: 6.35, regCost: 8.64, type: '应用商店' },
        { channel: '小米', impressions: 17362985, clicks: null, clickRate: 0.00, registrations: 8635, regRate: null, regCost: 5.59, type: '应用商店' },
        { channel: '荣耀', impressions: 49685811, clicks: 276572, clickRate: 0.56, registrations: 15521, regRate: 5.61, regCost: 8.53, type: '应用商店' },
        { channel: 'OPPO', impressions: 54215858, clicks: null, clickRate: 0.00, registrations: 12784, regRate: null, regCost: 6.70, type: '应用商店' },
        { channel: 'vivo', impressions: 37932921, clicks: null, clickRate: 0.00, registrations: 17043, regRate: null, regCost: 8.30, type: '应用商店' }
    ];

    // 投放渠道数据 (Week 2: 10.20-26)
    const paidChannelsWeek2 = [
        { channel: '百度', impressions: 1719227, clicks: 80416, clickRate: 4.68, registrations: 3391, regRate: 4.22, regCost: 11.99, type: '搜索引擎' },
        { channel: '360', impressions: 3075708, clicks: 210499, clickRate: 6.84, registrations: 7988, regRate: 3.79, regCost: 8.24, type: '搜索引擎' },
        { channel: 'Bing', impressions: 989205, clicks: 35979, clickRate: 3.64, registrations: 4407, regRate: 12.25, regCost: 4.70, type: '搜索引擎' },
        { channel: '谷歌', impressions: 2636958, clicks: 69942, clickRate: 2.65, registrations: 14415, regRate: 20.61, regCost: 13.09, type: '搜索引擎' },
        { channel: '苹果', impressions: 1405012, clicks: 14058, clickRate: 1.00, registrations: 2438, regRate: 17.34, regCost: 17.73, type: '应用商店' },
        { channel: '华为', impressions: 1463927, clicks: 17035, clickRate: 1.16, registrations: 1181, regRate: 6.93, regCost: 8.36, type: '应用商店' },
        { channel: '小米', impressions: 18042310, clicks: null, clickRate: 0.00, registrations: 9419, regRate: null, regCost: 9.09, type: '应用商店' },
        { channel: '荣耀', impressions: 70650834, clicks: 347802, clickRate: 0.49, registrations: 19777, regRate: 5.69, regCost: 8.68, type: '应用商店' },
        { channel: 'OPPO', impressions: 73977898, clicks: null, clickRate: 0.00, registrations: 18084, regRate: null, regCost: 7.34, type: '应用商店' },
        { channel: 'vivo', impressions: 45788700, clicks: null, clickRate: 0.00, registrations: 19945, regRate: null, regCost: 8.42, type: '应用商店' }
    ];

    // 分类渠道数据 (Week 1: 10.13-19)
    const organicChannelsWeek1 = [
        { category: '移动应用投放', registrations: 57300, type: 'paid', color: categoryColors['移动应用投放'] },
        { category: '广告PC投放', registrations: 28380, type: 'paid', color: categoryColors['广告PC投放'] },
        { category: '活动获客', registrations: 12290, type: 'organic', color: categoryColors['活动获客'] },
        { category: '自然流量', registrations: 8549, type: 'organic', color: categoryColors['自然流量'] },
        { category: '海外', registrations: 9640, type: 'organic', color: categoryColors['海外'] },
        { category: '高校SSO', registrations: 2084, type: 'organic', color: categoryColors['高校SSO'] },
        { category: '其他', registrations: 988, type: 'other', color: categoryColors['其他'] },
        { category: '移动投放', registrations: 675, type: 'paid', color: categoryColors['移动投放'] }
    ];

    // 分类渠道数据 (Week 2: 10.20-26)
    const organicChannelsWeek2 = [
        { category: '移动应用投放', impressions: 211328681, clicks: 903695, clickRate: 0.43, registrations: 70870, regRate: 7.84, regCost: 9.94, type: 'paid', color: categoryColors['移动应用投放'] },
        { category: '广告PC投放', impressions: 8421098, clicks: 410894, clickRate: 4.88, registrations: 29450, regRate: 7.17, regCost: 9.51, type: 'paid', color: categoryColors['广告PC投放'] },
        { category: '活动获客', impressions: 220000, clicks: 40000, clickRate: 18.18, registrations: 8436, regRate: 21.09, regCost: 7.00, type: 'organic', color: categoryColors['活动获客'] },
        { category: '自然流量', impressions: 2800000, clicks: 200000, clickRate: 7.14, registrations: 9360, regRate: 4.68, regCost: null, type: 'organic', color: categoryColors['自然流量'] },
        { category: '海外', impressions: 3383260, clicks: 238326, clickRate: 7.04, registrations: 8036, regRate: 3.37, regCost: null, type: 'organic', color: categoryColors['海外'] },
        { category: '高校SSO', impressions: 300000, clicks: 20000, clickRate: 6.67, registrations: 2330, regRate: 11.65, regCost: null, type: 'organic', color: categoryColors['高校SSO'] },
        { category: '其他', impressions: 120000, clicks: 18000, clickRate: 15.00, registrations: 1019, regRate: 5.66, regCost: null, type: 'other', color: categoryColors['其他'] },
        { category: '移动投放', impressions: 95267748, clicks: 151051, clickRate: 0.16, registrations: 686, regRate: 0.45, regCost: null, type: 'paid', color: categoryColors['移动投放'] }
    ];

    // 行业基准数据
    const benchmarkData = { 
        '移动应用广告': { ctr: [1, 3], cvr: [20, 40] }, 
        '广告PC投放': { ctr: [0.5, 2], cvr: [15, 30] },
        '搜索引擎': { ctr: [2, 6], cvr: [5, 15] },
        '应用商店': { ctr: [0.5, 2], cvr: [5, 20] }
    };

    // --- 动态计算 ---
    // 付费渠道汇总数据
    const totalPaidImpressionsW1 = paidChannelsWeek1.reduce((sum, ch) => sum + ch.impressions, 0);
    const totalPaidClicksW1 = paidChannelsWeek1.reduce((sum, ch) => sum + (ch.clicks || 0), 0);
    const totalPaidRegistrationsW1 = paidChannelsWeek1.reduce((sum, ch) => sum + ch.registrations, 0);
    
    const totalPaidImpressionsW2 = paidChannelsWeek2.reduce((sum, ch) => sum + ch.impressions, 0);
    const totalPaidClicksW2 = paidChannelsWeek2.reduce((sum, ch) => sum + (ch.clicks || 0), 0);
    const totalPaidRegistrationsW2 = paidChannelsWeek2.reduce((sum, ch) => sum + ch.registrations, 0);
    
    // 自然渠道汇总数据
    const totalOrganicWeek1 = organicChannelsWeek1.reduce((sum, ch) => sum + ch.registrations, 0);
    const totalOrganicWeek2 = organicChannelsWeek2.reduce((sum, ch) => sum + ch.registrations, 0);
    const organicWoWChange = totalOrganicWeek1 !== 0 ? ((totalOrganicWeek2 - totalOrganicWeek1) / totalOrganicWeek1 * 100) : (totalOrganicWeek2 > 0 ? Infinity : 0);
    
    const weightedAvgRegCost = (channels) => {
        const rows = channels.filter(ch => typeof ch.regCost === 'number' && ch.registrations > 0);
        const regSum = rows.reduce((s, ch) => s + ch.registrations, 0);
        if (regSum === 0) return null;
        const costSum = rows.reduce((s, ch) => s + ch.regCost * ch.registrations, 0);
        return costSum / regSum;
    };
    
    const avgPaidRegCostW1 = weightedAvgRegCost(paidChannelsWeek1);
    const avgPaidRegCostW2 = weightedAvgRegCost(paidChannelsWeek2);
    
    // 付费与自然渠道对比数据
    const paidVsOrganicWeek1 = [
        { type: '付费投放', registrations: organicChannelsWeek1.filter(c => c.type === 'paid').reduce((s, c) => s + c.registrations, 0), color: '#3b82f6' },
        { type: '自然获客', registrations: organicChannelsWeek1.filter(c => c.type === 'organic').reduce((s, c) => s + c.registrations, 0), color: '#10b981' },
        { type: '其他', registrations: organicChannelsWeek1.filter(c => c.type === 'other').reduce((s, c) => s + c.registrations, 0), color: '#64748b' }
    ];
    
    const paidVsOrganicWeek2 = [
        { type: '付费投放', registrations: organicChannelsWeek2.filter(c => c.type === 'paid').reduce((s, c) => s + c.registrations, 0), color: '#3b82f6' },
        { type: '自然获客', registrations: organicChannelsWeek2.filter(c => c.type === 'organic').reduce((s, c) => s + c.registrations, 0), color: '#10b981' },
        { type: '其他', registrations: organicChannelsWeek2.filter(c => c.type === 'other').reduce((s, c) => s + c.registrations, 0), color: '#64748b' }
    ];
    
    // 计算百分比
    organicChannelsWeek1.forEach(ch => { ch.percentage = totalOrganicWeek1 !== 0 ? ((ch.registrations / totalOrganicWeek1) * 100).toFixed(1) : '0.0'; });
    organicChannelsWeek2.forEach(ch => { ch.percentage = totalOrganicWeek2 !== 0 ? ((ch.registrations / totalOrganicWeek2) * 100).toFixed(1) : '0.0'; });
    paidVsOrganicWeek1.forEach(item => item.percentage = totalOrganicWeek1 !== 0 ? ((item.registrations / totalOrganicWeek1) * 100).toFixed(1) : '0.0');
    paidVsOrganicWeek2.forEach(item => item.percentage = totalOrganicWeek2 !== 0 ? ((item.registrations / totalOrganicWeek2) * 100).toFixed(1) : '0.0');
    
    // 渠道分类数据
    const categoryDataWeek1 = organicChannelsWeek1.map(ch => ({ name: ch.category, value: ch.registrations, color: ch.color }));
    const categoryDataWeek2 = organicChannelsWeek2.map(ch => ({ name: ch.category, value: ch.registrations, color: ch.color }));
    
    // 合并的付费渠道数据
    const combinedPaidData = paidChannelsWeek1.map(chW1 => {
        const chW2 = paidChannelsWeek2.find(ch => ch.channel.toLowerCase() === chW1.channel.toLowerCase());
        
        const getChange = (v1, v2) => {
            if (v1 === null || v1 === undefined || v2 === null || v2 === undefined) return { value: null, rate: null };
            const changeValue = v2 - v1;
            const changeRate = v1 !== 0 ? (changeValue / v1 * 100) : (v2 > 0 ? Infinity : 0);
            return { value: changeValue, rate: changeRate };
        };
        
        if (!chW2) {
            return {
                channel: chW1.channel,
                type: chW1.type,
                week1_registrations: chW1.registrations,
                week2_registrations: 0,
                registrationsChange: getChange(chW1.registrations, 0),
                week1_cost: chW1.regCost,
                week2_cost: null,
                costChange: { value: null, rate: null },
                week1_ctr: chW1.clickRate,
                week2_ctr: null,
                week1_regrate: chW1.regRate,
                week2_regrate: null
            };
        }
        
        return {
            channel: chW1.channel,
            type: chW1.type,
            week1_impressions: chW1.impressions,
            week2_impressions: chW2.impressions,
            impressionsChange: getChange(chW1.impressions, chW2.impressions),
            week1_clicks: chW1.clicks,
            week2_clicks: chW2.clicks,
            clicksChange: getChange(chW1.clicks, chW2.clicks),
            week1_registrations: chW1.registrations,
            week2_registrations: chW2.registrations,
            registrationsChange: getChange(chW1.registrations, chW2.registrations),
            week1_cost: chW1.regCost,
            week2_cost: chW2.regCost,
            costChange: getChange(chW1.regCost, chW2.regCost),
            week1_ctr: chW1.clickRate,
            week2_ctr: chW2.clickRate,
            ctrChange: getChange(chW1.clickRate, chW2.clickRate),
            week1_regrate: chW1.regRate,
            week2_regrate: chW2.regRate,
            regrateChange: getChange(chW1.regRate, chW2.regRate),
        };
    });
    
    // 合并的自然渠道数据
    const combinedOrganicData = organicChannelsWeek1.map((chW1) => {
        const chW2 = organicChannelsWeek2.find(ch => ch.category === chW1.category);
        return {
            category: chW1.category,
            week1_reg: chW1.registrations,
            week2_reg: chW2 ? chW2.registrations : 0,
            type: chW1.type,
            color: chW1.color,
            impressions_w2: chW2 ? chW2.impressions : null,
            clicks_w2: chW2 ? chW2.clicks : null,
            clickRate_w2: chW2 ? chW2.clickRate : null,
            regRate_w2: chW2 ? chW2.regRate : null,
            regCost_w2: chW2 ? chW2.regCost : null,
        };
    });

    // --- 辅助函数 ---
    const getBenchmarkForPaidChannel = (channel) => {
        if (!channel) return null;
        if (channel.type === '搜索引擎') return benchmarkData['广告PC投放'];
        if (channel.type === '应用商店') return benchmarkData['移动应用广告'];
        return null;
    };
    
    const getCostColor = (value) => {
        if (value === null || value === undefined) return '#64748b';
        return value < 7 ? '#10b981' : value < 10 ? '#f59e0b' : '#ef4444';
    };
    
    const getChangeColor = (value) => {
        if (value === null || value === undefined || !isFinite(value)) return 'text-slate-500';
        return value > 0 ? 'text-green-600' : value < 0 ? 'text-red-600' : 'text-slate-600';
    };
    
    const formatPercent = (value) => {
        if (value === null || value === undefined) return '-';
        const numValue = typeof value === 'string' ? parseFloat(value.replace('%', '')) : value;
        if (isNaN(numValue)) return '-';
        return `${numValue.toFixed(2)}%`;
    };
    
    const formatChangeRate = (rate) => {
        if (rate === null || rate === undefined) return '-';
        if (!isFinite(rate)) return '∞';
        return `${rate > 0 ? '+' : ''}${rate.toFixed(1)}%`;
    };
    
    const formatAxisPercent = (tickItem) => `${tickItem}%`;
    
    const formatLargeNumber = (num) => {
        if (num === null || num === undefined) return '-';
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
        return num.toLocaleString();
    };
    
    const getChangeIcon = (value) => {
        if (value === null || value === undefined || !isFinite(value)) return null;
        return value > 0 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
    };
    
    const getBenchmarkStatus = (value, [min, max]) => {
        if (value === null || value === undefined) return 'unknown';
        if (value < min) return 'below';
        if (value > max) return 'above';
        return 'within';
    };
    
    const renderBenchmarkIndicator = (value, range) => {
        const status = getBenchmarkStatus(value, range);
        const colors = {
            below: { bg: 'bg-red-100', text: 'text-red-800', icon: <ArrowDownRight className="w-4 h-4" /> },
            within: { bg: 'bg-green-100', text: 'text-green-800', icon: <TrendingUp className="w-4 h-4" /> },
            above: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <ArrowUpRight className="w-4 h-4" /> },
            unknown: { bg: 'bg-gray-100', text: 'text-gray-800', icon: null }
        };
        
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${colors[status].bg} ${colors[status].text}`}>
                {colors[status].icon}
                {status === 'below' ? '低于基准' : status === 'within' ? '符合基准' : status === 'above' ? '高于基准' : '无基准'}
            </span>
        );
    };

    // --- 当前视图数据 ---
    const currentOrganicData = organicDataView === 'week1' ? organicChannelsWeek1 : organicChannelsWeek2;
    const currentCategoryData = organicDataView === 'week1' ? categoryDataWeek1 : categoryDataWeek2;
    const currentPaidVsOrganic = organicDataView === 'week1' ? paidVsOrganicWeek1 : paidVsOrganicWeek2;
    const currentTotalOrganic = organicDataView === 'week1' ? totalOrganicWeek1 : totalOrganicWeek2;

    const safeRateChange = (w1, w2) => {
        if (w1 == null || w2 == null || w1 === 0) return null;
        return ((w2 - w1) / w1) * 100;
    };

    const pickTopN = (arr, n, compareFn) => {
        if (!arr || arr.length === 0) return [];
        const sorted = [...arr].sort(compareFn || ((a, b) => b - a));
        return sorted.slice(0, Math.min(n, sorted.length));
    };

    const pickBottomN = (arr, n, compareFn) => {
        if (!arr || arr.length === 0) return [];
        const sorted = [...arr].sort(compareFn || ((a, b) => a - b));
        return sorted.slice(0, Math.min(n, sorted.length));
    };

    const getTopPerformers = () => {
        const performers = [];
        
        const validChannels = combinedPaidData.filter(ch => ch.week2_registrations > 0);
        
        const topRegrate = validChannels
            .filter(ch => ch.week2_regrate != null)
            .sort((a, b) => (b.week2_regrate || 0) - (a.week2_regrate || 0))
            .slice(0, 2);
        
        const lowCost = validChannels
            .filter(ch => ch.week2_cost != null)
            .sort((a, b) => (a.week2_cost || Infinity) - (b.week2_cost || Infinity))
            .slice(0, 2);
        
        const topCtr = validChannels
            .filter(ch => ch.week2_ctr != null)
            .sort((a, b) => (b.week2_ctr || 0) - (a.week2_ctr || 0))
            .slice(0, 2);
        
        topRegrate.forEach(ch => {
            const wow = safeRateChange(ch.week1_regrate, ch.week2_regrate);
            performers.push({
                channel: ch.channel,
                metric: '注册转化率',
                value: formatPercent(ch.week2_regrate),
                wow: wow,
                priority: 1
            });
        });
        
        lowCost.forEach(ch => {
            const wow = safeRateChange(ch.week1_cost, ch.week2_cost);
            if (!performers.find(p => p.channel === ch.channel)) {
                performers.push({
                    channel: ch.channel,
                    metric: '注册成本',
                    value: `¥${ch.week2_cost.toFixed(2)}`,
                    wow: wow,
                    priority: 2
                });
            }
        });
        
        topCtr.forEach(ch => {
            const wow = safeRateChange(ch.week1_ctr, ch.week2_ctr);
            if (!performers.find(p => p.channel === ch.channel)) {
                performers.push({
                    channel: ch.channel,
                    metric: '点击转化率',
                    value: formatPercent(ch.week2_ctr),
                    wow: wow,
                    priority: 3
                });
            }
        });
        
        return performers.slice(0, 3);
    };

    const getPoorPerformers = () => {
        const performers = [];
        
        const validChannels = combinedPaidData.filter(ch => ch.week2_registrations > 0);
        
        const lowRegrate = validChannels
            .filter(ch => ch.week2_regrate != null)
            .sort((a, b) => (a.week2_regrate || Infinity) - (b.week2_regrate || Infinity))
            .slice(0, 2);
        
        const highCost = validChannels
            .filter(ch => ch.week2_cost != null)
            .sort((a, b) => (b.week2_cost || 0) - (a.week2_cost || 0))
            .slice(0, 2);
        
        const highCostIncrease = validChannels
            .filter(ch => ch.week1_cost != null && ch.week2_cost != null)
            .map(ch => ({ ...ch, costWow: safeRateChange(ch.week1_cost, ch.week2_cost) }))
            .filter(ch => ch.costWow != null && ch.costWow > 0)
            .sort((a, b) => (b.costWow || 0) - (a.costWow || 0))
            .slice(0, 2);
        
        lowRegrate.forEach(ch => {
            const wow = safeRateChange(ch.week1_regrate, ch.week2_regrate);
            performers.push({
                channel: ch.channel,
                metric: '注册转化率',
                value: formatPercent(ch.week2_regrate),
                wow: wow,
                priority: 1
            });
        });
        
        highCostIncrease.forEach(ch => {
            if (!performers.find(p => p.channel === ch.channel)) {
                performers.push({
                    channel: ch.channel,
                    metric: '注册成本',
                    value: `¥${ch.week2_cost.toFixed(2)}`,
                    wow: ch.costWow,
                    priority: 2
                });
            }
        });
        
        highCost.forEach(ch => {
            const wow = safeRateChange(ch.week1_cost, ch.week2_cost);
            if (!performers.find(p => p.channel === ch.channel)) {
                performers.push({
                    channel: ch.channel,
                    metric: '注册成本',
                    value: `¥${ch.week2_cost.toFixed(2)}`,
                    wow: wow,
                    priority: 3
                });
            }
        });
        
        return performers.slice(0, 3);
    };

    const WoWTooltip = ({ active, payload, label, metricKind = 'registrations', formatValue }) => {
        if (!active || !payload || payload.length === 0) return null;

        const get = (re) => payload.find(p => re.test(p.dataKey))?.value ?? null;
        const w1 = get(/week1/i);
        const w2 = get(/week2/i);

        let wow = null;
        if (w1 != null && w2 != null && w1 !== 0) {
            wow = ((w2 - w1) / w1) * 100;
        }

        const beneficial = metricKind !== 'cost';
        const color = wow == null
            ? '#cbd5e1'
            : (wow >= 0
                ? (beneficial ? '#22c55e' : '#ef4444')
                : (beneficial ? '#ef4444' : '#22c55e'));

        const fmt = (v) => {
            if (v == null) return '-';
            return formatValue ? formatValue(v) : v;
        };

        return (
            <div className="px-3 py-2 rounded-md shadow bg-slate-800 text-white">
                <div className="font-semibold mb-1">{label}</div>
                {payload.map((p, i) => (
                    <div key={i} className="text-sm opacity-90">{p.name}：{fmt(p.value)}</div>
                ))}
                <div className="text-sm mt-1" style={{ color }}>
                    周环比：{wow == null ? '-' : `${wow >= 0 ? '+' : ''}${wow.toFixed(2)}%`}
                </div>
            </div>
        );
    };

    // --- 组件返回 JSX ---
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* --- 头部和主导航 --- */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">全渠道漏斗分析系统</h1>
                            <p className="text-slate-600">整合投放渠道与自然获客的完整数据视图</p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <button 
                                onClick={() => setActiveView('overview')} 
                                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${activeView === 'overview' ? 'bg-blue-500 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                            >
                                <BarChart2 className="w-4 h-4" />
                                总览
                            </button>
                            <button 
                                onClick={() => setActiveView('paid')} 
                                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${activeView === 'paid' ? 'bg-blue-500 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                            >
                                <DollarSign className="w-4 h-4" />
                                投放渠道细分
                            </button>
                            <button 
                                onClick={() => setActiveView('organic')} 
                                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${activeView === 'organic' ? 'bg-blue-500 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                            >
                                <PieChartIcon className="w-4 h-4" />
                                全渠道情况
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- 1. 总览视图 --- */}
                {activeView === 'overview' && (
                    <>
                        {/* 关键指标卡片 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* 周度对比卡片 */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-bold text-slate-800">周度对比</h2>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">10.13-19</span>
                                        <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">10.20-26</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-600">总注册量</span>
                                            <span className={`text-xs font-medium ${totalOrganicWeek2 > totalOrganicWeek1 ? 'text-green-600' : 'text-red-600'}`}>
                                                {formatChangeRate(organicWoWChange)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-end mt-1">
                                            <span className="text-2xl font-bold text-slate-800">{formatLargeNumber(totalOrganicWeek1)}</span>
                                            <span className="text-2xl font-bold text-purple-600">{formatLargeNumber(totalOrganicWeek2)}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-600">投放渠道注册量</span>
                                            <span className={`text-xs font-medium ${totalPaidRegistrationsW2 > totalPaidRegistrationsW1 ? 'text-green-600' : 'text-red-600'}`}>
                                                {formatChangeRate(((totalPaidRegistrationsW2 - totalPaidRegistrationsW1) / totalPaidRegistrationsW1 * 100))}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-end mt-1">
                                            <span className="text-xl font-bold text-slate-800">{formatLargeNumber(totalPaidRegistrationsW1)}</span>
                                            <span className="text-xl font-bold text-purple-600">{formatLargeNumber(totalPaidRegistrationsW2)}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-600">其他注册量</span>
                                            <span className={`text-xs font-medium ${(totalOrganicWeek2 - totalPaidRegistrationsW2) > (totalOrganicWeek1 - totalPaidRegistrationsW1) ? 'text-green-600' : 'text-red-600'}`}>
                                                {formatChangeRate(((totalOrganicWeek2 - totalPaidRegistrationsW2) - (totalOrganicWeek1 - totalPaidRegistrationsW1)) / (totalOrganicWeek1 - totalPaidRegistrationsW1) * 100)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-end mt-1">
                                            <span className="text-xl font-bold text-slate-800">{formatLargeNumber(totalOrganicWeek1 - totalPaidRegistrationsW1)}</span>
                                            <span className="text-xl font-bold text-purple-600">{formatLargeNumber(totalOrganicWeek2 - totalPaidRegistrationsW2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* 付费渠道表现卡片 */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                                <h2 className="text-lg font-bold text-slate-800 mb-4">投放渠道表现</h2>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-600">平均注册成本</span>
                                            <span className={`text-xs font-medium ${(avgPaidRegCostW1 != null && avgPaidRegCostW2 != null && avgPaidRegCostW2 > avgPaidRegCostW1) ? 'text-red-600' : 'text-green-600'}`}>
                                                {(avgPaidRegCostW1 != null && avgPaidRegCostW2 != null && avgPaidRegCostW1 > 0) ? formatChangeRate(((avgPaidRegCostW2 - avgPaidRegCostW1) / avgPaidRegCostW1) * 100) : '-'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-end mt-1">
                                            <span className="text-2xl font-bold text-slate-800">
                                                {avgPaidRegCostW1 != null ? `¥${avgPaidRegCostW1.toFixed(2)}` : '-'}
                                            </span>
                                            <span className="text-2xl font-bold text-purple-600">
                                                {avgPaidRegCostW2 != null ? `¥${avgPaidRegCostW2.toFixed(2)}` : '-'}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-600">点击转化率</span>
                                            <span className={`text-xs font-medium ${(totalPaidClicksW2 / totalPaidImpressionsW2) > (totalPaidClicksW1 / totalPaidImpressionsW1) ? 'text-green-600' : 'text-red-600'}`}>
                                                {formatChangeRate(((totalPaidClicksW2 / totalPaidImpressionsW2) - (totalPaidClicksW1 / totalPaidImpressionsW1)) / (totalPaidClicksW1 / totalPaidImpressionsW1) * 100)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-end mt-1">
                                            <span className="text-xl font-bold text-slate-800">
                                                {formatPercent((totalPaidClicksW1 / totalPaidImpressionsW1) * 100)}
                                            </span>
                                            <span className="text-xl font-bold text-purple-600">
                                                {formatPercent((totalPaidClicksW2 / totalPaidImpressionsW2) * 100)}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-600">注册转化率</span>
                                            <span className={`text-xs font-medium ${(totalPaidRegistrationsW2 / totalPaidClicksW2) > (totalPaidRegistrationsW1 / totalPaidClicksW1) ? 'text-green-600' : 'text-red-600'}`}>
                                                {formatChangeRate(((totalPaidRegistrationsW2 / totalPaidClicksW2) - (totalPaidRegistrationsW1 / totalPaidClicksW1)) / (totalPaidRegistrationsW1 / totalPaidClicksW1) * 100)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-end mt-1">
                                            <span className="text-xl font-bold text-slate-800">
                                                {formatPercent((totalPaidRegistrationsW1 / totalPaidClicksW1) * 100)}
                                            </span>
                                            <span className="text-xl font-bold text-purple-600">
                                                {formatPercent((totalPaidRegistrationsW2 / totalPaidClicksW2) * 100)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* 渠道分类占比 (本周) - 替换版 - 占两列 */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 lg:col-span-2">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-slate-800">全渠道分类占比 (本周)</h2>
                                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                        总注册量: {totalOrganicWeek2.toLocaleString()}
                                    </div>
                                </div>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={categoryDataWeek2}
                                            cx="40%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={2}
                                            dataKey="value"
                                            label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`} // Simplified label
                                            labelLine={false} 
                                        >
                                            {categoryDataWeek2.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            formatter={(value, name) => [`${value.toLocaleString()} (${((value / totalOrganicWeek2) * 100).toFixed(1)}%)`, name]} // Add percentage to tooltip
                                            contentStyle={{ 
                                                backgroundColor: '#1e293b', 
                                                border: 'none', 
                                                borderRadius: '8px', 
                                                color: '#fff' 
                                            }}
                                            labelStyle={{ color: '#fff' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Legend 
                                            layout="vertical" 
                                            verticalAlign="middle" 
                                            align="right"
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        
                        {/* 渠道对比图表 */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* 付费渠道注册量对比 */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                                <h2 className="text-xl font-bold text-slate-800 mb-4">投放渠道注册量对比</h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart
                                        data={[...combinedPaidData].sort((a, b) => (b.week2_registrations ?? 0) - (a.week2_registrations ?? 0))} // Sort data here
                                        margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis 
                                            dataKey="channel" 
                                            angle={-45} 
                                            textAnchor="end" 
                                            height={60} 
                                            tick={{ fontSize: 12 }}
                                        />
                                        <YAxis tickFormatter={(value) => formatLargeNumber(value)} />
                                        <Tooltip content={<WoWTooltip metricKind="registrations" formatValue={(v) => v?.toLocaleString()} />} />
                                        <Legend />
                                        <Bar dataKey="week1_registrations" name="10.13-19" fill="#a78bfa" />
                                        <Bar dataKey="week2_registrations" name="10.20-26" fill="#3b82f6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            
                            {/* 渠道分类注册量对比 */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                                <h2 className="text-xl font-bold text-slate-800 mb-4">全渠道分类注册量对比</h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart
                                        data={[...combinedOrganicData].sort((a, b) => (b.week2_reg || 0) - (a.week2_reg || 0))}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis 
                                            dataKey="category" 
                                            angle={-45} 
                                            textAnchor="end" 
                                            height={60} 
                                            tick={{ fontSize: 12 }}
                                        />
                                        <YAxis tickFormatter={(value) => formatLargeNumber(value)} />
                                        <Tooltip content={<WoWTooltip metricKind="registrations" formatValue={(v) => v?.toLocaleString()} />} />
                                        <Legend />
                                        <Bar dataKey="week1_reg" name="10.13-19" fill="#a78bfa" />
                                        <Bar dataKey="week2_reg" name="10.20-26" fill="#3b82f6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        
                        {/* 关键洞察 */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                            <h2 className="text-xl font-bold text-slate-800 mb-4">关键洞察</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* 整体趋势 */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-bold text-blue-800 mb-2">整体趋势</h3>
                                            <ul className="space-y-2 text-sm text-blue-700 list-disc pl-4">
                                                <li>本周总注册量 <span className="font-semibold">{formatLargeNumber(totalOrganicWeek2)}</span>，相比上周 <span className={`font-semibold ${organicWoWChange > 0 ? 'text-green-600' : 'text-red-600'}`}>{formatChangeRate(organicWoWChange)}</span></li>
                                                <li>付费渠道注册量占比 <span className="font-semibold">{((paidVsOrganicWeek2[0].registrations / totalOrganicWeek2) * 100).toFixed(1)}%</span>，相比上周 <span className={`font-semibold ${((paidVsOrganicWeek2[0].registrations / totalOrganicWeek2) - (paidVsOrganicWeek1[0].registrations / totalOrganicWeek1)) > 0 ? 'text-green-600' : 'text-red-600'}`}>{formatChangeRate(((paidVsOrganicWeek2[0].registrations / totalOrganicWeek2) - (paidVsOrganicWeek1[0].registrations / totalOrganicWeek1)) / (paidVsOrganicWeek1[0].registrations / totalOrganicWeek1) * 100)}</span></li>
                                                <li>自然流量注册量占比 <span className="font-semibold">{((paidVsOrganicWeek2[1].registrations / totalOrganicWeek2) * 100).toFixed(1)}%</span>，相比上周 <span className={`font-semibold ${((paidVsOrganicWeek2[1].registrations / totalOrganicWeek2) - (paidVsOrganicWeek1[1].registrations / totalOrganicWeek1)) > 0 ? 'text-green-600' : 'text-red-600'}`}>{formatChangeRate(((paidVsOrganicWeek2[1].registrations / totalOrganicWeek2) - (paidVsOrganicWeek1[1].registrations / totalOrganicWeek1)) / (paidVsOrganicWeek1[1].registrations / totalOrganicWeek1) * 100)}</span></li>
                                                <li>本周总展现、点击、注册量都有明显上升，说明各渠道的产品推广都在稳步进行。然而总注册占总展现的比重有所下降，说明具体的投放和产品页面引导策略还需要优化。</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* 渠道表现 */}
                                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <TrendingUp className="w-5 h-5 text-slate-600 mt-1 flex-shrink-0" />
                                        <div className="w-full">
                                            <h3 className="font-bold text-slate-800 mb-3">渠道表现</h3>
                                            
                                            {/* 表现优异 */}
                                            <div className="mb-3">
                                                <h4 className="text-sm font-semibold text-green-700 mb-1">表现优异</h4>
                                                <ul className="space-y-1 text-sm text-slate-700 list-disc pl-4">
                                                    {getTopPerformers().map((p, idx) => (
                                                        <li key={idx}>
                                                            <span className="font-semibold">{p.channel}</span> {p.metric} <span className="font-semibold">{p.value}</span>
                                                            {p.wow != null && (
                                                                <span className={`ml-1 ${p.metric === '注册成本' ? (p.wow < 0 ? 'text-green-600' : 'text-red-600') : (p.wow > 0 ? 'text-green-600' : 'text-red-600')}`}>
                                                                    {p.wow >= 0 ? '+' : ''}{p.wow.toFixed(1)}%
                                                                </span>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            
                                            {/* 待优化项 */}
                                            <div>
                                                <h4 className="text-sm font-semibold text-red-700 mb-1">待优化项</h4>
                                                <ul className="space-y-1 text-sm text-slate-700 list-disc pl-4">
                                                    {getPoorPerformers().map((p, idx) => (
                                                        <li key={idx}>
                                                            <span className="font-semibold">{p.channel}</span> {p.metric} <span className="font-semibold">{p.value}</span>
                                                            {p.wow != null && (
                                                                <span className={`ml-1 ${p.metric === '注册成本' ? (p.wow > 0 ? 'text-red-600' : 'text-green-600') : (p.wow < 0 ? 'text-red-600' : 'text-green-600')}`}>
                                                                    {p.wow >= 0 ? '+' : ''}{p.wow.toFixed(1)}%
                                                                </span>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* --- 2. 投放渠道分析 (paid) --- */}
                {activeView === 'paid' && (
                    <>
                        <div className="bg-white rounded-xl shadow-lg p-4 border border-slate-200 mb-6">
                            <div className="flex gap-2 flex-wrap">
                                <button 
                                    onClick={() => setPaidDataView('week1')} 
                                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${paidDataView === 'week1' ? 'bg-blue-500 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                                >
                                    <Filter className="w-4 h-4" />
                                    10.13-19 (上周)
                                </button>
                                <button 
                                    onClick={() => setPaidDataView('week2')} 
                                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${paidDataView === 'week2' ? 'bg-blue-500 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                                >
                                    <Filter className="w-4 h-4" />
                                    10.20-26 (本周)
                                </button>
                                <button 
                                    onClick={() => setPaidDataView('comparison')} 
                                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${paidDataView === 'comparison' ? 'bg-blue-500 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                                >
                                    <BarChart2 className="w-4 h-4" />
                                    纵向对比
                                </button>
                            </div>
                        </div>

                        {/* --- A. 单周详情视图 (W1 或 W2) --- */}
                        {(paidDataView === 'week1' || paidDataView === 'week2') && (() => {
                            const dataForView = paidDataView === 'week1' ? paidChannelsWeek1 : paidChannelsWeek2;
                            const currentPaidWeekLabel = paidDataView === 'week1' ? '10.13-19' : '10.20-26';
                            const currentSearchEngines = dataForView.filter(ch => ch.type === '搜索引擎');
                            const currentAppStores = dataForView.filter(ch => ch.type === '应用商店');
                            const currentSearchTotal = currentSearchEngines.reduce((sum, ch) => sum + ch.registrations, 0);
                            const currentAppStoreTotal = currentAppStores.reduce((sum, ch) => sum + ch.registrations, 0);
                            
                            return (
                                <div className="space-y-6">
                                    {/* 搜索引擎渠道 */}
                                    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="text-xl font-bold text-slate-800">搜索引擎渠道 ({currentPaidWeekLabel})</h2>
                                            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                                总注册量: {currentSearchTotal.toLocaleString()}
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="text-lg font-semibold text-slate-700 mb-2">注册量分布</h3>
                                                <ResponsiveContainer width="100%" height={250}>
                                                    <BarChart data={[...currentSearchEngines].sort((a, b) => (b.registrations || 0) - (a.registrations || 0))}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                                        <XAxis dataKey="channel" stroke="#64748b" />
                                                        <YAxis stroke="#64748b" />
                                                        <Tooltip 
                                                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} 
                                                            labelStyle={{ color: '#fff' }}
                                                            itemStyle={{ color: '#fff' }}
                                                            formatter={(value) => [value.toLocaleString(), '# 注册']}
                                                        />
                                                        <Legend />
                                                        <Bar dataKey="registrations" fill="#3b82f6" name="# 注册" />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                            
                                            <div>
                                                <h3 className="text-lg font-semibold text-slate-700 mb-2">转化漏斗</h3>
                                                <div className="space-y-3">
                                                    {[...currentSearchEngines].sort((a, b) => (b.registrations || 0) - (a.registrations || 0)).map(ch => (
                                                        <div key={ch.channel} className="bg-slate-50 rounded-lg p-3">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <span className="font-medium text-slate-800">{ch.channel}</span>
                                                                <span className="text-sm font-semibold" style={{ color: getCostColor(ch.regCost) }}>
                                                                    ¥{ch.regCost?.toFixed(2)}
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
                                                                <span>点击转化: {formatPercent(ch.clickRate)}</span>
                                                                <span>注册转化: {formatPercent(ch.regRate)}</span>
                                                            </div>
                                                            <div className="w-full bg-slate-200 rounded-full h-2">
                                                                <div 
                                                                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500" 
                                                                    style={{ width: `${(ch.registrations / currentSearchTotal) * 100}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* 应用商店渠道 */}
                                    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="text-xl font-bold text-slate-800">应用商店渠道 ({currentPaidWeekLabel})</h2>
                                            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                                总注册量: {currentAppStoreTotal.toLocaleString()}
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="text-lg font-semibold text-slate-700 mb-2">注册量分布</h3>
                                                <ResponsiveContainer width="100%" height={250}>
                                                    <BarChart data={[...currentAppStores].sort((a, b) => (b.registrations || 0) - (a.registrations || 0))}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                                        <XAxis dataKey="channel" stroke="#64748b" />
                                                        <YAxis stroke="#64748b" />
                                                        <Tooltip 
                                                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} 
                                                            labelStyle={{ color: '#fff' }}
                                                            itemStyle={{ color: '#fff' }}
                                                            formatter={(value) => [value.toLocaleString(), '# 注册']}
                                                        />
                                                        <Legend />
                                                        <Bar dataKey="registrations" fill="#10b981" name="# 注册" />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                            
                                            <div>
                                                <h3 className="text-lg font-semibold text-slate-700 mb-2">转化漏斗</h3>
                                                <div className="space-y-3">
                                                    {[...currentAppStores].sort((a, b) => (b.registrations || 0) - (a.registrations || 0)).map(ch => (
                                                        <div key={ch.channel} className="bg-slate-50 rounded-lg p-3">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <span className="font-medium text-slate-800">{ch.channel}</span>
                                                                <span className="text-sm font-semibold" style={{ color: getCostColor(ch.regCost) }}>
                                                                    ¥{ch.regCost?.toFixed(2)}
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
                                                                <span>点击转化: {formatPercent(ch.clickRate)}</span>
                                                                <span>注册转化: {formatPercent(ch.regRate)}</span>
                                                            </div>
                                                            <div className="w-full bg-slate-200 rounded-full h-2">
                                                                <div 
                                                                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-teal-500" 
                                                                    style={{ width: `${(ch.registrations / currentAppStoreTotal) * 100}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* 详细数据表 */}
                                    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                                        <h2 className="text-xl font-bold text-slate-800 mb-4">投放渠道详细数据 ({currentPaidWeekLabel})</h2>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead className="bg-slate-100">
                                                    <tr>
                                                        <th className="px-4 py-3 text-left font-semibold text-slate-700">渠道</th>
                                                        <th className="px-4 py-3 text-right font-semibold text-slate-700"># 展现</th>
                                                        <th className="px-4 py-3 text-right font-semibold text-slate-700"># 点击</th>
                                                        <th className="px-4 py-3 text-right font-semibold text-slate-700">点击转化%</th>
                                                        <th className="px-4 py-3 text-right font-semibold text-slate-700"># 注册</th>
                                                        <th className="px-4 py-3 text-right font-semibold text-slate-700">注册转化%</th>
                                                        <th className="px-4 py-3 text-right font-semibold text-slate-700">注册成本</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {[...dataForView].sort((a, b) => b.registrations - a.registrations).map(ch => {
                                                        const benchmark = getBenchmarkForPaidChannel(ch);
                                                        return (
                                                            <tr key={ch.channel} className="border-t border-slate-200 hover:bg-slate-50">
                                                                <td className="px-4 py-3 font-bold text-slate-800">{ch.channel}</td>
                                                                <td className="px-4 py-3 text-right text-slate-600">{ch.impressions?.toLocaleString() ?? '-'}</td>
                                                                <td className="px-4 py-3 text-right text-slate-600">{ch.clicks?.toLocaleString() ?? '-'}</td>
                                                                <td className="px-4 py-3 text-right text-slate-600">
                                                                    {formatPercent(ch.clickRate)}
                                                                </td>
                                                                <td className="px-4 py-3 text-right text-slate-600">{ch.registrations?.toLocaleString() ?? '-'}</td>
                                                                <td className="px-4 py-3 text-right text-slate-600">
                                                                    {formatPercent(ch.regRate)}
                                                                </td>
                                                                <td className="px-4 py-3 text-right">
                                                                    <span className="font-semibold" style={{ color: getCostColor(ch.regCost) }}>
                                                                        {ch.regCost ? `¥${ch.regCost.toFixed(2)}` : '-'}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}

                        {/* --- B. 纵向对比视图 --- */}
                        {paidDataView === 'comparison' && (
                            <div className="space-y-6">
                                {/* 注册量对比 */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                                    <h2 className="text-xl font-bold text-slate-800 mb-4">投放渠道注册量对比</h2>
                                    <ResponsiveContainer width="100%" height={400}>
                                        <BarChart
                                            data={[...combinedPaidData].sort((a, b) => (b.week2_registrations || 0) - (a.week2_registrations || 0))}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                            <XAxis 
                                                dataKey="channel" 
                                                angle={-45} 
                                                textAnchor="end" 
                                                height={70} 
                                                tick={{ fontSize: 12 }}
                                            />
                                            <YAxis 
                                                tickFormatter={(value) => formatLargeNumber(value)}
                                            />
                                            <Tooltip content={<WoWTooltip metricKind="registrations" formatValue={(v) => v?.toLocaleString()} />} />
                                            <Legend />
                                            <Bar dataKey="week1_registrations" name="10.13-19" fill="#a78bfa" />
                                            <Bar dataKey="week2_registrations" name="10.20-26" fill="#3b82f6" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                
                                {/* 注册成本对比 */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                                    <h2 className="text-xl font-bold text-slate-800 mb-4">投放渠道注册成本对比</h2>
                                    <ResponsiveContainer width="100%" height={400}>
                                        <BarChart
                                            data={combinedPaidData.filter(item => item.week1_cost && item.week2_cost).sort((a, b) => (a.week2_cost || 0) - (b.week2_cost || 0))}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                            <XAxis 
                                                dataKey="channel" 
                                                angle={-45} 
                                                textAnchor="end" 
                                                height={70} 
                                                tick={{ fontSize: 12 }}
                                            />
                                            <YAxis 
                                                tickFormatter={(value) => `¥${value.toFixed(2)}`}
                                            />
                                            <Tooltip content={<WoWTooltip metricKind="cost" formatValue={(v) => v != null ? `¥${v.toFixed(2)}` : '-'} />} />
                                            <Legend />
                                            <Bar dataKey="week1_cost" name="10.13-19" fill="#f59e0b" />
                                            <Bar dataKey="week2_cost" name="10.20-26" fill="#ef4444" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                
                                {/* 转化率对比 */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* 点击转化率对比 */}
                                    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                                        <h2 className="text-xl font-bold text-slate-800 mb-4">点击转化率对比</h2>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <BarChart
                                                data={combinedPaidData.filter(item => item.week1_ctr && item.week2_ctr).sort((a, b) => (b.week2_ctr || 0) - (a.week2_ctr || 0))}
                                                margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                                <XAxis 
                                                    dataKey="channel" 
                                                    angle={-45} 
                                                    textAnchor="end" 
                                                    height={70} 
                                                    tick={{ fontSize: 12 }}
                                                />
                                                <YAxis 
                                                    tickFormatter={formatAxisPercent}
                                                />
                                                <Tooltip content={<WoWTooltip metricKind="cvr" formatValue={(v) => formatPercent(v)} />} />
                                                <Legend />
                                                <Bar dataKey="week1_ctr" name="10.13-19" fill="#a78bfa" />
                                                <Bar dataKey="week2_ctr" name="10.20-26" fill="#8b5cf6" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    
                                    {/* 注册转化率对比 */}
                                    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                                        <h2 className="text-xl font-bold text-slate-800 mb-4">注册转化率对比</h2>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <BarChart
                                                data={combinedPaidData.filter(item => item.week1_regrate && item.week2_regrate).sort((a, b) => (b.week2_regrate || 0) - (a.week2_regrate || 0))}
                                                margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                                <XAxis 
                                                    dataKey="channel" 
                                                    angle={-45} 
                                                    textAnchor="end" 
                                                    height={70} 
                                                    tick={{ fontSize: 12 }}
                                                />
                                                <YAxis 
                                                    tickFormatter={formatAxisPercent}
                                                />
                                                <Tooltip content={<WoWTooltip metricKind="cvr" formatValue={(v) => formatPercent(v)} />} />
                                                <Legend />
                                                <Bar dataKey="week1_regrate" name="10.13-19" fill="#a78bfa" />
                                                <Bar dataKey="week2_regrate" name="10.20-26" fill="#8b5cf6" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                
                                {/* 详细对比表 */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                                    <h2 className="text-xl font-bold text-slate-800 mb-4">投放渠道纵向对比详细数据</h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead className="bg-slate-100">
                                                <tr>
                                                    <th rowSpan="2" className="px-4 py-3 text-left font-semibold text-slate-700 border-b border-slate-300">渠道</th>
                                                    <th colSpan="3" className="px-4 py-3 text-center font-semib<td text-slate-700 border-b border-slate-300"># 注册</th>
                                                    <th colSpan="3" className="px-4 py-3 text-center font-semibold text-slate-700 border-b border-slate-300">注册成本</th>
                                                    <th colSpan="2" className="px-4 py-3 text-center font-semibold text-slate-700 border-b border-slate-300">点击转化%</th>
                                                    <th colSpan="2" className="px-4 py-3 text-center font-semibold text-slate-700 border-b border-slate-300">注册转化%</th>
                                                </tr>
                                                <tr className="bg-slate-50">
                                                    <th className="px-4 py-2 text-right font-medium text-slate-600">10.13-19</th>
                                                    <th className="px-4 py-2 text-right font-medium text-slate-600">10.20-26</th>
                                                    <th className="px-4 py-2 text-right font-medium text-slate-600">变化率</th>
                                                    <th className="px-4 py-2 text-right font-medium text-slate-600">10.13-19</th>
                                                    <th className="px-4 py-2 text-right font-medium text-slate-600">10.20-26</th>
                                                    <th className="px-4 py-2 text-right font-medium text-slate-600">变化值</th>
                                                    <th className="px-4 py-2 text-right font-medium text-slate-600">10.13-19</th>
                                                    <th className="px-4 py-2 text-right font-medium text-slate-600">10.20-26</th>
                                                    <th className="px-4 py-2 text-right font-medium text-slate-600">10.13-19</th>
                                                    <th className="px-4 py-2 text-right font-medium text-slate-600">10.20-26</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {combinedPaidData.sort((a,b) => b.week2_registrations - a.week2_registrations).map(ch => {
                                                    const regChangeColor = getChangeColor(ch.registrationsChange.rate);
                                                    const costChangeColor = ch.costChange.value > 0 ? 'text-red-600' : ch.costChange.value < 0 ? 'text-green-600' : 'text-slate-600';
                                                    const benchmark = getBenchmarkForPaidChannel(ch);
                                                    
                                                    return (
                                                        <tr key={ch.channel} className="border-t border-slate-200 hover:bg-slate-50">
                                                            <td className="px-4 py-3 font-bold text-slate-800">{ch.channel}</td>
                                                            <td className="px-4 py-3 text-right text-slate-600">{ch.week1_registrations?.toLocaleString() ?? '-'}</td>
                                                            <td className="px-4 py-3 text-right text-slate-600">{ch.week2_registrations?.toLocaleString() ?? '-'}</td>
                                                            <td className={`px-4 py-3 text-right font-semibold ${regChangeColor}`}>
                                                                <div className="flex items-center justify-end gap-1">
                                                                    {getChangeIcon(ch.registrationsChange.rate)}
                                                                    {formatChangeRate(ch.registrationsChange.rate)}
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3 text-right font-semibold" style={{ color: getCostColor(ch.week1_cost) }}>
                                                                {ch.week1_cost ? `¥${ch.week1_cost.toFixed(2)}` : '-'}
                                                            </td>
                                                            <td className="px-4 py-3 text-right font-semibold" style={{ color: getCostColor(ch.week2_cost) }}>
                                                                {ch.week2_cost ? `¥${ch.week2_cost.toFixed(2)}` : '-'}
                                                            </td>
                                                            <td className={`px-4 py-3 text-right font-semibold ${costChangeColor}`}>
                                                                <div className="flex items-center justify-end gap-1">
                                                                    {getChangeIcon(ch.costChange.value)}
                                                                    {ch.costChange.value ? (ch.costChange.value >= 0 ? '+' : '') + ch.costChange.value.toFixed(2) : '-'}
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3 text-right text-slate-600">
                                                                {formatPercent(ch.week1_ctr)}
                                                            </td>
                                                            <td className="px-4 py-3 text-right text-slate-600">
                                                                {formatPercent(ch.week2_ctr)}
                                                            </td>
                                                            <td className="px-4 py-3 text-right text-slate-600">
                                                                {formatPercent(ch.week1_regrate)}
                                                            </td>
                                                            <td className="px-4 py-3 text-right text-slate-600">
                                                                {formatPercent(ch.week2_regrate)}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* 关键洞察 */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                                    <h2 className="text-xl font-bold text-slate-800 mb-4">关键洞察 (纵向对比)</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <div className="flex items-start gap-3">
                                                <TrendingUp className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-bold text-blue-800 mb-2"># 注册 变化 (WoW)</h3>
                                                    <ul className="space-y-1 text-sm text-blue-700 list-disc pl-4">
                                                        <li><span className="font-semibold">主要增长:</span> OPPO <span className={getChangeColor(41.5)}>(+41.5%)</span>, 荣耀 <span className={getChangeColor(27.4)}>(+27.4%)</span>, vivo <span className={getChangeColor(17.0)}>(+17.0%)</span></li>
                                                        <li><span className="font-semibold">稳定增长:</span> 谷歌 <span className={getChangeColor(9.2)}>(+9.2%)</span>, 小米 <span className={getChangeColor(9.1)}>(+9.1%)</span>, 苹果 <span className={getChangeColor(10.3)}>(+10.3%)</span></li>
                                                        <li><span className="font-semibold">轻微下滑:</span> 百度 <span className={getChangeColor(-1.9)}>(-1.9%)</span>, 360 <span className={getChangeColor(-4.6)}>(-4.6%)</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                            <div className="flex items-start gap-3">
                                                <DollarSign className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-bold text-purple-800 mb-2">成本与效率 (WoW)</h3>
                                                    <ul className="space-y-1 text-sm text-purple-700 list-disc pl-4">
                                                        <li><span className="font-semibold">成本标杆:</span> Bing成本持续优化(¥4.70), 注册转化率12.25%</li>
                                                        <li><span className="font-semibold">成本恶化:</span> 谷歌成本飙升(¥13.09, <span className="text-red-600 font-semibold">+88%</span>); 小米成本升至¥9.09 (<span className="text-red-600 font-semibold">+63%</span>)</li>
                                                        <li><span className="font-semibold">高注册转化率:</span> 谷歌(20.61%), 苹果(17.34%)</li>
                                                        <li><span className="font-semibold">低注册转化率:</span> 百度(4.22%), 360(3.79%), 荣耀(5.69%), 华为(6.93%)</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* --- 3. 渠道分类分析 (organic) --- */}
                {activeView === 'organic' && (
                    <>
                        <div className="bg-white rounded-xl shadow-lg p-4 border border-slate-200">
                            <div className="flex gap-2 flex-wrap">
                                <button 
                                    onClick={() => setOrganicDataView('week1')} 
                                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${organicDataView === 'week1' ? 'bg-blue-500 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                                >
                                    <Filter className="w-4 h-4" />
                                    10.13-19 (上周)
                                </button>
                                <button 
                                    onClick={() => setOrganicDataView('week2')} 
                                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${organicDataView === 'week2' ? 'bg-blue-500 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                                >
                                    <Filter className="w-4 h-4" />
                                    10.20-26 (本周)
                                </button>
                                <button 
                                    onClick={() => setOrganicDataView('comparison')} 
                                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${organicDataView === 'comparison' ? 'bg-blue-500 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                                >
                                    <BarChart2 className="w-4 h-4" />
                                    综合对比
                                </button>
                            </div>
                        </div>
                        
                        {/* 综合对比视图 */}
                        {organicDataView === 'comparison' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                                    <h2 className="text-xl font-bold text-slate-800 mb-4">渠道分类周度对比 (# 注册)</h2>
                                    <ResponsiveContainer width="100%" height={400}>
                                        <BarChart 
                                            data={[...combinedOrganicData].sort((a, b) => (b.week2_reg || 0) - (a.week2_reg || 0))} 
                                            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                            <XAxis 
                                                dataKey="category" 
                                                angle={-45} 
                                                textAnchor="end" 
                                                height={70} 
                                                tick={{ fontSize: 12 }}
                                            />
                                            <YAxis 
                                                tickFormatter={(value) => formatLargeNumber(value)}
                                            />
                                            <Tooltip content={<WoWTooltip metricKind="registrations" formatValue={(v) => v?.toLocaleString()} />} />
                                            <Legend />
                                            <Bar dataKey="week1_reg" name="10.13-19" fill="#a78bfa" />
                                            <Bar dataKey="week2_reg" name="10.20-26" fill="#3b82f6" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                
                                {/* 详细对比表 */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                                    <h2 className="text-xl font-bold text-slate-800 mb-4">渠道分类周度对比详细数据</h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm border-collapse">
                                            <thead className="bg-slate-100">
                                                <tr>
                                                    <th rowSpan="2" className="px-4 py-3 text-left font-semibold text-slate-700 border-b border-slate-300 align-bottom">渠道分类</th>
                                                    <th colSpan="3" className="px-4 py-3 text-center font-semibold text-slate-700 border-b border-r-2 border-slate-300"># 注册</th>
                                                    <th colSpan="5" className="px-4 py-3 text-center font-semibold text-slate-700 border-b border-slate-300">10.20-26 (本周) 详细指标</th>
                                                </tr>
                                                <tr className="bg-slate-50">
                                                    <th className="px-4 py-2 text-right font-medium text-slate-600">上周</th>
                                                    <th className="px-4 py-2 text-right font-medium text-slate-600">本周</th>
                                                    <th className="px-4 py-2 text-right font-medium text-slate-600 border-r-2 border-slate-300">变化率</th>
                                                    <th className="px-4 py-2 text-right font-medium text-slate-600"># 展现</th>
                                                    <th className="px-4 py-2 text-right font-medium text-slate-600"># 点击</th>
                                                    <th className="px-4 py-2 text-right font-medium text-slate-600">点击转化%</th>
                                                    <th className="px-4 py-2 text-right font-medium text-slate-600">注册转化%</th>
                                                    <th className="px-4 py-2 text-right font-medium text-slate-600">注册成本</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {combinedOrganicData.map(ch => {
                                                    const change = ch.week2_reg - ch.week1_reg;
                                                    const changeRate = ch.week1_reg !== 0 ? (change / ch.week1_reg * 100) : (ch.week2_reg > 0 ? Infinity : 0);
                                                    const changeRateColor = change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-slate-600';
                                                    
                                                    return (
                                                        <tr key={ch.category} className="border-t border-slate-200 hover:bg-slate-50">
                                                            <td className="px-4 py-3 font-bold text-slate-800">{ch.category}</td>
                                                            <td className="px-4 py-3 text-right text-slate-600">{ch.week1_reg?.toLocaleString() ?? '-'}</td>
                                                            <td className="px-4 py-3 text-right text-slate-600">{ch.week2_reg?.toLocaleString() ?? '-'}</td>
                                                            <td className={`px-4 py-3 text-right font-semibold border-r-2 border-slate-300 ${changeRateColor}`}>
                                                                <div className="flex items-center justify-end gap-1">
                                                                    {getChangeIcon(changeRate)}
                                                                    {formatChangeRate(changeRate)}
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3 text-right text-slate-600">{ch.impressions_w2?.toLocaleString() ?? '-'}</td>
                                                            <td className="px-4 py-3 text-right text-slate-600">{ch.clicks_w2?.toLocaleString() ?? '-'}</td>
                                                            <td className="px-4 py-3 text-right text-slate-600">{formatPercent(ch.clickRate_w2)}</td>
                                                            <td className="px-4 py-3 text-right text-slate-600">{formatPercent(ch.regRate_w2)}</td>
                                                            <td className="px-4 py-3 text-right font-semibold" style={{ color: getCostColor(ch.regCost_w2) }}>
                                                                {ch.regCost_w2 ? `¥${ch.regCost_w2.toFixed(2)}` : '-'}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                                <tr className="border-t-2 border-slate-300 bg-slate-100 font-bold">
                                                    <td className="px-4 py-3 text-left text-slate-800">总计</td>
                                                    <td className="px-4 py-3 text-right text-slate-800">{totalOrganicWeek1.toLocaleString()}</td>
                                                    <td className="px-4 py-3 text-right text-slate-800">{totalOrganicWeek2.toLocaleString()}</td>
                                                    <td className={`px-4 py-3 text-right font-semibold border-r-2 border-slate-300 ${organicWoWChange >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                                                        <div className="flex items-center justify-end gap-1">
                                                            {getChangeIcon(organicWoWChange)}
                                                            {formatChangeRate(organicWoWChange)}
                                                        </div>
                                                    </td>
                                                    <td colSpan="5" className="px-4 py-3 text-center text-slate-400">-- 本周详细指标合计无直接意义 --</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">* 部分渠道成本数据缺失或为估算值。</p>
                                </div>
                                
                                {/* 关键洞察 */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                                    <h2 className="text-xl font-bold text-slate-800 mb-4">渠道分类关键洞察</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <div className="flex items-start gap-3">
                                                <TrendingUp className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-bold text-blue-800 mb-2">增长亮点</h3>
                                                    <ul className="space-y-1 text-sm text-blue-700 list-disc pl-4">
                                                        <li><span className="font-semibold">移动应用投放</span> 增长最显著 <span className="text-green-600 font-semibold">+13,570</span> 注册，占比提升至 54.4%</li>
                                                        <li><span className="font-semibold">广告PC投放</span> 稳定增长 <span className="text-green-600 font-semibold">+1,070</span> 注册</li>
                                                        <li><span className="font-semibold">自然流量</span> 持续增长 <span className="text-green-600 font-semibold">+811</span> 注册，SEO效果显现</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                            <div className="flex items-start gap-3">
                                                <TrendingDown className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-bold text-red-800 mb-2">下滑关注</h3>
                                                    <ul className="space-y-1 text-sm text-red-700 list-disc pl-4">
                                                        <li><span className="font-semibold">活动获客</span> 大幅下滑 <span className="text-red-600 font-semibold">-3,854</span> 注册 (-31.4%)，需排查活动效果</li>
                                                        <li><span className="font-semibold">海外</span> 下滑 <span className="text-red-600 font-semibold">-1,604</span> 注册 (-16.6%)，需关注海外市场策略</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                            <div className="flex items-start gap-3">
                                                <DollarSign className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-bold text-green-800 mb-2">成本效率</h3>
                                                    <ul className="space-y-1 text-sm text-green-700 list-disc pl-4">
                                                        <li><span className="font-semibold">活动获客</span> 成本最优 (¥7.00)，转化率最高 (21.09%)</li>
                                                        <li><span className="font-semibold">移动应用投放</span> 规模最大但成本适中 (¥9.94)</li>
                                                        <li><span className="font-semibold">广告PC投放</span> 成本控制良好 (¥9.51)</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                            <div className="flex items-start gap-3">
                                                <AlertCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-bold text-purple-800 mb-2">优化建议</h3>
                                                    <ul className="space-y-1 text-sm text-purple-700 list-disc pl-4">
                                                        <li>加强<span className="font-semibold">活动获客</span>投入，复制成功经验</li>
                                                        <li>优化<span className="font-semibold">海外渠道</span>投放策略，提升转化效果</li>
                                                        <li>持续投入<span className="font-semibold">自然流量</span>建设，降低获客成本</li>
                                                        <li>关注<span className="font-semibold">高校SSO</span>潜力，精准获客</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 单周视图 (Week 1 或 Week 2) */}
                        {organicDataView !== 'comparison' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* 渠道分类占比 */}
                                    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="text-xl font-bold text-slate-800">渠道分类占比 ({organicDataView === 'week1' ? '10.13-19' : '10.20-26'})</h2>
                                            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                                总注册量: {currentTotalOrganic.toLocaleString()}
                                            </div>
                                        </div>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <PieChart>
                                                <Pie
                                                    data={currentCategoryData}
                                                    cx="40%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={100}
                                                    paddingAngle={2}
                                                    dataKey="value"
                                                    label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`} // Simplified label
                                                    labelLine={false} 
                                                >
                                                    {currentCategoryData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip 
                                                     formatter={(value, name) => [`${value.toLocaleString()} (${((value / currentTotalOrganic) * 100).toFixed(1)}%)`, name]} // Add percentage to tooltip
                                                    contentStyle={{ 
                                                        backgroundColor: '#1e293b', 
                                                        border: 'none', 
                                                        borderRadius: '8px', 
                                                        color: '#fff' 
                                                    }}
                                                    labelStyle={{ color: '#fff' }}
                                                    itemStyle={{ color: '#fff' }}
                                                />
                                                <Legend 
                                                    layout="vertical" 
                                                    verticalAlign="middle" 
                                                    align="right"
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    
                                    {/* 各分类详细数据 */}
                                    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                                        <h2 className="text-xl font-bold text-slate-800 mb-4">各分类详细数据 (# 注册)</h2>
                                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                                            {[...currentOrganicData].sort((a, b) => (b.registrations ?? 0) - (a.registrations ?? 0)).map(ch => (
                                                <div key={ch.category} className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="font-bold text-slate-800">{ch.category}</span>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ch.type === 'paid' ? 'bg-blue-100 text-blue-700' : ch.type === 'organic' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                                                            {ch.type === 'paid' ? '付费' : ch.type === 'organic' ? '自然' : '其他'}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-end">
                                                        <div>
                                                            <div className="text-2xl font-bold text-slate-800">{ch.registrations?.toLocaleString() ?? '-'}</div>
                                                            <div className="text-xs text-slate-500"># 注册</div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-xl font-bold" style={{ color: ch.color }}>{ch.percentage}%</div>
                                                            <div className="text-xs text-slate-500">占比</div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 bg-slate-200 rounded-full h-2 overflow-hidden">
                                                        <div 
                                                            className="h-full rounded-full transition-all" 
                                                            style={{ width: `${ch.percentage}%`, backgroundColor: ch.color }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Top 3 渠道 */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                                    <h2 className="text-xl font-bold text-slate-800 mb-4">Top 3 # 注册 渠道</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {[...currentOrganicData].sort((a, b) => (b.registrations ?? 0) - (a.registrations ?? 0)).slice(0, 3).map((ch, index) => (
                                            <div key={ch.category} className="rounded-xl p-6 text-white shadow-lg" style={{ backgroundColor: ch.color }}>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-lg font-bold">{ch.category}</span>
                                                    <span className="text-5xl font-bold opacity-80">#{index + 1}</span>
                                                </div>
                                                <div className="text-4xl font-bold mb-1">{ch.registrations?.toLocaleString() ?? '-'}</div>
                                                <div className="text-sm opacity-90">占比 {ch.percentage}%</div>
                                                {organicDataView === 'week2' && ch.regCost && (
                                                    <div className="text-sm opacity-90 mt-2">注册成本: ¥{ch.regCost.toFixed(2)}</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* W2 详细数据表 */}
                                {organicDataView === 'week2' && (
                                    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                                        <h2 className="text-xl font-bold text-slate-800 mb-4">本周 (10.20-26) 详细指标</h2>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead className="bg-slate-100">
                                                    <tr>
                                                        <th className="px-4 py-3 text-left font-semibold text-slate-700">渠道分类</th>
                                                        <th className="px-4 py-3 text-right font-semibold text-slate-700"># 展现</th>
                                                        <th className="px-4 py-3 text-right font-semibold text-slate-700"># 点击</th>
                                                        <th className="px-4 py-3 text-right font-semibold text-slate-700">点击转化%</th>
                                                        <th className="px-4 py-3 text-right font-semibold text-slate-700"># 注册</th>
                                                        <th className="px-4 py-3 text-right font-semibold text-slate-700">注册转化%</th>
                                                        <th className="px-4 py-3 text-right font-semibold text-slate-700">注册成本</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {organicChannelsWeek2.sort((a, b) => b.registrations - a.registrations).map(ch => (
                                                        <tr key={ch.category} className="border-t border-slate-200 hover:bg-slate-50">
                                                            <td className="px-4 py-3 font-bold text-slate-800">{ch.category}</td>
                                                            <td className="px-4 py-3 text-right text-slate-600">{ch.impressions?.toLocaleString() ?? '-'}</td>
                                                            <td className="px-4 py-3 text-right text-slate-600">{ch.clicks?.toLocaleString() ?? '-'}</td>
                                                            <td className="px-4 py-3 text-right text-slate-600">{formatPercent(ch.clickRate)}</td>
                                                            <td className="px-4 py-3 text-right text-slate-600">{ch.registrations.toLocaleString()}</td>
                                                            <td className="px-4 py-3 text-right text-slate-600">{formatPercent(ch.regRate)}</td>
                                                            <td className="px-4 py-3 text-right font-semibold" style={{ color: getCostColor(ch.regCost) }}>
                                                                {ch.regCost ? `¥${ch.regCost.toFixed(2)}` : '-'}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-2">* 部分渠道成本数据缺失或为估算值。</p>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        <div className="text-center text-xs text-slate-500 pt-4">
                            注意：渠道分类数据中，部分渠道成本数据缺失或为估算值。
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default App;
