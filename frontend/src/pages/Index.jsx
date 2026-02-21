import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
    Crown,
    Users,
    Trophy,
    Settings,
    Award,
    Target,
    Shield,
    Zap,
    Calendar,
    Clock,
    MapPin,
} from "lucide-react";

import "@/components/ui/ui.css"; // Ensure styles are loaded

const Index = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [tournaments, setTournaments] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [stats, setStats] = useState({
        totalTournaments: 0,
        activeTournaments: 0,
        totalPlayers: 0,
        upcomingTournaments: 0,
        completedTournaments: 0,
    });

    // Load data on component mount and when localStorage changes
    useEffect(() => {
        loadTournaments();
        checkLoginStatus();

        // Add event listener for localStorage changes
        const handleStorageChange = (e) => {
            if (e.key === "tournaments") {
                loadTournaments();
            }
            if (e.key === "userData") {
                checkLoginStatus();
            }
        };

        const handleAuthChange = () => checkLoginStatus();

        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("authChange", handleAuthChange);

        // Cleanup event listener
        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("authChange", handleAuthChange);
        };
    }, []);

    const checkLoginStatus = () => {
        const user = localStorage.getItem("userData");
        setIsLoggedIn(!!user);
    };

    // Also reload data when the component comes back into view
    useEffect(() => {
        const handleFocus = () => {
            loadTournaments();
            checkLoginStatus();
        };

        window.addEventListener("focus", handleFocus);

        return () => {
            window.removeEventListener("focus", handleFocus);
        };
    }, []);

    const loadTournaments = () => {
        // Load tournaments from localStorage and hardcoded data
        const savedTournaments = JSON.parse(
            localStorage.getItem("tournaments") || "[]"
        );
        const allTournaments = savedTournaments;
        setTournaments(allTournaments);

        // Calculate stats
        const totalTournaments = allTournaments.length;
        const activeTournaments = allTournaments.filter(
            (t) => t.status === "active"
        ).length;
        const upcomingTournaments = allTournaments.filter(
            (t) => t.status === "upcoming"
        ).length;
        const completedTournaments = allTournaments.filter(
            (t) => t.status === "completed"
        ).length;

        // For players, we'll calculate based on tournament data
        const totalPlayers = allTournaments.reduce(
            (sum, tournament) => sum + (tournament.players || 0),
            0
        );

        setStats({
            totalTournaments,
            activeTournaments,
            totalPlayers,
            upcomingTournaments,
            completedTournaments,
        });
    };

    // Get featured tournaments (up to 3)
    const featuredTournaments = tournaments.slice(0, 3).map((tournament) => ({
        id: tournament.id,
        title: tournament.name,
        description: `${tournament.format} tournament`,
        players: tournament.players,
        prize: "Prizes Available",
        status: tournament.status,
        date: tournament.startDate,
        location: tournament.location,
        googleMapsLink: tournament.googleMapsLink,
        rating: "Open",
        image: "🏆",
    }));

    const statCards = [
        {
            icon: Trophy,
            label: "Total Tournaments",
            value: stats.totalTournaments,
            change: `${stats.totalTournaments > 10 ? "+" : ""}${stats.totalTournaments - 10
                } from last month`,
            color: "text-yellow-600",
        },
        {
            icon: Clock,
            label: "Active Tournaments",
            value: stats.activeTournaments,
            change: `${stats.activeTournaments > 2 ? "+" : ""}${stats.activeTournaments - 2
                } from last month`,
            color: "text-blue-600",
        },

        {
            icon: Calendar,
            label: "Upcoming Tournaments",
            value: stats.upcomingTournaments,
            change:
                stats.upcomingTournaments === 2
                    ? "Same as last month"
                    : `${stats.upcomingTournaments > 2 ? "+" : ""}${stats.upcomingTournaments - 2
                    } from last month`,
            color: "text-purple-600",
        },
    ];

    const features = [
        {
            icon: Target,
            title: "Smart Pairing System",
            description: "Advanced Swiss-system pairing with rating optimization",
        },
        {
            icon: Shield,
            title: "Fair Play Monitoring",
            description: "Real-time fair play analysis and cheat detection",
        },
        {
            icon: Zap,
            title: "Live Updates",
            description: "Real-time game updates and tournament progress",
        },
        {
            icon: Settings,
            title: "Tournament Management",
            description: "Complete tools for organizers and arbiters",
        },
    ];

    const getStatusVariant = (status) => {
        switch (status) {
            case "active":
                return "destructive";
            case "upcoming":
                return "default";
            case "completed":
                return "secondary";
            default:
                return "outline";
        }
    };

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="text-center py-12">
                <h1 className="text-4xl font-bold">Chess Tournament Pro</h1>
                <p className="mt-2 text-xl text-muted-foreground">
                    Master the Art of Tournament Chess
                </p>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                    Join the world's most advanced chess tournament platform. Create,
                    manage, and compete in tournaments with professional-grade tools and
                    fair play monitoring.
                </p>
                <div className="mt-6 flex flex-col items-center gap-4">
                    {!isLoggedIn && (
                        <Button onClick={() => navigate("/create-tournament")}>
                            Create Tournament
                        </Button>
                    )}
                    <Button
                        onClick={() => navigate("/tournaments")}
                        variant="outline"
                        className="px-8 py-3"
                    >
                        Browse Tournaments
                    </Button>
                </div>
            </section>

            {/* Stats Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-5xl mx-auto">
                {statCards.map((stat, index) => (
                    <div key={index} className="p-4 rounded-lg shadow bg-white">
                        <stat.icon className={`mx-auto h-8 w-8 ${stat.color}`} />
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-muted-foreground">{stat.label}</p>
                        <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                    </div>
                ))}
            </section>

            {/* Features Section */}
            <section className="text-center">
                <h2 className="text-3xl font-bold">
                    Professional Tournament Management
                </h2>
                <p className="text-muted-foreground mt-2">
                    Everything you need to organize, manage, and compete in world-class
                    chess tournaments
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {features.map((feature, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <feature.icon className="h-6 w-6 text-primary" />
                                <CardTitle>{feature.title}</CardTitle>
                                <CardDescription>{feature.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Featured Tournaments Section */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-2xl font-bold">Featured Tournaments</h2>
                        <p className="text-muted-foreground">
                            Join prestigious tournaments and compete with the best
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Search tournaments..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-4 w-full sm:w-80"
                        />
                        <Button
                            onClick={() => navigate("/tournaments")}
                            className="bg-primary hover:bg-primary/90"
                        >
                            View All
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredTournaments.map((tournament) => (
                        <Card key={tournament.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-chess-gold/50">
                            <CardHeader className="bg-gradient-to-r from-chess-dark to-chess-dark/90 text-white relative">
                                <div className="flex items-center justify-between">
                                    <span className="text-5xl drop-shadow-lg">{tournament.image}</span>
                                    <Badge variant={getStatusVariant(tournament.status)} className="bg-chess-gold text-chess-dark font-semibold">
                                        {tournament.status}
                                    </Badge>
                                </div>
                                <CardTitle className="text-xl font-bold text-chess-gold drop-shadow-md">{tournament.title}</CardTitle>
                                <CardDescription className="text-chess-light/80">{tournament.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="bg-white">
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Users className="h-4 w-4 mr-2 text-chess-gold" />
                                        <span>{tournament.players} players</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Calendar className="h-4 w-4 mr-2 text-chess-gold" />
                                        <span>{tournament.location}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Clock className="h-4 w-4 mr-2 text-chess-gold" />
                                        <span>{tournament.date}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Trophy className="h-4 w-4 mr-2 text-chess-gold" />
                                        <span>{tournament.rating}</span>
                                    </div>
                                    <p className="font-bold text-chess-gold text-sm">{tournament.prize}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        className="flex-1 bg-chess-gold text-chess-dark hover:bg-chess-gold/90 font-semibold transition-all duration-200 hover:scale-105"
                                        onClick={() => navigate(`/tournaments/${tournament.id}`)}
                                    >
                                        View Details
                                    </Button>
                                    {tournament.googleMapsLink && (
                                        <Button
                                            variant="outline"
                                            className="flex-1 border-chess-gold text-chess-gold hover:bg-chess-gold hover:text-chess-dark transition-all duration-200"
                                            onClick={() => window.open(tournament.googleMapsLink, '_blank')}
                                        >
                                            <MapPin className="h-4 w-4 mr-2" />
                                            View Location
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>


        </div>
    );
};

export default Index;
