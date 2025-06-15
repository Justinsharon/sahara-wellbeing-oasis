
import { Lightbulb, User, Group, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiquidGlass } from "@/components/ui/liquid-glass";

// Placeholder suggestion sections that you could connect to real recommendations
export default function DashboardSuggestionCards({
  user,
  therapyRecommendations,
}: {
  user: any;
  therapyRecommendations: any[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Content Suggestions */}
      <SuggestionCard
        icon={<Lightbulb className="w-6 h-6 text-yellow-500" />}
        iconBg="bg-soft-taupe"
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
        iconBg="bg-soft-taupe"
        title="Therapist Specialties for You"
        subtitle="Based on your assessment results, these therapist specialties may be a good fit."
        items={[
          { label: "CBT Specialist", href: "/therapy" },
          { label: "Mindfulness Coach", href: "/therapy" },
        ]}
      />

      {/* Support Groups */}
      <SuggestionCard
        icon={<Group className="w-6 h-6 text-indigo-500" />}
        iconBg="bg-soft-taupe"
        title="Support Groups for You"
        subtitle="Connect with others who share your wellness goals."
        items={[
          { label: "Anxiety Support", href: "/community" },
          { label: "Mindfulness Practice Group", href: "/community" },
        ]}
      />

      {/* Quick Actions */}
      <SuggestionCard
        icon={<Star className="w-6 h-6 text-orange-400" />}
        iconBg="bg-soft-taupe"
        title="Quick Actions"
        subtitle="Track your mood, chat with your companion and more."
        items={[
          { label: "Track Your Mood", href: "/personal-growth/unified-mood-journal" },
          { label: "Chat Now", href: "/chat" },
        ]}
      />
    </div>
  );
}

function SuggestionCard({
  icon,
  iconBg,
  title,
  subtitle,
  items,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  items: { label: string; href: string }[];
}) {
  return (
    <LiquidGlass
      variant="card"
      interactive
      floating
      className="rounded-2xl p-6 shadow hover-scale flex flex-col gap-3 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-xl shadow-lg shrink-0 ${iconBg}`}
        >
          {icon}
        </div>
        <h3 className="font-bold text-lg text-deep-charcoal">{title}</h3>
      </div>
      <div className="text-warm-gray text-sm">{subtitle}</div>
      <ul className="flex flex-col gap-1 mb-2">
        {items.map((item, idx) => (
          <li key={idx}>
            <Button asChild variant="outline" className="w-full justify-start">
              <a href={item.href}>{item.label}</a>
            </Button>
          </li>
        ))}
      </ul>
    </LiquidGlass>
  );
}

