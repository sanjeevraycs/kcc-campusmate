import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, BookOpen, Calendar, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  const studentInfo = {
    name: "John Doe",
    rollNumber: "CS2023001",
    email: "john.doe@college.edu",
    phone: "+91 98765 43210",
    course: "Computer Science Engineering",
    year: "3rd Year",
    semester: "6th Semester",
    attendance: "85%",
    gpa: "8.5",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="pt-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Profile
          </h1>
          <p className="text-muted-foreground mt-1">Manage your account information</p>
        </div>

        {/* Profile Header */}
        <Card className="shadow-lg border-primary/10 bg-gradient-card">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24 border-4 border-primary/20">
                <AvatarFallback className="text-2xl bg-gradient-primary text-primary-foreground">
                  {studentInfo.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-bold">{studentInfo.name}</h2>
                <p className="text-muted-foreground">{studentInfo.rollNumber}</p>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                  Verified Student
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Info */}
        <Card className="shadow-md border-primary/10">
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Course
                </p>
                <p className="font-medium">{studentInfo.course}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Year
                </p>
                <p className="font-medium">{studentInfo.year}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Semester</p>
                <p className="font-medium">{studentInfo.semester}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">GPA</p>
                <p className="font-medium text-success">{studentInfo.gpa}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="shadow-md border-primary/10">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{studentInfo.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{studentInfo.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start" size="lg">
            <Settings className="w-5 h-5 mr-3" />
            Settings & Preferences
          </Button>
          <Button
            variant="destructive"
            className="w-full justify-start"
            size="lg"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
