import { FileText, Book, Archive } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import aboutData from '@/content/about.json';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      {/* Hero Section */}
      <section className="min-h-[95vh] flex items-center relative border-b border-primary/10">
        <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-8 animate-fade-up">
                <h1 className="text-5xl sm:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-secondary animate-gradient-x">
                  {aboutData.name}
                </h1>
                <p className="text-xl text-muted-foreground/90 leading-relaxed max-w-2xl backdrop-blur-sm bg-background/5 p-4 rounded-xl border border-primary/5">
                  {aboutData.tagline}
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {aboutData.roles.map((role) => (
                    <Badge key={role} variant="secondary" 
                      className="px-6 py-2 text-sm backdrop-blur-md bg-primary/5 
                        hover:bg-primary/10 transition-all duration-300 
                        hover:scale-105 border border-primary/10 shadow-sm">
                      {role}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex flex-row items-center justify-center gap-4 pt-6">
                  {[
                    { icon: FileText, text: "View\nProjects", href: "/projects" },
                    { icon: Book, text: "Read\nBlog", href: "/blog" },
                    { icon: Archive, text: "Download\nResume" }
                  ].map(({ icon: Icon, text, href }) => {
                    const buttonClassName = `
                      inline-flex items-center gap-4 px-6 py-3 rounded-xl
                      bg-gradient-to-r from-primary/10 to-secondary/10
                      hover:from-primary/20 hover:to-secondary/20
                      border border-primary/10 hover:border-primary/20
                      transition-all duration-300 text-sm font-medium
                      hover:scale-105 hover:shadow-lg hover:shadow-primary/5
                      backdrop-blur-md w-40 justify-between min-h-[60px]
                      group relative overflow-hidden
                    `;
                    
                    const ButtonContent = () => (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Icon size={18} className="text-primary flex-shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                        <span className="whitespace-pre-line text-right leading-tight flex-grow relative z-10 group-hover:translate-x-1 transition-transform duration-300">{text}</span>
                      </>
                    );
                    
                    return href ? (
                      <a key={text} href={href} className="w-40">
                        <button className={buttonClassName}>
                          <ButtonContent />
                        </button>
                      </a>
                    ) : (
                      <button key={text} className={buttonClassName}>
                        <ButtonContent />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="relative aspect-rectangle animate-float hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2rem] blur-3xl animate-pulse-slow" />
              <img 
                src={aboutData.image}
                alt={aboutData.name}
                className="rounded-[2rem] object-cover w-full h-full cyber-border-advanced p-4 glass-card-modern shadow-2xl hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="space-y-16">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Experience
              </h2>
              <p className="text-muted-foreground/80">My professional journey and achievements</p>
            </div>
            
            <div className="space-y-12 relative">
              {aboutData.experiences.map((exp, i) => (
                <div 
                  key={i}
                  className="ml-16 relative glass-card-modern p-8 rounded-xl
                    group hover:shadow-xl hover:shadow-primary/10 
                    transition-all duration-500 ease-out
                    border border-primary/10 hover:border-primary/20
                    backdrop-blur-md bg-gradient-to-r from-background/30 to-background/20
                    hover:from-background/40 hover:to-background/30"
                >
                  <div className="absolute -left-8 top-1/2 -translate-y-1/2 -translate-x-1/2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 backdrop-blur-md 
                      flex items-center justify-center border border-primary/20
                      shadow-inner shadow-primary/10 group-hover:scale-110 transition-transform duration-500">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary group-hover:animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-primary/90">{exp.role}</h3>
                        <p className="text-muted-foreground text-sm">{exp.title}</p>
                      </div>
                      <span className="text-sm text-muted-foreground bg-primary/5 px-3 py-1 rounded-full">{exp.period}</span>
                    </div>
                    <p className="text-muted-foreground/90 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="bg-primary/5 hover:bg-primary/10 transition-colors">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
