import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, TrendingUp, AlertCircle, Brain } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Attendance = () => {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [attendanceRes, coursesRes] = await Promise.all([
        supabase.from("attendance").select("*").eq("user_id", user.id),
        supabase.from("courses").select("*"),
      ]);

      if (attendanceRes.data) setAttendance(attendanceRes.data);
      if (coursesRes.data) setCourses(coursesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePercentage = () => {
    if (attendance.length === 0) return 0;
    const present = attendance.filter(a => a.status === "present").length;
    return Math.round((present / attendance.length) * 100);
  };

  const getPrediction = async () => {
    try {
      const { data: timetable } = await supabase.from("timetable").select("*");
      
      const { data, error } = await supabase.functions.invoke("ai-predict-attendance", {
        body: { attendanceData: attendance, timetableData: timetable },
      });

      if (error) throw error;
      setPrediction(data.prediction);
      toast({ title: "AI Prediction Generated", description: "Check your attendance forecast below" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate prediction", variant: "destructive" });
    }
  };

  const percentage = calculatePercentage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="pt-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Attendance Manager
          </h1>
          <p className="text-muted-foreground mt-1">Track and predict your attendance</p>
        </div>

        <Card className="shadow-lg border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Overall Attendance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">{percentage}%</div>
              <Progress value={percentage} className="h-3" />
            </div>
            
            {percentage < 75 && (
              <div className="flex items-start gap-2 p-4 bg-destructive/10 rounded-lg">
                <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                <div>
                  <p className="font-semibold text-destructive">Low Attendance Warning</p>
                  <p className="text-sm text-muted-foreground">You need to attend more classes to reach 75%</p>
                </div>
              </div>
            )}

            <Button onClick={getPrediction} className="w-full bg-gradient-primary">
              <Brain className="w-4 h-4 mr-2" />
              Generate AI Prediction
            </Button>

            {prediction && (
              <div className="p-4 bg-accent/10 rounded-lg space-y-2">
                <p className="font-semibold flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  AI Prediction
                </p>
                <p className="text-sm whitespace-pre-wrap">{prediction}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Course-wise Attendance</h2>
          {courses.map((course) => {
            const courseAttendance = attendance.filter(a => a.course_id === course.id);
            const present = courseAttendance.filter(a => a.status === "present").length;
            const total = courseAttendance.length;
            const percent = total > 0 ? Math.round((present / total) * 100) : 0;

            return (
              <Card key={course.id} className="shadow-md border-primary/10">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{course.course_name}</h3>
                      <p className="text-sm text-muted-foreground">{course.course_code}</p>
                    </div>
                    <Badge variant={percent >= 75 ? "default" : "destructive"}>
                      {percent}%
                    </Badge>
                  </div>
                  <Progress value={percent} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    {present} / {total} classes attended
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
