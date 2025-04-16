import { Card, CardContent } from "@/components/ui/card"
import { Mail, MessageSquare, Github, Linkedin } from "lucide-react"

const Contact = () => {
  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      description: "Drop me a line at",
      value: "contact@jaywyawhare.com",
      href: "mailto:contact@jaywyawhare.com"
    },
    {
      icon: <Github className="h-6 w-6" />,
      title: "GitHub",
      description: "Check out my repositories",
      value: "jaywyawhare",
      href: "https://github.com/jaywyawhare"
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      title: "LinkedIn",
      description: "Let's connect",
      value: "jaywyawhare",
      href: "https://linkedin.com/in/jaywyawhare"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Social",
      description: "Follow me on Twitter",
      value: "@jaywyawhare",
      href: "https://twitter.com/jaywyawhare"
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="space-y-8 fade-in">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Get in Touch</h1>
          <p className="text-muted-foreground">Feel free to reach out through any of these channels.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {contactMethods.map((method) => (
            <a 
              key={method.title} 
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="h-full hover:bg-muted/50 transition-colors">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="text-primary">{method.icon}</div>
                  <div>
                    <h3 className="font-medium">{method.title}</h3>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                    <p className="text-sm font-medium mt-1">{method.value}</p>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Contact
