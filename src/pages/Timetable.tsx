import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const Timetable = () => {
  const [selectedDay, setSelectedDay] = useState(0);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  const schedule = {
    0: [
      { time: "09:00 - 10:00", subject: "Data Structures", room: "LH-201", professor: "Dr. Smith", color: "bg-primary/10 border-primary" },
      { time: "10:00 - 11:00", subject: "Algorithms", room: "LH-201", professor: "Dr. Smith", color: "bg-primary/10 border-primary" },
      { time: "11:00 - 12:00", subject: "Operating Systems", room: "LH-305", professor: "Dr. Johnson", color: "bg-accent/10 border-accent" },
      { time: "02:00 - 03:00", subject: "Database Management", room: "LH-102", professor: "Dr. Williams", color: "bg-success/10 border-success" },
    ],
    1: [
      { time: "09:00 - 10:00", subject: "Computer Networks", room: "LH-203", professor: "Dr. Brown", color: "bg-secondary/10 border-secondary" },
      { time: "11:00 - 12:00", subject: "Software Engineering", room: "LH-401", professor: "Dr. Davis", color: "bg-primary/10 border-primary" },
      { time: "02:00 - 03:00", subject: "Web Development", room: "Lab-1", professor: "Dr. Wilson", color: "bg-accent/10 border-accent" },
    ],
    2: [
      { time: "09:00 - 10:00", subject: "Machine Learning", room: "LH-501", professor: "Dr. Taylor", color: "bg-success/10 border-success" },
      { time: "10:00 - 11:00", subject: "AI Fundamentals", room: "LH-501", professor: "Dr. Taylor", color: "bg-success/10 border-success" },
      { time: "02:00 - 03:00", subject: "Project Work", room: "Lab-2", professor: "Multiple", color: "bg-secondary/10 border-secondary" },
    ],
    3: [
      { time: "09:00 - 10:00", subject: "Data Structures", room: "LH-201", professor: "Dr. Smith", color: "bg-primary/10 border-primary" },
      { time: "11:00 - 12:00", subject: "Operating Systems", room: "LH-305", professor: "Dr. Johnson", color: "bg-accent/10 border-accent" },
      { time: "02:00 - 04:00", subject: "Lab Session", room: "Lab-1", professor: "Dr. Anderson", color: "bg-destructive/10 border-destructive" },
    ],
    4: [
      { time: "09:00 - 10:00", subject: "Computer Networks", room: "LH-203", professor: "Dr. Brown", color: "bg-secondary/10 border-secondary" },
      { time: "10:00 - 11:00", subject: "Software Engineering", room: "LH-401", professor: "Dr. Davis", color: "bg-primary/10 border-primary" },
      { time: "11:00 - 12:00", subject: "Database Management", room: "LH-102", professor: "Dr. Williams", color: "bg-success/10 border-success" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="pt-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Timetable
          </h1>
          <p className="text-muted-foreground mt-1">Your weekly class schedule</p>
        </div>

        {/* Day Selector */}
        <Card className="shadow-lg border-primary/10 bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedDay(Math.max(0, selectedDay - 1))}
                disabled={selectedDay === 0}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="flex-1 flex gap-2 overflow-x-auto">
                {days.map((day, index) => (
                  <Button
                    key={day}
                    variant={selectedDay === index ? "default" : "outline"}
                    className={`flex-1 min-w-[80px] ${
                      selectedDay === index ? "bg-gradient-primary shadow-md" : ""
                    }`}
                    onClick={() => setSelectedDay(index)}
                  >
                    {day.slice(0, 3)}
                  </Button>
                ))}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedDay(Math.min(4, selectedDay + 1))}
                disabled={selectedDay === 4}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Schedule */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">{days[selectedDay]}</h2>
          {schedule[selectedDay as keyof typeof schedule].map((class_item, index) => (
            <Card
              key={index}
              className={`shadow-md border-2 ${class_item.color} hover:shadow-lg transition-all duration-300`}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{class_item.subject}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-semibold">{class_item.time}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Professor</span>
                  <span className="font-medium">{class_item.professor}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Room
                  </span>
                  <span className="font-medium text-primary">{class_item.room}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timetable;
