import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const [type, setType] = useState<"volunteer" | "paid">("volunteer");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [hours, setHours] = useState("");
  const [category, setCategory] = useState("");
  const [rate, setRate] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const { error } = await supabase.from("listings").insert([
      {
        title,
        description,
        location,
        type,
        hours: type === "volunteer" ? Number(hours) : null,
        category: type === "volunteer" ? category : null,
        rate: type === "paid" ? rate : null,
        organizer_id: user.id,
        organizer_name: user.email, // fallback if profile name not available
      },
    ]);

    if (error) {
      console.error("Error creating listing:", error);
      alert(error.message);
      setLoading(false);
    } else {
      setLoading(false);
      navigate("/browse");
    }
  };

  return (
    <section className="max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-primary text-center">Create a Listing</h2>
      <div className="glass-card">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex gap-4 mb-2">
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                type === "volunteer" ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setType("volunteer")}
            >
              Volunteer
            </button>
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                type === "paid" ? "bg-accent text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setType("paid")}
            >
              Paid
            </button>
          </div>
          <input
            className="input"
            type="text"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="input"
            placeholder="Description"
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="input"
            type="text"
            placeholder="Location"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {type === "volunteer" ? (
            <>
              <input
                className="input"
                type="number"
                placeholder="Hours"
                min={1}
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
              <input
                className="input"
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </>
          ) : (
            <input
              className="input"
              type="text"
              placeholder="Rate/Budget"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          )}
          <button className="btn-primary mt-2" type="submit" disabled={loading}>
            {loading ? "Posting..." : "Post Listing"}
          </button>
        </form>
      </div>
    </section>
  );
}
