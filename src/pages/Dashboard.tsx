import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import ListingCard from "../components/ListingCard";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  const { user, profile, loading: authLoading } = useAuth();
  const [activeLogs, setActiveLogs] = useState<any[]>([]);
  const [completedLogs, setCompletedLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchLogs = async () => {
      const { data, error } = await supabase
        .from("impact_logs")
        .select("*, listings(*)")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching logs:", error);
      } else {
        const active = data?.filter((log) => log.status === "active") || [];
        const completed = data?.filter((log) => log.status === "completed") || [];
        setActiveLogs(active);
        setCompletedLogs(completed);
      }
      setLoading(false);
    };

    fetchLogs();
  }, [user]);

  const handleComplete = async (logId: string) => {
    const { error } = await supabase
      .from("impact_logs")
      .update({ status: "completed" })
      .eq("id", logId);

    if (error) {
      alert(error.message);
    } else {
      // Refresh local state
      const completedLog = activeLogs.find(l => l.id === logId);
      if (completedLog) {
        setActiveLogs(activeLogs.filter(l => l.id !== logId));
        setCompletedLogs([...completedLogs, { ...completedLog, status: "completed" }]);
      }
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="skeleton h-48 w-64 mb-6" />
        <div className="skeleton h-24 w-full max-w-2xl mb-4" />
        <div className="skeleton h-24 w-full max-w-2xl" />
      </div>
    );
  }

  const totalHours = completedLogs.reduce((sum, log) => sum + (log.hours || 0), 0);
  const totalPoints = totalHours * 10; // Simple points formula

  return (
    <section className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-primary text-center">Your Impact Dashboard</h2>
      
      <ProfileCard
        name={profile?.full_name || user?.email || "User"}
        role={profile?.role || "Volunteer"}
        hours={totalHours}
        points={totalPoints}
        rank={1} // Placeholder for rank
        avatarUrl={profile?.avatar_url || `https://ui-avatars.com/api/?name=${user?.email}&background=random`}
      />

      <div className="grid md:grid-cols-2 gap-8 mt-10">
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
            Active Engagements
          </h3>
          {activeLogs.length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center text-gray-500 border border-dashed border-gray-300">
              No active tasks. Browse listings to find opportunities!
            </div>
          ) : (
            activeLogs.map((log) => (
              <ListingCard
                key={log.id}
                type={log.listings.type}
                title={log.listings.title}
                description={log.listings.description}
                location={log.listings.location}
                hours={log.listings.hours}
                category={log.listings.category}
                organizer={log.listings.organizer_name}
                actionLabel="Complete"
                onAction={() => handleComplete(log.id)}
              />
            ))
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            Completed Contributions
          </h3>
          {completedLogs.length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center text-gray-500 border border-dashed border-gray-300">
              You haven't completed any hours yet. Keep going!
            </div>
          ) : (
            completedLogs.map((log) => (
              <ListingCard
                key={log.id}
                type={log.listings.type}
                title={log.listings.title}
                description={log.listings.description}
                location={log.listings.location}
                hours={log.hours}
                category={log.listings.category}
                organizer={log.listings.organizer_name}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
