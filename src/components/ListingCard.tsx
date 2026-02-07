import { MapPin, Clock, Users, Briefcase, ChevronRight } from "lucide-react";

type ListingType = "volunteer" | "paid";

interface ListingCardProps {
  type: ListingType;
  title: string;
  description: string;
  location: string;
  hours?: number;
  category?: string;
  rate?: string;
  organizer: string;
  actionLabel?: string;
  onAction?: () => void;
  loading?: boolean;
}

export default function ListingCard(props: ListingCardProps) {
  return (
    <div className="glass-card hover:card-hover transition-all mb-4 group">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {props.type === "volunteer" ? (
              <div className="bg-blue-100 p-1.5 rounded-lg text-primary">
                <Users size={18} />
              </div>
            ) : (
              <div className="bg-green-100 p-1.5 rounded-lg text-accent">
                <Briefcase size={18} />
              </div>
            )}
            <h3 className="text-lg font-bold text-gray-800">{props.title}</h3>
          </div>
          <p className="text-gray-600 mb-4 line-clamp-2">{props.description}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-gray-400" /> {props.location}
            </span>
            {props.type === "volunteer" && props.hours && (
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-gray-400" /> {props.hours} hrs
              </span>
            )}
            {props.type === "volunteer" && props.category && (
              <span className="bg-primary/5 text-primary text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md">
                {props.category}
              </span>
            )}
            {props.type === "paid" && props.rate && (
              <span className="bg-accent/5 text-accent text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md">
                {props.rate}
              </span>
            )}
          </div>
          <div className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
            Organized by <span className="text-gray-600">{props.organizer}</span>
          </div>
        </div>
        {props.onAction && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              props.onAction?.();
            }}
            disabled={props.loading}
            className="ml-4 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {props.loading ? "..." : props.actionLabel || "View"}
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
