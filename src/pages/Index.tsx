import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen wellness-gradient">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="heading-xl mb-4">Welcome to Sahara</h1>
          <p className="text-xl text-misty-rosewood-500 mb-8">
            Your personal wellness and mental health companion
          </p>
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/auth">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/personal-growth">Explore Features</Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/personal-growth">Continue Your Journey</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/personal-growth/unified-mood-journal">Track Your Mood</Link>
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Therapy & Counseling</h2>
            <p className="text-gray-600">Connect with licensed therapists for personalized support.</p>
            <Link to="/therapy" className="text-blue-500 hover:underline mt-4 block">Explore Therapy Options</Link>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Community Support</h2>
            <p className="text-gray-600">Join supportive communities and connect with others on similar journeys.</p>
            <Link to="/community" className="text-blue-500 hover:underline mt-4 block">Find Your Community</Link>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Explore & Heal</h2>
            <p className="text-gray-600">Discover resources and tools for self-care and personal growth.</p>
            <Link to="/explore-heal" className="text-blue-500 hover:underline mt-4 block">Start Your Healing Journey</Link>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Insights & Education</h2>
            <p className="text-gray-600">Access articles, guides, and educational content on mental health and wellness.</p>
            <Link to="/insights" className="text-blue-500 hover:underline mt-4 block">Gain Valuable Insights</Link>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Emergency Support</h2>
            <p className="text-gray-600">Get immediate access to crisis hotlines and emergency resources.</p>
            <Link to="/emergency" className="text-blue-500 hover:underline mt-4 block">Find Emergency Support</Link>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">AI Chatbot</h2>
            <p className="text-gray-600">Chat with our AI chatbot for instant support and guidance.</p>
            <Link to="/chat" className="text-blue-500 hover:underline mt-4 block">Start Chatting</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
