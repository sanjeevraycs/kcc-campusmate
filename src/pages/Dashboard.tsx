import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, GraduationCap, TrendingUp, Bell, Car, AlertCircle, Vote, Package, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Attendance", value: "85%", icon: GraduationCap, color: "text-primary" },
    { label: "GPA", value: "8.5", icon: TrendingUp, color: "text-success" },
    { label: "Pending Tasks", value: "3", icon: Bell, color: "text-accent" },
  ];

  const quickActions = [
    { label: "Timetable", icon: Calendar, path: "/timetable", gradient: "from-primary to-primary-glow" },
    { label: "Cab Sharing", icon: Car, path: "/cab-sharing", gradient: "from-accent to-accent/80" },
    { label: "Complaints", icon: AlertCircle, path: "/complaints", gradient: "from-destructive to-destructive/80" },
    { label: "Marketplace", icon: Package, path: "/marketplace", gradient: "from-success to-success/80" },
    { label: "Elections", icon: Vote, path: "/elections", gradient: "from-secondary to-secondary/80" },
    { label: "Quick Links", icon: ExternalLink, path: "/quick-links", gradient: "from-primary-glow to-accent" },
  ];

  const todaySchedule = [
    { time: "09:00 AM", subject: "Data Structures", room: "LH-201", professor: "Dr. Smith" },
    { time: "11:00 AM", subject: "Operating Systems", room: "LH-305", professor: "Dr. Johnson" },
    { time: "02:00 PM", subject: "Database Management", room: "LH-102", professor: "Dr. Williams" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4 pb-24">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="pt-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome back, Student!
          </h1>
          <p className="text-muted-foreground mt-1">Here's what's happening today</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="shadow-md border-primary/10 bg-gradient-card">
              <CardContent className="p-4 space-y-2">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="group"
              >
                <Card className="shadow-md border-primary/10 hover:shadow-glow transition-all duration-300 overflow-hidden h-full">
                  <CardContent className="p-4 space-y-3 relative">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-medium">{action.label}</p>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <Card className="shadow-lg border-primary/10 bg-gradient-card">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaySchedule.map((class_item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="space-y-1">
                  <p className="font-semibold">{class_item.subject}</p>
                  <p className="text-sm text-muted-foreground">{class_item.professor}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-medium text-primary">{class_item.time}</p>
                  <p className="text-xs text-muted-foreground">{class_item.room}</p>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/timetable")}
            >
              View Full Timetable
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
