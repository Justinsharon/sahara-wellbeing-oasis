
import { useState } from "react";
import { Plus, Target, Calendar, TrendingUp, CheckCircle2, Circle, Edit2, Trash2, Star } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Goal {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  progress: number;
  targetDate: string;
  status: "active" | "completed" | "paused";
  milestones: string[];
  completedMilestones: number;
}

const mockGoals: Goal[] = [
  {
    id: 1,
    title: "Daily Meditation Practice",
    description: "Establish a consistent 15-minute daily meditation routine",
    category: "Mindfulness",
    priority: "High",
    progress: 75,
    targetDate: "2024-02-15",
    status: "active",
    milestones: ["Week 1: 5 min daily", "Week 2: 10 min daily", "Week 3: 15 min daily", "Month 1: Consistency"],
    completedMilestones: 3
  },
  {
    id: 2,
    title: "Improve Sleep Schedule",
    description: "Maintain consistent bedtime and wake-up times",
    category: "Health",
    priority: "High",
    progress: 60,
    targetDate: "2024-01-30",
    status: "active",
    milestones: ["Set bedtime routine", "No screens 1hr before bed", "Consistent wake time", "7-8 hours sleep"],
    completedMilestones: 2
  },
  {
    id: 3,
    title: "Read 12 Books This Year",
    description: "Read one book per month to expand knowledge and reduce screen time",
    category: "Personal Development",
    priority: "Medium",
    progress: 25,
    targetDate: "2024-12-31",
    status: "active",
    milestones: ["Q1: 3 books", "Q2: 6 books", "Q3: 9 books", "Q4: 12 books"],
    completedMilestones: 1
  }
];

