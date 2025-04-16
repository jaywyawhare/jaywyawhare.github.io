import { Brain, Trophy, Shield, Coffee } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const About: React.FC = () => {
  const stats = [
    { icon: <Brain />, label: "AI Projects", value: "5+" },
    { icon: <Trophy />, label: "Hackathons Won", value: "3" },
    { icon: <Shield />, label: "Security Labs", value: "2" },
    { icon: <Coffee />, label: "Coffee Cups", value: "∞" },
  ];

  const skills = {
    "Programming": ["Python", "TypeScript", "C++", "Rust"],
    "AI Tools": ["TensorFlow", "PyTorch", "Scikit-learn"],
    "Security": ["Penetration Testing", "Network Security", "Cryptography"],
    "Web Dev": ["React", "Node.js", "TailwindCSS"],
    "Cloud": ["AWS", "Docker", "Kubernetes"]
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold gradient-text">About Me</h1>
          <p className="text-lg text-muted-foreground">
            I'm a software engineer passionate about AI, cybersecurity, and building 
            innovative solutions. Currently exploring the intersection of machine learning 
            and security.
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(skills).map((category) => (
              <Badge key={category} variant="secondary">{category}</Badge>
            ))}
          </div>

          <div className="border-t pt-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">Experience & Education</h2>
            <div className="space-y-4">
              {/* Add your experience/education timeline here */}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ icon, label, value }) => (
              <Card key={label} className="p-4 flex flex-col items-center text-center hover:bg-muted/50 transition-colors">
                <div className="text-primary mb-2">{icon}</div>
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="mb-4">
                <h3 className="text-lg font-medium mb-2">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
