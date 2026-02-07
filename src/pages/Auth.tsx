import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const roles = ["Volunteer", "Organizer", "Professional"];

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState(roles[0]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    setLoading(true);

    if (isSignUp) {
      // Sign up
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setAlert(error.message);
        setLoading(false);
        return;
      }
      // Insert profile with role
      if (data.user) {
        await supabase.from("profiles").upsert([
          {
            id: data.user.id,
            email,
            role,
            created_at: new Date().toISOString(),
          },
        ]);
      }
      setAlert("Signed up successfully. Please check your email for verification.");
      setLoading(false);
    } else {
      // Sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setAlert(error.message);
        setLoading(false);
        return;
      }
      setAlert(null);
      setLoading(false);
      await refreshProfile();
      navigate("/dashboard");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="glass-card w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignUp ? "Create Account" : "Sign In"}
        </h2>
        {alert && (
          <div className="mb-4 text-center text-sm text-red-600 bg-red-50 rounded p-2">
            {alert}
          </div>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <select
              className="input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {roles.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          )}
          <input
            className="input"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete={isSignUp ? "new-password" : "current-password"}
          />
          <button className="btn-primary mt-2" type="submit" disabled={loading}>
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            className="text-primary underline"
            onClick={() => {
              setIsSignUp((s) => !s);
              setAlert(null);
            }}
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </section>
  );
}