const categories = ["Mindfulness", "Health", "Personal Development", "Relationships", "Career", "Fitness"];
const priorities = ["High", "Medium", "Low"];

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Medium" as const,
    targetDate: "",
    milestones: [""]
  });

  const addMilestone = () => {
    setNewGoal(prev => ({
      ...prev,
      milestones: [...prev.milestones, ""]
    }));
  };

  const updateMilestone = (index: number, value: string) => {
    setNewGoal(prev => ({
      ...prev,
      milestones: prev.milestones.map((milestone, i) => i === index ? value : milestone)
    }));
  };

  const removeMilestone = (index: number) => {
    setNewGoal(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }));
  };

  const handleCreateGoal = () => {
    if (!newGoal.title || !newGoal.description) return;

    const goal: Goal = {
      id: goals.length + 1,
      title: newGoal.title,
      description: newGoal.description,
      category: newGoal.category,
      priority: newGoal.priority,
      progress: 0,
      targetDate: newGoal.targetDate,
      status: "active",
      milestones: newGoal.milestones.filter(m => m.trim() !== ""),
      completedMilestones: 0
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal({
      title: "",
      description: "",
      category: "",
      priority: "Medium",
      targetDate: "",
      milestones: [""]
    });
    setShowNewGoalForm(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Low": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-100 text-blue-700";
      case "completed": return "bg-green-100 text-green-700";
      case "paused": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const activeGoals = goals.filter(goal => goal.status === "active");
  const completedGoals = goals.filter(goal => goal.status === "completed");

  return (
    <div className="min-h-screen wellness-gradient">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <LiquidGlass variant="card" floating bubbles className="text-center p-8">
          <div className="w-16 h-16 bg-crimson-wine rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Target className="w-8 h-8 text-off-white" />
          </div>
          <h1 className="text-4xl font-bold heading-gradient mb-4">Personal Goals</h1>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto">
            Set meaningful goals, track your progress, and celebrate your achievements on your wellness journey.
          </p>
        </LiquidGlass>

        {/* Goal Statistics */}
        <div className="grid md:grid-cols-3 gap-6">
          <LiquidGlass variant="crystal" floating className="p-6 text-center">
            <div className="w-12 h-12 bg-soft-taupe rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Target className="w-6 h-6 text-crimson-wine" />
            </div>
            <h3 className="text-2xl font-bold text-deep-charcoal">{activeGoals.length}</h3>
            <p className="text-warm-gray">Active Goals</p>
          </LiquidGlass>

          <LiquidGlass variant="crystal" floating className="p-6 text-center">
            <div className="w-12 h-12 bg-soft-taupe rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle2 className="w-6 h-6 text-emerald-splash-600" />
            </div>
            <h3 className="text-2xl font-bold text-deep-charcoal">{completedGoals.length}</h3>
            <p className="text-warm-gray">Completed Goals</p>
          </LiquidGlass>

          <LiquidGlass variant="crystal" floating className="p-6 text-center">
            <div className="w-12 h-12 bg-soft-taupe rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <TrendingUp className="w-6 h-6 text-crimson-wine" />
            </div>
            <h3 className="text-2xl font-bold text-deep-charcoal">
              {Math.round(activeGoals.reduce((acc, goal) => acc + goal.progress, 0) / activeGoals.length) || 0}%
            </h3>
            <p className="text-warm-gray">Avg Progress</p>
          </LiquidGlass>
        </div>

        {/* New Goal Button */}
        <div className="flex justify-end">
          <Button 
            onClick={() => setShowNewGoalForm(true)}
            className="btn-primary-modern"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Goal
          </Button>
        </div>

        {/* New Goal Form */}
        {showNewGoalForm && (
          <LiquidGlass variant="card" liquidBorder className="p-6">
            <h2 className="text-xl font-bold text-deep-charcoal mb-6">Create New Goal</h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-deep-charcoal mb-2">Goal Title</label>
                  <Input
                    value={newGoal.title}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter goal title"
                    className="glass-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep-charcoal mb-2">Target Date</label>
                  <Input
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, targetDate: e.target.value }))}
                    className="glass-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-deep-charcoal mb-2">Description</label>
                <Textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your goal..."
                  className="glass-input"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-deep-charcoal mb-2">Category</label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full glass-input"
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep-charcoal mb-2">Priority</label>
                  <select
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, priority: e.target.value as any }))}
                    className="w-full glass-input"
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-deep-charcoal mb-2">Milestones</label>
                <div className="space-y-2">
                  {newGoal.milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={milestone}
                        onChange={(e) => updateMilestone(index, e.target.value)}
                        placeholder={`Milestone ${index + 1}`}
                        className="flex-1 glass-input"
                      />
                      {newGoal.milestones.length > 1 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeMilestone(index)}
                          className="btn-secondary-modern"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={addMilestone}
                    className="btn-secondary-modern"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Milestone
                  </Button>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={handleCreateGoal} className="btn-primary-modern">
                  Create Goal
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewGoalForm(false)}
                  className="btn-secondary-modern"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </LiquidGlass>
        )}

        {/* Goals List */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-muted-blush">
            <TabsTrigger value="active" className="tab-trigger-primary">Active Goals</TabsTrigger>
            <TabsTrigger value="completed" className="tab-trigger-warm">Completed Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div className="grid gap-6">
              {activeGoals.map((goal) => (
                <LiquidGlass 
                  key={goal.id} 
                  variant="card" 
                  interactive 
                  floating 
                  liquidBorder 
                  className="p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-deep-charcoal">{goal.title}</h3>
                        <Badge variant="outline" className={getPriorityColor(goal.priority)}>
                          {goal.priority}
                        </Badge>
                        <Badge variant="outline" className="bg-muted-blush text-deep-charcoal">
                          {goal.category}
                        </Badge>
                      </div>
                      <p className="text-warm-gray mb-4">{goal.description}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="font-medium text-deep-charcoal">Progress</span>
                            <span className="text-crimson-wine font-bold">{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="progress-modern" />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-deep-charcoal mb-2">Milestones</p>
                          <div className="space-y-1">
                            {goal.milestones.map((milestone, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                {index < goal.completedMilestones ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-splash-600" />
                                ) : (
                                  <Circle className="w-4 h-4 text-warm-gray" />
                                )}
                                <span className={index < goal.completedMilestones ? "text-emerald-splash-600 line-through" : "text-warm-gray"}>
                                  {milestone}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-warm-gray">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Due: {new Date(goal.targetDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="icon" className="btn-secondary-modern">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="btn-secondary-modern">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </LiquidGlass>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-emerald-splash-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-emerald-splash-600" />
              </div>
              <h3 className="text-xl font-bold text-deep-charcoal mb-2">No Completed Goals Yet</h3>
              <p className="text-warm-gray">Keep working on your active goals to see them here!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
