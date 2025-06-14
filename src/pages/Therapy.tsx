
import { useState } from "react";
import { Search, Filter, Star, Clock, DollarSign, Video, Phone, MessageSquare, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Therapist } from "@/types";

const mockTherapists: Therapist[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    image: "/placeholder.svg",
    specializations: ["Anxiety", "Depression", "PTSD"],
    languages: ["English", "Spanish"],
    session_types: ["video", "audio", "chat"],
    description: "Licensed clinical psychologist with 15 years of experience specializing in trauma-informed care and cognitive behavioral therapy.",
    rating: 4.9,
    experience_years: 15,
    fee_per_session: 150,
    availability: ["Monday", "Wednesday", "Friday"],
    contact_info: {
      email: "dr.johnson@sahara.com",
      phone: "+1-555-0123"
    }
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    image: "/placeholder.svg",
    specializations: ["Relationship Issues", "Family Therapy", "Stress Management"],
    languages: ["English", "Mandarin"],
    session_types: ["video", "audio"],
    description: "Marriage and family therapist helping couples and families build stronger relationships through evidence-based approaches.",
    rating: 4.8,
    experience_years: 12,
    fee_per_session: 120,
    availability: ["Tuesday", "Thursday", "Saturday"],
    contact_info: {
      email: "dr.chen@sahara.com"
    }
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    image: "/placeholder.svg",
    specializations: ["Teen Counseling", "ADHD", "Learning Disabilities"],
    languages: ["English", "Spanish"],
    session_types: ["video", "chat"],
    description: "Child and adolescent psychologist dedicated to helping young people navigate challenges and build resilience.",
    rating: 4.9,
    experience_years: 8,
    fee_per_session: 130,
    availability: ["Monday", "Tuesday", "Thursday"],
    contact_info: {
      email: "dr.rodriguez@sahara.com",
      phone: "+1-555-0456"
    }
  }
];

export default function Therapy() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [filteredTherapists, setFilteredTherapists] = useState(mockTherapists);

  const specializations = Array.from(
    new Set(mockTherapists.flatMap(t => t.specializations))
  );

  const languages = Array.from(
    new Set(mockTherapists.flatMap(t => t.languages))
  );

  const handleFilter = () => {
    let filtered = mockTherapists;

    if (searchTerm) {
      filtered = filtered.filter(therapist =>
        therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        therapist.specializations.some(spec => 
          spec.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (selectedSpecialization && selectedSpecialization !== "all") {
      filtered = filtered.filter(therapist =>
        therapist.specializations.includes(selectedSpecialization)
      );
    }

    if (selectedLanguage && selectedLanguage !== "all") {
      filtered = filtered.filter(therapist =>
        therapist.languages.includes(selectedLanguage)
      );
    }

    setFilteredTherapists(filtered);
  };

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "audio":
        return <Phone className="w-4 h-4" />;
      case "chat":
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <Video className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Find Your Therapist
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Connect with licensed mental health professionals who understand your needs.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search therapists or specializations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger>
                  <SelectValue placeholder="Specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  {specializations.map(spec => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {languages.map(lang => (
                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4">
              <Button onClick={handleFilter} className="w-full md:w-auto">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Therapist Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTherapists.map((therapist) => (
            <Card key={therapist.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <img
                    src={therapist.image}
                    alt={therapist.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-xl">{therapist.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{therapist.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{therapist.experience_years} years</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-sm">${therapist.fee_per_session}/session</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {therapist.description}
                </CardDescription>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Specializations</h4>
                    <div className="flex flex-wrap gap-2">
                      {therapist.specializations.map((spec, index) => (
                        <Badge key={index} variant="secondary">{spec}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {therapist.languages.map((lang, index) => (
                        <Badge key={index} variant="outline">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Session Types</h4>
                    <div className="flex gap-2">
                      {therapist.session_types.map((type, index) => (
                        <div key={index} className="flex items-center gap-1 text-sm text-muted-foreground">
                          {getSessionTypeIcon(type)}
                          <span className="capitalize">{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Available Days</h4>
                    <div className="flex flex-wrap gap-1">
                      {therapist.availability.map((day, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{day}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex gap-2">
                  <Button asChild className="flex-1">
                    <Link to={`/therapy/${therapist.id}`}>
                      View Profile
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to={`/therapy/${therapist.id}/book`}>
                      Book Session
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTherapists.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No therapists found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or clear filters to see all available therapists.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
