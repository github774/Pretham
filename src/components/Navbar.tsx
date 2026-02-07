import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/browse", label: "Browse" },
  { to: "/create", label: "Post" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/leaderboard", label: "Leaderboard" },
];

export default function Navbar() {
  const location = useLocation();
  const { user, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-between glass-morphism border-b border-white/20 bg-white/40 backdrop-blur-md">
      <Link to="/" className="flex items-center gap-3 font-black text-2xl text-slate-950 tracking-tighter hover:scale-105 transition-transform">
        <div className="bg-primary p-2 rounded-xl shadow-glow-primary">
          <Heart size={24} className="text-white fill-current" />
        </div>
        Impact<span className="text-primary">Hours</span>
      </Link>
      
      <div className="hidden md:flex bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`font-bold px-6 py-2 rounded-xl transition-all duration-300 text-sm tracking-tight ${
                isActive
                  ? "bg-white text-primary shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
      {loading ? (
        <div className="ml-4 text-gray-400">...</div>
      ) : user && profile ? (
        <div className="ml-4 flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-gray-900">{profile.full_name || user.email?.split('@')[0]}</div>
            <div className="text-[10px] text-primary font-bold uppercase tracking-wider">{profile.role}</div>
          </div>
          <img
            src={profile.avatar_url || `https://ui-avatars.com/api/?name=${profile.full_name || user.email}&background=random`}
            alt={profile.full_name || profile.email}
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          />
          <button
            className="ml-2 p-2 text-gray-400 hover:text-red-500 transition-colors"
            title="Sign Out"
            onClick={async () => {
              await signOut();
              navigate("/auth");
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </div>
      ) : (
        <Link to="/auth" className="ml-4 flex items-center gap-2 btn-primary">
          <User size={20} />
          Sign In
        </Link>
      )}
    </nav>
  );
}
