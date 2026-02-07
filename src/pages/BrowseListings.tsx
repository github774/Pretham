import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import ListingCard from "../components/ListingCard";
import { supabase } from "../lib/supabaseClient";

export default function BrowseListings() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching listings:", error);
      } else {
        setListings(data || []);
      }
      setLoading(false);
    };

    fetchListings();
  }, []);

  const handleJoin = async (listing: any) => {
    if (!supabase.auth.getSession()) {
      alert("Please sign in to join opportunities!");
      return;
    }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("impact_logs").insert([
      {
        user_id: user.id,
        listing_id: listing.id,
        hours: listing.hours,
        status: "active",
      },
    ]);

    if (error) {
      if (error.code === "23505") {
        alert("You have already joined this opportunity!");
      } else {
        alert(error.message);
      }
    } else {
      alert(`Joined ${listing.title}! Check your dashboard.`);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Browse Listings</h2>
          <p className="text-gray-500 mt-2 font-medium">Find your next opportunity to make a difference.</p>
        </div>
        <Link to="/create" className="btn-primary flex items-center gap-2">
          Post Opportunity
        </Link>
      </div>
      {loading ? (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-40 w-full" />
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <div className="text-gray-400 mb-4 flex justify-center">
            <Users size={48} />
          </div>
          <p className="text-xl font-bold text-gray-900 mb-2">No listings found</p>
          <p className="text-gray-500 mb-8">Be the first to create an impact opportunity in your community.</p>
          <Link to="/create" className="btn-primary px-8">Create Listing</Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              type={listing.type}
              title={listing.title}
              description={listing.description}
              location={listing.location}
              hours={listing.hours}
              category={listing.category}
              rate={listing.rate}
              organizer={listing.organizer_name || "Anonymous"}
              actionLabel={listing.type === "volunteer" ? "Join Now" : "Apply"}
              onAction={() => handleJoin(listing)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
