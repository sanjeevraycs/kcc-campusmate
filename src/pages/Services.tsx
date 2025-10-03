import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, AlertCircle, LogIn, Vote, Search, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Cab Sharing",
      description: "Find rides or offer your cab to fellow students",
      icon: Car,
      path: "/cab-sharing",
      gradient: "from-accent to-accent/80",
    },
    {
      title: "Complaints",
      description: "Report and track campus issues",
      icon: AlertCircle,
      path: "/complaints",
      gradient: "from-destructive to-destructive/80",
    },
    {
      title: "Gate Logs",
      description: "View your entry and exit records",
      icon: LogIn,
      path: "/gate-logs",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Elections",
      description: "Vote in campus elections",
      icon: Vote,
      path: "/elections",
      gradient: "from-secondary to-secondary/80",
    },
    {
      title: "Lost & Found",
      description: "Find lost items or report found ones",
      icon: Search,
      path: "/lost-found",
      gradient: "from-success to-success/80",
    },
    {
      title: "Quick Links",
      description: "Access important campus portals",
      icon: ExternalLink,
      path: "/quick-links",
      gradient: "from-primary-glow to-accent",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="pt-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Campus Services
          </h1>
          <p className="text-muted-foreground mt-1">All your campus needs in one place</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <button
              key={service.title}
              onClick={() => navigate(service.path)}
              className="group text-left"
            >
              <Card className="shadow-md border-primary/10 hover:shadow-glow transition-all duration-300 h-full">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
