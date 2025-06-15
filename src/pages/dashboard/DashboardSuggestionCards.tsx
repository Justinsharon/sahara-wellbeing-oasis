
import { Lightbulb, User, Group, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Placeholder suggestion sections that you could connect to real recommendations
export default function DashboardSuggestionCards({ user, therapyRecommendations }: { user: any, therapyRecommendations: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Content Suggestions */}
      <SuggestionCard
        icon={<Lightbulb className="w-6 h-6 text-yellow-500" />}
        title="Content Suggested for You"
        subtitle="Selected articles, videos, and sleep tips based on your needs."
        items={[
          { label: "How to Practice Mindfulness Daily", href: "/explore-heal" },
          { label: "CBT Techniques for Anxiety Relief", href: "/explore-heal" },
          { label: "Sleep Well: Evening Routines", href: "/explore-heal" },
        ]}
      />

      {/* Therapist Suggestions */}
      <SuggestionCard
        icon={<User className="w-6 h-6 text-emerald-600" />}
        title="Therapist Specialties for You"
        subtitle="Based on your assessment results, these therapist specialties may be a good fit."
        items={[
          { label: "CBT Specialist", href: "/therapy" },
          { label: "Mindfulness Coach", href: "/therapy" }
        ]}
      />

      {/* Support Groups */}
      <SuggestionCard
        icon={<Group className="w-6 h-6 text-indigo-500" />}
        title="Support Groups for You"
        subtitle="Connect with others who share your wellness goals."
        items={[
          { label: "Anxiety Support", href: "/community" },
          { label: "Mindfulness Practice Group", href: "/community" }
        ]}
      />

      {/* Quick Actions */}
      <SuggestionCard
        icon={<Star className="w-6 h-6 text-orange-400" />}
        title="Quick Actions"
        subtitle="Track your mood, chat with your companion and more."
        items={[
          { label: "Track Your Mood", href: "/personal-growth/unified-mood-journal" },
          { label: "Chat Now", href: "/chat" }
        ]}
      />
    </div>
  );
}

function SuggestionCard({
  icon,
  title,
  subtitle,
  items
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="bg-white/95 rounded-2xl border p-6 shadow flex flex-col gap-3">
      <div className="flex items-center gap-2">{icon} <h3 className="font-bold text-lg text-black">{title}</h3></div>
      <div className="text-gray-600 text-sm">{subtitle}</div>
      <ul className="flex flex-col gap-1 mb-2">
        {items.map((item, idx) => (
          <li key={idx}>
            <Button asChild variant="outline" className="w-full justify-start">{/* outlined button for each link */}
              <a href={item.href}>
                {item.label}
              </a>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
