import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Socials = () => {
  return (
    <div className="fixed bottom-8 left-8 flex flex-col space-y-4 z-50">
      <a 
        href="https://github.com/jaywyawhare" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="p-2 hover:bg-primary/10 rounded-full transition-colors group"
      >
        <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </a>
      <a 
        href="https://linkedin.com/in/jaywyawhare" 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 hover:bg-primary/10 rounded-full transition-colors group"
      >
        <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </a>
      <a 
        href="https://twitter.com/jaywyawhare" 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 hover:bg-primary/10 rounded-full transition-colors group"
      >
        <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </a>
      <a 
        href="mailto:contact@jaywyawhare.com"
        className="p-2 hover:bg-primary/10 rounded-full transition-colors group"
      >
        <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </a>
    </div>
  );
};

export default Socials;
