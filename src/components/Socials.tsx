import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Socials = () => {
  return (
    <div className="fixed bottom-8 left-8 flex flex-col space-y-4">
      <a href="https://github.com/jaywyawhare" target="_blank" rel="noopener noreferrer" 
         className="text-muted-foreground hover:text-foreground transition-colors">
        <Github size={20} />
      </a>
      <a href="https://linkedin.com/in/jaywyawhare" target="_blank" rel="noopener noreferrer"
         className="text-muted-foreground hover:text-foreground transition-colors">
        <Linkedin size={20} />
      </a>
      <a href="https://twitter.com/jaywyawhare" target="_blank" rel="noopener noreferrer"
         className="text-muted-foreground hover:text-foreground transition-colors">
        <Twitter size={20} />
      </a>
      <a href="mailto:contact@jaywyawhare.com"
         className="text-muted-foreground hover:text-foreground transition-colors">
        <Mail size={20} />
      </a>
    </div>
  );
};

export default Socials;
