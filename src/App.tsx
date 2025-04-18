import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import Home from '@/pages/Home';
import Projects from '@/pages/Projects';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import NotFound from '@/pages/NotFound';
import { AdminRedirect } from '@/components/AdminRedirect';
import ParticleBackground from '@/components/ParticleBackground';
import MouseFollower from '@/components/MouseFollower';

const AppContent = () => {
  const { theme } = useTheme();
  const isMinimal = theme === 'minimal';

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!isMinimal && <ParticleBackground />}
      {!isMinimal && <MouseFollower />}
      <Navigation />
      <main className="pt-16 min-h-screen relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin" element={<AdminRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider defaultTheme="minimal">
      <BrowserRouter basename="/" future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
