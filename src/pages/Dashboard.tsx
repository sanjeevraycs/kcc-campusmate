import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  ShoppingBag, 
  Bell,
  TrendingUp,
  FileText,
  Car,
  Search,
  AlertCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    attendance: 0,
    notices: 0,
    events: 0,
    messages: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
        return;
      }

      const [profileRes, attendanceRes, noticesRes, eventsRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", user.id).single(),
        supabase.from("attendance").select("*").eq("user_id", user.id),
        supabase.from("notices").select("count"),
        supabase.from("events").select("count").gte("start_time", new Date().toISOString()),
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      
      const attendance = attendanceRes.data || [];
      const present = attendance.filter(a => a.status === "present").length;
      const percentage = attendance.length > 0 ? Math.round((present / attendance.length) * 100) : 0;

      setStats({
        attendance: percentage,
        notices: (noticesRes.data as any)?.[0]?.count || 0,
        events: (eventsRes.data as any)?.[0]?.count || 0,
        messages: 0
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const features = [
    { icon: TrendingUp, title: "Attendance", description: "Track your attendance", color: "text-blue-500", path: "/attendance" },
    { icon: BookOpen, title: "Timetable", description: "View class schedule", color: "text-green-500", path: "/timetable" },
    { icon: Bell, title: "Notices", description: "Campus announcements", color: "text-yellow-500", path: "/notices" },
    { icon: Calendar, title: "Events", description: "Upcoming events", color: "text-purple-500", path: "/events" },
    { icon: ShoppingBag, title: "Marketplace", description: "Buy & sell items", color: "text-orange-500", path: "/marketplace" },
    { icon: MessageSquare, title: "Chat", description: "Connect with peers", color: "text-pink-500", path: "/chat" },
    { icon: Car, title: "Cab Sharing", description: "Share rides", color: "text-cyan-500", path: "/cab-sharing" },
    { icon: Search, title: "Lost & Found", description: "Find lost items", color: "text-indigo-500", path: "/lost-found" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4 pb-24">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="pt-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome, {profile?.full_name || "Student"}!
          </h1>
          <p className="text-muted-foreground mt-1">{profile?.course} • Year {profile?.year}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-md border-primary/10">
            <CardContent className="pt-6 text-center">
              <div className={`text-3xl font-bold ${stats.attendance >= 75 ? 'text-success' : 'text-destructive'}`}>
                {stats.attendance}%
              </div>
              <p className="text-sm text-muted-foreground mt-1">Attendance</p>
            </CardContent>
          </Card>
          <Card className="shadow-md border-primary/10">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary">{stats.notices}</div>
              <p className="text-sm text-muted-foreground mt-1">New Notices</p>
            </CardContent>
          </Card>
          <Card className="shadow-md border-primary/10">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-accent">{stats.events}</div>
              <p className="text-sm text-muted-foreground mt-1">Upcoming Events</p>
            </CardContent>
          </Card>
          <Card className="shadow-md border-primary/10">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-secondary">{stats.messages}</div>
              <p className="text-sm text-muted-foreground mt-1">Messages</p>
            </CardContent>
          </Card>
        </div>

        {stats.attendance < 75 && (
          <Card className="shadow-md border-destructive/50 bg-destructive/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                <div>
                  <p className="font-semibold text-destructive">Low Attendance Alert</p>
                  <p className="text-sm text-muted-foreground">Your attendance is below 75%. Please attend more classes.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div>
          <h2 className="text-xl font-bold mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                onClick={() => navigate(feature.path)}
                className="shadow-md border-primary/10 hover:shadow-lg transition-all duration-300 cursor-pointer group animate-fade-in"
              >
                <CardContent className="pt-6 text-center space-y-3">
                  <feature.icon className={`w-10 h-10 mx-auto ${feature.color} group-hover:scale-110 transition-transform`} />
                  <div>
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
