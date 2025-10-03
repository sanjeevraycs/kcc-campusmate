import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, BookOpen, Coffee, Calendar, Heart, Library, CreditCard } from "lucide-react";

const QuickLinks = () => {
  const links = [
    {
      id: 1,
      title: "Academic Portal",
      description: "Access grades, courses, and assignments",
      icon: BookOpen,
      url: "#",
      gradient: "from-primary to-primary-glow",
    },
    {
      id: 2,
      title: "Library Services",
      description: "Browse books and reserve study rooms",
      icon: Library,
      url: "#",
      gradient: "from-secondary to-secondary/80",
    },
    {
      id: 3,
      title: "Cafeteria Menu",
      description: "Today's menu and meal plans",
      icon: Coffee,
      url: "#",
      gradient: "from-accent to-accent/80",
    },
    {
      id: 4,
      title: "Event Calendar",
      description: "Upcoming campus events and activities",
      icon: Calendar,
      url: "#",
      gradient: "from-success to-success/80",
    },
    {
      id: 5,
      title: "Welfare Services",
      description: "Health, counseling, and support",
      icon: Heart,
      url: "#",
      gradient: "from-destructive to-destructive/80",
    },
    {
      id: 6,
      title: "Fee Payment",
      description: "Pay fees and view transactions",
      icon: CreditCard,
      url: "#",
      gradient: "from-primary-glow to-accent",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="pt-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Quick Links
          </h1>
          <p className="text-muted-foreground mt-1">Access important campus portals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="shadow-md border-primary/10 hover:shadow-glow transition-all duration-300 h-full">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <link.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {link.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {link.description}
                      </p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground shrink-0" />
                  </div>
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickLinks;
