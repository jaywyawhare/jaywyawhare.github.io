import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import Socials from "@/components/Socials";
import Home from '@/pages/Home';
import Projects from '@/pages/Projects';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import NotFound from '@/pages/NotFound';
import { AdminRedirect } from '@/components/AdminRedirect';

function App() {
  return (
    <BrowserRouter basename="/">
      <ThemeProvider defaultTheme="dark">
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          <main className="pt-16 min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/admin" element={<AdminRedirect />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Socials />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
