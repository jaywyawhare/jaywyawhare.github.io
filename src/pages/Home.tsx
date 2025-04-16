import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Code, Shield, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const skills = {
  "Programming": ["Python", "TypeScript", "C++", "Rust"],
  "AI Tools": ["TensorFlow", "PyTorch", "Scikit-learn"],
  "Security": ["Penetration Testing", "Network Security"],
  "Web Dev": ["React", "Node.js", "TailwindCSS"],
};

const contactMethods = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email",
    value: "contact@jaywyawhare.com",
    href: "mailto:contact@jaywyawhare.com"
  },
  {
    icon: <Github className="h-6 w-6" />,
    title: "GitHub",
    value: "jaywyawhare",
    href: "https://github.com/jaywyawhare"
  },
  {
    icon: <Linkedin className="h-6 w-6" />,
    title: "LinkedIn",
    value: "jaywyawhare",
    href: "https://linkedin.com/in/jaywyawhare"
  },
  {
    icon: <Twitter className="h-6 w-6" />,
    title: "Twitter",
    value: "@jaywyawhare",
    href: "https://twitter.com/jaywyawhare"
  }
];

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center relative">
        <div className="max-w-5xl mx-auto px-6 py-32 space-y-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-up">
              <h1 className="text-6xl sm:text-7xl font-bold tracking-tighter cyber-glitch" data-text="Jay Wyawhare">
                Jay Wyawhare
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground/90 max-w-2xl leading-relaxed matrix-bg p-4 rounded-lg">
                Building intelligent systems at the intersection of AI and security.
              </p>
              <div className="flex flex-wrap gap-6">
                <Button asChild size="lg" className="cyber-border group">
                  <Link to="/projects">
                    View Projects
                    <ArrowRight className="ml-2 h-4 w-4 transition-all group-hover:translate-x-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="cyber-border">
                  <Link to="/blog">
                    <Brain className="mr-2 h-4 w-4" />
                    Read Blog
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative aspect-rectangle animate-float">
              <img 
                src="/image.png" 
                alt="Jay Wyawhare"
                className="rounded-2xl object-cover w-full h-full cyber-border p-2"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/90 to-background/0" />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 pt-12 animate-fade-in">
            {[
              { icon: <Brain />, text: "5+ AI Projects" },
              { icon: <Code />, text: "3 Hackathons Won" },
              { icon: <Shield />, text: "2 Security Labs" },
            ].map((item, i) => (
              <div 
                key={i} 
                className="flex items-center gap-4 p-6 rounded-xl glass-card-interactive"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-primary text-lg">{item.icon}</div>
                <span className="font-medium text-lg">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold gradient-text">About Me</h2>
              <p className="text-lg text-muted-foreground">
                I create intelligent systems, break digital walls, and occasionally argue with C. 
                Currently exploring the intersection of machine learning and security.
              </p>
              <div className="space-y-4">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-lg font-medium mb-2">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map(skill => (
                        <Badge key={skill} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Brain />, text: "5+ AI Projects" },
                { icon: <Code />, text: "3 Hackathons Won" },
                { icon: <Shield />, text: "2 Security Labs" },
                { icon: <Mail />, text: "Always Available" },
              ].map((item, i) => (
                <Card key={i} className="p-4 glass-card-interactive">
                  <CardContent className="flex flex-col items-center text-center p-4">
                    <div className="text-primary mb-2">{item.icon}</div>
                    <p className="font-medium">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold gradient-text mb-12">Get in Touch</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method) => (
              <a 
                key={method.title} 
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="h-full hover:bg-muted/50 transition-colors">
                  <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                    <div className="text-primary">{method.icon}</div>
                    <div>
                      <h3 className="font-medium">{method.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{method.value}</p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
