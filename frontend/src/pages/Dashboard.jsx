import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy, Users, Target, Zap, Clock, Calendar,
  TrendingUp, TrendingDown, Minus, Award,
  ChevronRight, ArrowUpRight, History, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import "@/components/ui/ui.css";

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [filter, setFilter] = useState("30D");
  const [stats, setStats] = useState({
    joined: 12,
    matches: 48,
    wins: 28,
    losses: 15,
    draws: 5,
    winRate: "58.3%",
    rating: 1940,
    ratingChange: +98,
    avgDuration: "24m",
    bestResult: "Winner - Open Blitz 2024",
    whiteStats: { wins: 18, total: 25, percentage: 72 },
    blackStats: { wins: 10, total: 23, percentage: 43 }
  });

  useEffect(() => {
    const user = localStorage.getItem("userData");
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  const kpis = [
    { label: "Joined Tournaments", value: stats.joined, icon: Trophy, color: "text-blue-600" },
    { label: "Matches Played", value: stats.matches, icon: History, color: "text-purple-600" },
    { label: "Win Rate", value: stats.winRate, icon: TrendingUp, color: "text-green-600" },
    { label: "Current Rating", value: stats.rating, icon: Target, color: "text-yellow-600", secondary: `+${stats.ratingChange} from last month` },
  ];

  const recentMatches = [
    { opponent: "MagnusC", result: "Win", date: "2 hours ago", color: "White", accuracy: "92%", elo: "+12" },
    { opponent: "Hikaru1", result: "Loss", date: "Yesterday", color: "Black", accuracy: "88%", elo: "-8" },
    { opponent: "Pragg_05", result: "Draw", date: "Feb 20", color: "White", accuracy: "91%", elo: "+1" },
  ];

  // Chart Data based on user request
  const chartData = {
    labels: ['Feb 01', 'Feb 07', 'Feb 14', 'Feb 21', 'Today'],
    datasets: [
      {
        fill: true,
        label: 'Rating',
        data: [1840, 1870, 1860, 1900, 1890, 1920, 1940], // Extended for visual curve
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1f2937',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        displayColors: false,
        callbacks: {
          label: (context) => `Rating: ${context.parsed.y}`
        }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        min: 1800,
        max: 2000,
        ticks: { stepSize: 50 },
        border: { dash: [4, 4] }
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-10 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Player Intelligence</h1>
          <p className="text-lg text-gray-500 mt-1">Strategic overview for {userData?.name || "Player"}</p>
        </div>
        <Button
          onClick={() => navigate("/")}
          className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all text-base font-bold flex items-center gap-2"
        >
          Join New Tournament <ArrowUpRight size={18} />
        </Button>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-8">
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-2xl ${kpi.color.replace('text-', 'bg-').replace('600', '100')}`}>
                  <kpi.icon size={24} className={kpi.color} />
                </div>
                {kpi.secondary && (
                  <Badge className="bg-green-50 text-green-700 border-none font-bold text-xs uppercase tracking-wider px-2">
                    {kpi.secondary}
                  </Badge>
                )}
              </div>
              <div className="mt-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{kpi.label}</p>
                <h3 className="text-3xl font-black mt-1 text-gray-900">{kpi.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Rating Progress Graph */}
        <Card className="lg:col-span-3 border-none shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-white">
            <div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <TrendingUp size={22} className="text-blue-600" />
                Rating Progress
              </CardTitle>
              <CardDescription>Mastery evolution over time</CardDescription>
            </div>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              {["7D", "30D", "6M", "1Y"].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${filter === t ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="pt-6 h-[350px]">
            <Line data={chartData} options={chartOptions} />
          </CardContent>
        </Card>

        {/* Side Stats */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-gray-900 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target size={18} className="text-yellow-400" />
                Color Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-white"></div> White</span>
                  <span className="font-bold">{stats.whiteStats.percentage}% Win Rate</span>
                </div>
                <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-white transition-all duration-1000" style={{ width: `${stats.whiteStats.percentage}%` }}></div>
                </div>
                <p className="text-[10px] text-gray-500 uppercase font-black">{stats.whiteStats.wins} Wins / {stats.whiteStats.total} Games</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gray-400"></div> Black</span>
                  <span className="font-bold">{stats.blackStats.percentage}% Win Rate</span>
                </div>
                <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-400 transition-all duration-1000" style={{ width: `${stats.blackStats.percentage}%` }}></div>
                </div>
                <p className="text-[10px] text-gray-500 uppercase font-black">{stats.blackStats.wins} Wins / {stats.blackStats.total} Games</p>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-xl relative overflow-hidden group">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-xs mb-1">
                    <Zap size={14} />
                    PRO INSIGHT
                  </div>
                  <p className="text-xs text-blue-100 leading-relaxed italic z-10 relative">
                    "Your aggression with Black is paying off. 68% of your wins come from Counter-Gambits."
                  </p>
                  <div className="absolute -right-4 -bottom-4 opacity-10 transform scale-150 rotate-12 transition-transform group-hover:rotate-0">
                    <Target size={60} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 pb-2">
                {[
                  { label: "Blitz King", color: "bg-blue-100 text-blue-700", status: "Unlocked" },
                  { label: "10-Win Streak", color: "bg-yellow-100 text-yellow-700", status: "Unlocked" },
                  { label: "Master Class", color: "bg-purple-100 text-purple-700", status: "Unlocked" },
                  { label: "Grandmaster", color: "bg-gray-100 text-gray-400", status: "Locked" }
                ].map((badge, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all group cursor-help ${badge.status === 'Locked' ? "bg-gray-50 border-gray-100 opacity-60 grayscale" : "bg-white border-blue-50 shadow-sm hover:border-blue-200"}`}
                  >
                    <Award size={20} className={badge.status === 'Locked' ? "text-gray-300" : "text-blue-600"} />
                    <span className={`text-[10px] font-black uppercase text-center ${badge.status === 'Locked' ? "text-gray-400" : "text-gray-700"}`}>{badge.label}</span>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full text-xs text-blue-600 font-bold hover:bg-blue-50">VIEW GALLERY</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Match History */}
      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between bg-white border-b border-gray-100">
          <div>
            <CardTitle className="text-xl font-bold">Combat Records</CardTitle>
            <CardDescription>Comprehensive engagement history</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="font-bold border-gray-200 hover:bg-gray-50">
            Export Analytics
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] text-gray-400 font-black uppercase tracking-widest bg-gray-50/50">
                  <th className="py-5 pl-8">Opponent</th>
                  <th className="py-5">Position</th>
                  <th className="py-5">Outcome</th>
                  <th className="py-5">Accuracy</th>
                  <th className="py-5">Δ Rating</th>
                  <th className="py-5 pr-8 text-right">Operation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentMatches.map((match, i) => (
                  <tr key={i} className="hover:bg-blue-50/30 transition-all group">
                    <td className="py-6 pl-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center font-bold text-gray-600">
                          {match.opponent[0]}
                        </div>
                        <span className="font-bold text-gray-900">{match.opponent}</span>
                      </div>
                    </td>
                    <td className="py-6">
                      <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md border ${match.color === 'White' ? 'bg-white border-gray-200 text-gray-700' : 'bg-gray-900 border-gray-900 text-white'}`}>
                        {match.color}
                      </span>
                    </td>
                    <td className="py-6">
                      <div className={`flex items-center gap-1.5 font-black text-sm uppercase ${match.result === 'Win' ? 'text-green-600' : match.result === 'Loss' ? 'text-red-500' : 'text-gray-400'}`}>
                        {match.result === 'Win' && <ArrowUpRight size={14} />}
                        {match.result}
                      </div>
                    </td>
                    <td className="py-6 font-mono font-bold text-gray-600">{match.accuracy}</td>
                    <td className="py-6 font-bold">
                      <span className={match.elo.includes('+') ? 'text-green-600' : 'text-red-500'}>{match.elo}</span>
                    </td>
                    <td className="py-6 pr-8 text-right">
                      <Button className="bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg px-4 py-2 text-xs font-black uppercase transition-all shadow-none">
                        Review Match
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-gray-100 bg-gray-50/30 flex justify-center">
            <Button variant="ghost" className="text-gray-400 font-bold text-sm tracking-tight hover:text-gray-600">
              Load Full Match History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
