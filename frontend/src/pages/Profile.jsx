import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    User,
    Trophy,
    Edit,
    Save,
    Camera,
} from "lucide-react";
import "./Profile.css";

// Simplified UI Components to mimic Shadcn
const Card = ({ children, className = "" }) => <div className={`card ${className}`}>{children}</div>;
const CardHeader = ({ children }) => <div className="card-header">{children}</div>;
const CardTitle = ({ children, className = "" }) => <div className={`card-title ${className}`}>{children}</div>;
const CardDescription = ({ children }) => <div className="card-description">{children}</div>;
const CardContent = ({ children, className = "" }) => <div className={`card-content ${className}`}>{children}</div>;
const Button = ({ children, variant = "default", onClick, className = "", size = "md" }) => (
    <button className={`btn btn-${variant} btn-${size} ${className}`} onClick={onClick}>{children}</button>
);
const Input = ({ id, value, onChange, disabled, type = "text" }) => (
    <input id={id} type={type} value={value} onChange={onChange} disabled={disabled} className="input-field" />
);
const Textarea = ({ id, value, onChange, disabled, rows = 3, placeholder = "" }) => (
    <textarea id={id} value={value} onChange={onChange} disabled={disabled} rows={rows} placeholder={placeholder} className="textarea-field" />
);
const Label = ({ children, htmlFor }) => <label htmlFor={htmlFor} className="label">{children}</label>;
const Avatar = ({ children, className = "" }) => <div className={`avatar ${className}`}>{children}</div>;
const AvatarImage = ({ src }) => src ? <img src={src} alt="Avatar" className="avatar-img" /> : null;
const AvatarFallback = ({ children, className = "" }) => <div className={`avatar-fallback ${className}`}>{children}</div>;
const Badge = ({ children, variant = "default", className = "" }) => <span className={`badge badge-${variant} ${className}`}>{children}</span>;
const Separator = () => <div className="separator" />;

