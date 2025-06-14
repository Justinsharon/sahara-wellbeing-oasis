
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Target, Calendar, CheckCircle2, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Goal } from "@/types";

const mockGoals: Goal[] = [
  {
    id: "1",
    user_id: "user1",
    title: "Practice Daily Meditation",
    description: "Meditate for 10 minutes every morning to reduce stress and anxiety",
    target_date: "2024-07-15",
    completed: false,
    created_at: "2024-06-01T00:00:00Z",
  },
  {
    id: "2",
    user_id: "user1",
    title: "Exercise 3 Times a Week",
    description: "Regular physical activity to improve mood and energy levels",
    target_date: "2024-08-01",
    completed: true,
    created_at: "2024-05-15T00:00:00Z",
  },
  {
    id: "3",
    user_id: "user1",
    title: "Read Self-Help Books",
    description: "Read one personal development book per month",
    target_date: "2024-12-31",
    completed: false,
    created_at: "2024-06-10T00:00:00Z",
  },
];

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    target_date: "",
  });

  const handleAddGoal = () => {
    if (!formData.title.trim()) {
      toast.error("Please enter a goal title");
      return;
    }

    const newGoal: Goal = {
      id: Date.now().toString(),
      user_id: "user1",
      title: formData.title,
      description: formData.description,
      target_date: formData.target_date,
      completed: false,
      created_at: new Date().toISOString(),
    };

    setGoals([...goals, newGoal]);
    setFormData({ title: "", description: "", target_date: "" });
    setShowAddDialog(false);
    toast.success("Goal added successfully!");
  };

  const handleEditGoal = () => {
    if (!editingGoal || !formData.title.trim()) return;

    setGoals(goals.map(goal => 
      goal.id === editingGoal.id 
        ? { ...goal, ...formData }
        : goal
    ));
    setEditingGoal(null);
    setFormData({ title: "", description: "", target_date: "" });
    toast.success("Goal updated successfully!");
  };

  const handleCompleteGoal = (goalId: string) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, completed: !goal.completed }
        : goal
    ));
    toast.success("Goal status updated!");
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
    toast.success("Goal deleted successfully!");
  };

  const startEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      description: goal.description || "",
      target_date: goal.target_date || "",
    });
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", target_date: "" });
    setEditingGoal(null);
  };

  const completedGoals = goals.filter(goal => goal.completed).length;
  const totalGoals = goals.length;

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/personal-growth">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Personal Growth
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">My Goals</h1>
          <p className="text-muted-foreground">
            Track your progress • {completedGoals}/{totalGoals} completed
          </p>
        </div>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Goal</DialogTitle>
              <DialogDescription>
                Set a new wellness goal to work towards
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Goal Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Practice daily meditation"
                />
              </div>
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your goal and why it's important to you"
                />
              </div>
              <div>
                <Label htmlFor="target_date">Target Date (Optional)</Label>
                <Input
                  id="target_date"
                  type="date"
                  value={formData.target_date}
                  onChange={(e) => setFormData({ ...formData, target_date: e.target.value })}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddGoal}>Add Goal</Button>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.length === 0 ? (
          <Card className="soft-shadow border-0">
            <CardContent className="pt-6 text-center">
              <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No goals yet</h3>
              <p className="text-muted-foreground mb-4">
                Start your wellness journey by setting your first goal
              </p>
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Goal
              </Button>
            </CardContent>
          </Card>
        ) : (
          goals.map((goal) => (
            <Card key={goal.id} className="soft-shadow border-0">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCompleteGoal(goal.id)}
                        className={`p-1 h-auto ${
                          goal.completed 
                            ? "text-green-600 hover:text-green-700" 
                            : "text-muted-foreground hover:text-primary"
                        }`}
                      >
                        <CheckCircle2 className={`w-5 h-5 ${
                          goal.completed ? "fill-current" : ""
                        }`} />
                      </Button>
                      <h3 className={`text-lg font-medium ${
                        goal.completed ? "line-through text-muted-foreground" : ""
                      }`}>
                        {goal.title}
                      </h3>
                      {goal.completed && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Completed
                        </Badge>
                      )}
                    </div>
                    
                    {goal.description && (
                      <p className="text-muted-foreground mb-3">{goal.description}</p>
                    )}
                    
                    {goal.target_date && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        Target: {new Date(goal.target_date).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Dialog
                      open={editingGoal?.id === goal.id}
                      onOpenChange={(open) => !open && setEditingGoal(null)}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEdit(goal)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Goal</DialogTitle>
                          <DialogDescription>
                            Update your goal details
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-title">Goal Title</Label>
                            <Input
                              id="edit-title"
                              value={formData.title}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea
                              id="edit-description"
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-target_date">Target Date</Label>
                            <Input
                              id="edit-target_date"
                              type="date"
                              value={formData.target_date}
                              onChange={(e) => setFormData({ ...formData, target_date: e.target.value })}
                            />
                          </div>
                          <div className="flex gap-2 pt-4">
                            <Button onClick={handleEditGoal}>Update Goal</Button>
                            <Button variant="outline" onClick={() => setEditingGoal(null)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
