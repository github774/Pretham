interface ProfileCardProps {
  name: string;
  role: string;
  hours: number;
  points: number;
  rank: number;
  avatarUrl: string;
}

export default function ProfileCard({
  name,
  role,
  hours,
  points,
  rank,
  avatarUrl,
}: ProfileCardProps) {
  return (
    <div className="profile-card w-full max-w-xs mx-auto mb-6">
      <img
        src={avatarUrl}
        alt={name}
        className="w-20 h-20 rounded-full shadow-glow mb-2"
      />
      <h2 className="text-xl font-bold">{name}</h2>
      <span className="text-sm text-primary font-semibold capitalize">{role}</span>
      <div className="flex justify-between w-full mt-4">
        <div className="flex flex-col items-center">
          <span className="font-bold text-lg">{hours}</span>
          <span className="text-xs text-gray-500">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-lg">{points}</span>
          <span className="text-xs text-gray-500">Points</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-lg">#{rank}</span>
          <span className="text-xs text-gray-500">Rank</span>
        </div>
      </div>
    </div>
  );
}
