import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      // In a real app, you'd use a view or an RPC for this
      const { data: logs, error: logsError } = await supabase
        .from("impact_logs")
        .select("user_id, hours")
        .eq("status", "completed");

      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, full_name, email, avatar_url");

      if (logsError || profilesError) {
        console.error("Error fetching leaderboard data:", logsError || profilesError);
      } else {
        const hourMap: Record<string, number> = {};
        logs?.forEach((log) => {
          hourMap[log.user_id] = (hourMap[log.user_id] || 0) + (log.hours || 0);
        });

        const leaderboardData = profiles?.map((profile) => ({
          ...profile,
          hours: hourMap[profile.id] || 0,
          points: (hourMap[profile.id] || 0) * 10,
        })) || [];

        leaderboardData.sort((a, b) => b.hours - a.hours);
        setLeaders(leaderboardData);
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  return (
    <section className="max-w-2xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-primary text-center">Impact Leaderboard</h2>
      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-16 w-full" />
          ))}
        </div>
      ) : leaders.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No contributions yet. Start logging hours!</p>
      ) : (
        <div className="mb-6">
          {leaders.map((user, index) => (
            <div key={user.id} className="leaderboard-row flex items-center justify-between p-4 bg-white rounded-xl shadow-sm mb-3 border border-gray-100">
              <div className="flex items-center gap-4">
                <span className={`font-bold text-lg w-6 ${index === 0 ? "text-yellow-500" : index === 1 ? "text-gray-400" : index === 2 ? "text-orange-400" : "text-gray-300"}`}>
                  #{index + 1}
                </span>
                <img
                  src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.full_name || user.email}&background=random`}
                  alt={user.full_name || user.email}
                  className="w-12 h-12 rounded-full shadow-sm border-2 border-white"
                />
                <div>
                  <div className="font-bold text-gray-800">{user.full_name || user.email?.split('@')[0]}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Top Contributor</div>
                </div>
              </div>
              <div className="flex gap-8 text-right">
                <div>
                  <div className="font-bold text-primary">{user.hours}</div>
                  <div className="text-[10px] text-gray-400 uppercase">Hours</div>
                </div>
                <div>
                  <div className="font-bold text-accent">{user.points}</div>
                  <div className="text-[10px] text-gray-400 uppercase">Points</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="text-center text-gray-400 text-sm mt-8 italic">
        "Great things are done by a series of small things brought together."
      </div>
    </section>
  );
}
