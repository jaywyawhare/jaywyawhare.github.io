import { FileText, Calendar, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import aboutData from '@/content/about.json';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Socials from '@/components/Socials';
import { useTheme } from '@/components/theme-provider';

// Define the interface for experience items  
interface ExperienceItem {
  role: string;
  title: string;
  period: string;
  description: string;
  tags: string[];
  highlights?: string[]; // Make highlights optional
  demoUrl?: string; // Add this line
}

const ExperienceCard = ({ experience }: { experience: ExperienceItem }) => {
  const { theme } = useTheme();
  const isMinimal = theme === 'minimal';

  if (isMinimal) {
    const CardContent = () => (
      <div className="py-5 px-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-base">{experience.role}</span>
              <span className="text-sm text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground">
                {experience.title}
              </span>
            </div>
            <p className="text-sm text-muted-foreground/80">{experience.description}</p>
          </div>
          <time className="text-xs text-muted-foreground whitespace-nowrap">
            {experience.period}
          </time>
        </div>
      </div>
    );

    if (experience.demoUrl) {
      return (
        <a 
          href={experience.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Card className="group relative border-0 hover:bg-accent/50 transition-colors hover:text-primary">
            <CardContent />
          </Card>
        </a>
      );
    }

    return (
      <Card className="group relative border-0 hover:bg-accent/50 transition-colors">
        <CardContent />
      </Card>
    );
  }

  const CardContent = () => (
    <div className={cn(
      "space-y-2 p-4 rounded-2xl transition-all duration-300",
      experience.demoUrl && "hover:bg-primary/5 cursor-pointer"
    )}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-xl cyber-text">
          {experience.role}
        </h3>
        <span className="text-muted-foreground px-3 py-1 text-sm bg-primary/5 rounded-full">
          {experience.period}
        </span>
      </div>
      <p className="text-primary text-lg">
        {experience.title}
      </p>
      <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
      {experience.highlights && (
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          {experience.highlights.map((highlight: string, i: number) => (
            <li key={i}>{highlight}</li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap gap-2 mt-2">
        {experience.tags.map((tag) => (
          <Badge 
            key={tag} 
            variant="secondary"
            className="bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );

  if (experience.demoUrl) {
    return (
      <a 
        href={experience.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "relative block",
          "pl-8 border-l border-primary/20 group"
        )}
      >
        <div className="absolute -left-[0.4375rem] top-6 w-3.5 h-3.5 rounded-full border-2 border-primary/20 bg-primary/80 
          transform group-hover:scale-125 transition-transform duration-300 
          group-hover:border-primary/50 group-hover:bg-primary" 
        />
        <CardContent />
      </a>
    );
  }

  return (
    <div className={cn(
      "relative",
      "pl-8 border-l border-primary/20 group"
    )}>
      <div className="absolute -left-[0.4375rem] top-6 w-3.5 h-3.5 rounded-full border-2 border-primary/20 bg-primary/80 
        transform group-hover:scale-125 transition-transform duration-300 
        group-hover:border-primary/50 group-hover:bg-primary" 
      />
      <CardContent />
    </div>
  );
};

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  const isMinimal = theme === 'minimal';

  return (
    <div className="min-h-screen relative">
      {!isMinimal && <Socials />}
      <section className={cn(
        "relative",
        isMinimal ? "py-8" : "min-h-[95vh] py-12"
      )}>
        <div className={cn(
          "mx-auto px-6",
          isMinimal ? "max-w-3xl" : "max-w-6xl"
        )}>
          {isMinimal ? (
            <div className="space-y-10">
              <header className="space-y-4">
                <h1 className="text-2xl font-mono">
                  {aboutData.name}
                </h1>
                <div className="space-y-3">
                  <p className="text-base text-muted-foreground/90 leading-relaxed">
                    {aboutData.tagline}
                  </p>
                </div>
              </header>

              <section className="space-y-4">
                <h2 className="text-lg font-mono">Experience</h2>
                <div className="border rounded-lg border-border/50 divide-y divide-border/50">
                  {aboutData.experiences.map((exp, i) => (
                    <ExperienceCard key={i} experience={exp} />
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-4 grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-secondary animate-gradient-x p-6 backdrop-blur-sm rounded-2xl whitespace-nowrap">
                  {aboutData.name}
                </h1>
                <p className="text-xl text-muted-foreground/90 leading-relaxed max-w-2xl backdrop-blur-sm bg-background/5 p-6 rounded-2xl">
                  {aboutData.tagline}
                </p>
                <div className="backdrop-blur-sm bg-background/5 p-6 rounded-2xl">
                  <div className="flex flex-wrap gap-3 justify-start">
                    {aboutData.roles.map((role) => (
                      <Badge 
                        key={role} 
                        variant="secondary" 
                        className="px-6 py-2 text-sm bg-primary/5 hover:bg-primary/15 transition-all duration-300 hover:scale-105"
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="backdrop-blur-sm bg-background/5 p-6 rounded-2xl">
                  <div className="flex flex-row items-center justify-start gap-6">
                    {[
                      { 
                        icon: FileText, 
                        text: "Resume",
                        subtext: "Download CV",
                        href: aboutData.resumeUrl,
                        external: true 
                      },
                      { 
                        icon: Calendar, 
                        text: "Meeting",
                        subtext: "Schedule Call",
                        href: aboutData.meetingUrl,
                        external: true 
                      },
                    ].map(({ icon: Icon, text, subtext, href, external }) => (
                      <a 
                        key={text} 
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="group flex-1"
                      >
                        <button className="
                          w-full px-6 py-4 rounded-xl
                          bg-primary/5 hover:bg-primary/10
                          border border-primary/10 hover:border-primary/20
                          transition-all duration-300
                          group-hover:shadow-lg group-hover:shadow-primary/5
                          relative overflow-hidden
                        ">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="
                                p-2 rounded-lg
                                bg-primary/10 group-hover:bg-primary/15
                                transition-colors duration-300
                              ">
                                <Icon size={20} className="text-primary" />
                              </div>
                              
                              <div className="text-left">
                                <div className="text-sm font-medium text-foreground">
                                  {text}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {subtext}
                                </div>
                              </div>
                            </div>

                            <ArrowRight className="
                              w-4 h-4 text-primary/50
                              transform translate-x-0 group-hover:translate-x-1
                              transition-transform duration-300
                            " />
                          </div>
                        </button>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative aspect-rectangle animate-float hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[2rem] blur-3xl animate-pulse-slow"></div>
                <img 
                  src={aboutData.image}
                  alt={aboutData.name}
                  className="relative z-10 rounded-[2rem] object-cover w-full h-full cyber-border-advanced p-4 glass-card-modern shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {!isMinimal && (
        <section className="relative py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="space-y-16">
              <div className="space-y-2">
                <h2 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  Experience
                </h2>
                <p className="text-muted-foreground/80">
                  My professional journey and achievements
                </p>
              </div>
              
              <div 
                className="group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Card className={cn(
                  "p-8 backdrop-blur-lg bg-card/30 hover:border-primary/20 transition-all duration-500 transform-gpu scale-100 hover:scale-[1.02] cyber-card overflow-hidden rounded-2xl",
                  isHovered ? "shadow-xl shadow-primary/10" : ""
                )}>
                  <div className="space-y-8">
                    {aboutData.experiences.map((exp: ExperienceItem, i: number) => (
                      <ExperienceCard key={i} experience={exp} />
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
