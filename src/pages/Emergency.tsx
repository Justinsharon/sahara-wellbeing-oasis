
import { Phone, Heart, Shield, Clock, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const emergencyContacts = [
  {
    name: "National Suicide Prevention Lifeline",
    number: "988",
    description: "24/7 crisis support",
    type: "crisis"
  },
  {
    name: "Crisis Text Line",
    number: "741741",
    description: "Text HOME to 741741",
    type: "text"
  },
  {
    name: "Emergency Services",
    number: "911",
    description: "Immediate emergency assistance",
    type: "emergency"
  },
  {
    name: "SAMHSA National Helpline",
    number: "1-800-662-4357",
    description: "Mental health & substance abuse",
    type: "helpline"
  }
];

const quickTips = [
  {
    icon: Heart,
    title: "Breathe Deeply",
    description: "Take 5 deep breaths. In for 4 counts, hold for 4, out for 6."
  },
  {
    icon: Shield,
    title: "Ground Yourself",
    description: "Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste."
  },
  {
    icon: Users,
    title: "Reach Out",
    description: "Contact a trusted friend, family member, or mental health professional."
  },
  {
    icon: Clock,
    title: "This Will Pass",
    description: "Remember that intense feelings are temporary and will subside."
  }
];

export default function Emergency() {
  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="min-h-screen bg-red-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-red-800 mb-4">
            Emergency Support
          </h1>
          <p className="text-lg text-red-700 max-w-2xl mx-auto">
            If you're in crisis or need immediate help, you're not alone. Reach out now.
          </p>
        </div>

        {/* Crisis Alert */}
        <Card className="border-red-200 bg-red-100 mb-8">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-red-800 mb-2">
                Are you having thoughts of suicide or self-harm?
              </h2>
              <p className="text-red-700 mb-4">
                Please call 988 immediately or go to your nearest emergency room.
              </p>
              <Button 
                onClick={() => handleCall("988")}
                className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-3"
                size="lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call 988 Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {emergencyContacts.map((contact, index) => (
            <Card key={index} className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  {contact.name}
                </CardTitle>
                <CardDescription className="text-red-600">
                  {contact.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => handleCall(contact.number)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  size="lg"
                >
                  Call {contact.number}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Mental Health Tips */}
        <Card className="border-red-200 mb-8">
          <CardHeader>
            <CardTitle className="text-red-800">Quick Mental Health Tips</CardTitle>
            <CardDescription className="text-red-600">
              Immediate techniques to help you cope right now
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <tip.icon className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800 mb-1">{tip.title}</h3>
                    <p className="text-red-700 text-sm">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-800">Additional Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50" asChild>
                <a href="/therapy">
                  <Users className="w-4 h-4 mr-2" />
                  Find a Therapist
                </a>
              </Button>
              <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50" asChild>
                <a href="/chat">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat with Nia AI
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