const Profile = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        firstName: "Demo",
        lastName: "User",
        email: "user@example.com",
        phone: "",
        city: "",
        state: "",
        country: "India",
        bio: "",
        fideId: "",
        aicfId: "",
        dateOfBirth: "",
        chessTitle: "",
        avatar: null
    });

    const [userTournaments, setUserTournaments] = useState([]);
    const [participatedTournaments, setParticipatedTournaments] = useState([]);

    useEffect(() => {
        loadUserData();
        loadUserTournaments();
        loadParticipatedTournaments();
    }, []);

    const loadUserData = () => {
        const stored = JSON.parse(localStorage.getItem('userData') || '{}');
        if (Object.keys(stored).length > 0) {
            setUserData(prev => ({ ...prev, ...stored }));
        }
    };

    const loadUserTournaments = () => {
        const tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
        const filtered = tournaments.filter(t => t.organizerName === userData.firstName + ' ' + userData.lastName);
        setUserTournaments(filtered);
    };

    const loadParticipatedTournaments = () => {
        const tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
        const participated = [];
        tournaments.forEach(tournament => {
            const registrations = JSON.parse(localStorage.getItem(`registrations_${tournament.id}`) || '[]');
            const userRegistered = registrations.some(reg => reg.email === userData.email);
            if (userRegistered) {
                participated.push(tournament);
            }
        });
        setParticipatedTournaments(participated);
    };

    const handleInputChange = (field, value) => {
        setUserData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        localStorage.setItem('userData', JSON.stringify(userData));
        setIsEditing(false);
        alert("Profile Updated Successfully!");
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUserData(prev => ({ ...prev, avatar: e.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const getInitials = () => {
        if (!userData.firstName) return "U";
        return `${userData.firstName.charAt(0)}${userData.lastName ? userData.lastName.charAt(0) : ''}`.toUpperCase();
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <h1>User Profile</h1>
                    <p>Manage your personal information and view your tournaments</p>
                </div>

                <div className="profile-grid">
                    {/* Profile Information */}
                    <div className="profile-main">
                        <Card>
                            <CardHeader>
                                <div className="card-header-flex">
                                    <div>
                                        <CardTitle className="flex-center">
                                            <User className="icon-mr" size={20} />
                                            Personal Information
                                        </CardTitle>
                                        <CardDescription>Update your personal details</CardDescription>
                                    </div>
                                    <Button
                                        variant={isEditing ? "primary" : "outline"}
                                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                    >
                                        {isEditing ? (
                                            <span className="flex-center"><Save className="icon-mr" size={16} /> Save Changes</span>
                                        ) : (
                                            <span className="flex-center"><Edit className="icon-mr" size={16} /> Edit Profile</span>
                                        )}
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="avatar-section">
                                    <div className="avatar-relative">
                                        <Avatar>
                                            <AvatarImage src={userData.avatar} />
                                            {!userData.avatar && <AvatarFallback>{getInitials()}</AvatarFallback>}
                                        </Avatar>
                                        {isEditing && (
                                            <label className="avatar-upload">
                                                <Camera size={12} />
                                                <input type="file" accept="image/*" onChange={handleAvatarChange} hidden />
                                            </label>
                                        )}
                                    </div>
                                    <div className="avatar-info">
                                        <h3>{userData.firstName} {userData.lastName}</h3>
                                        <p>{userData.email}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="form-grid">
                                    <div className="form-group">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" value={userData.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} disabled={!isEditing} />
                                    </div>
                                    <div className="form-group">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" value={userData.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} disabled={!isEditing} />
                                    </div>
                                    <div className="form-group">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" value={userData.email} onChange={(e) => handleInputChange("email", e.target.value)} disabled={!isEditing} />
                                    </div>
                                    <div className="form-group">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input id="phone" value={userData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} disabled={!isEditing} />
                                    </div>
                                </div>

                                <div className="chess-info">
                                    <h3>Chess Information</h3>
                                    <div className="form-grid-3">
                                        <div className="form-group">
                                            <Label htmlFor="fideId">FIDE ID</Label>
                                            <Input id="fideId" value={userData.fideId} onChange={(e) => handleInputChange("fideId", e.target.value)} disabled={!isEditing} />
                                        </div>
                                        <div className="form-group">
                                            <Label htmlFor="aicfId">AICF ID</Label>
                                            <Input id="aicfId" value={userData.aicfId} onChange={(e) => handleInputChange("aicfId", e.target.value)} disabled={!isEditing} />
                                        </div>
                                        <div className="form-group">
                                            <Label htmlFor="chessTitle">Chess Title</Label>
                                            <Input id="chessTitle" value={userData.chessTitle} onChange={(e) => handleInputChange("chessTitle", e.target.value)} disabled={!isEditing} />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea id="bio" value={userData.bio} onChange={(e) => handleInputChange("bio", e.target.value)} disabled={!isEditing} placeholder="Tell us about yourself..." />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="profile-sidebar">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex-center">
                                    <Trophy className="icon-mr" size={20} />
                                    {userData.role === 'player' ? 'My History' : 'My Tournaments'}
                                </CardTitle>
                                <CardDescription>
                                    {userData.role === 'player' ? 'Games Played' : 'Created'} ({userTournaments.length})
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {userTournaments.length === 0 ? (
                                    <div className="empty-state">
                                        <Trophy className="empty-icon" size={48} />
                                        <p>No {userData.role === 'player' ? 'history' : 'tournaments created'} yet</p>
                                        {userData.role === 'arbiter' && (
                                            <Button variant="primary" className="mt-4" onClick={() => navigate('/create-tournament')}>
                                                Create
                                            </Button>
                                        )}
                                        {userData.role === 'player' && (
                                            <Button variant="primary" className="mt-4">
                                                Show History
                                            </Button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="tournament-list">
                                        {userTournaments.map(t => (
                                            <div key={t.id} className="tournament-card">
                                                <h4>{t.tournamentName}</h4>
                                                <Badge variant="outline">{t.status || 'Draft'}</Badge>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="mt-8">
                            <CardHeader>
                                <CardTitle className="flex-center">
                                    <User className="icon-mr" size={20} /> Participating
                                </CardTitle>
                                <CardDescription>Registered ({participatedTournaments.length})</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {participatedTournaments.length === 0 ? (
                                    <div className="empty-state">
                                        <User className="empty-icon" size={48} />
                                        <p>No participations yet</p>
                                        <Button variant="outline" className="mt-4" onClick={() => navigate('/tournaments')}>Browse</Button>
                                    </div>
                                ) : (
                                    <div className="tournament-list">
                                        {participatedTournaments.map(t => (
                                            <div key={t.id} className="tournament-card">
                                                <h4>{t.tournamentName}</h4>
                                                <Badge variant="outline">Upcoming</Badge>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
