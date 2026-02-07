import { Link } from "react-router-dom";
import { Heart, Trophy, Clock, Zap } from "lucide-react";

export default function Landing() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 px-4 text-center max-w-6xl mx-auto relative overflow-hidden">
        <div className="mb-12 relative animate-float">
          <img
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200&h=600"
            alt="Community Volunteering"
            className="rounded-[2.5rem] shadow-2xl w-full max-w-4xl object-cover h-[450px] border-8 border-white"
          />
          <div className="absolute -bottom-8 -right-8 glass-morphism p-6 rounded-3xl shadow-2xl hidden md:block">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                <Zap size={28} className="fill-current" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-black text-slate-950 tracking-tight">24,800+</div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Hours Logged</div>
              </div>
            </div>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-extrabold text-slate-950 mb-8 leading-[1.1] tracking-tight">
          Every Hour <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Counts</span>
        </h1>
        <p className="text-xl text-slate-600 mb-12 max-w-3xl leading-relaxed font-medium">
          The ultimate platform to track your social impact, climb the leaderboard, and join a global community of change-makers.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 mb-20">
          <Link to="/browse" className="bg-slate-950 text-white text-lg px-10 py-4 rounded-2xl font-bold hover:bg-primary transition-all duration-300 shadow-glow-primary hover:scale-105">
            Find Opportunities
          </Link>
          <Link to="/auth" className="glass-morphism text-slate-950 text-lg px-10 py-4 rounded-2xl font-bold hover:bg-white transition-all duration-300 hover:scale-105">
            Join the Movement
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white w-full py-20 px-4 border-t border-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 p-4 rounded-2xl text-primary mb-6">
              <Clock size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Easy Tracking</h3>
            <p className="text-gray-600">Log your impact hours in seconds and keep a verified record of your contributions.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 p-4 rounded-2xl text-accent mb-6">
              <Trophy size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Get Recognized</h3>
            <p className="text-gray-600">Climb the leaderboard, earn badges, and showcase your profile to the world.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-red-100 p-4 rounded-2xl text-red-500 mb-6">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Build Community</h3>
            <p className="text-gray-600">Connect with local organizers and find meaningful ways to give back.</p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary w-full py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to start your impact journey?</h2>
        <Link to="/auth" className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform inline-block">
          Create Free Account
        </Link>
      </section>
    </div>
  );
}
