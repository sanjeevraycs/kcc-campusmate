import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, CheckCircle2, AlertCircle } from "lucide-react";

const Complaints = () => {
  const complaints = [
    {
      id: 1,
      title: "Broken AC in LH-201",
      category: "Maintenance",
      status: "In Progress",
      date: "2 days ago",
      statusColor: "bg-accent text-accent-foreground",
    },
    {
      id: 2,
      title: "Library WiFi Issues",
      category: "Facilities",
      status: "Resolved",
      date: "5 days ago",
      statusColor: "bg-success text-success-foreground",
    },
    {
      id: 3,
      title: "Cafeteria Food Quality",
      category: "Services",
      status: "Pending",
      date: "1 week ago",
      statusColor: "bg-destructive text-destructive-foreground",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle2 className="w-4 h-4" />;
      case "In Progress":
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="pt-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Complaints
          </h1>
          <p className="text-muted-foreground mt-1">Report and track campus issues</p>
        </div>

        {/* New Complaint Button */}
        <Button className="w-full h-14 bg-gradient-primary shadow-md text-lg">
          <Plus className="w-5 h-5 mr-2" />
          New Complaint
        </Button>

        {/* Complaints List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Complaints</h2>
          {complaints.map((complaint) => (
            <Card key={complaint.id} className="shadow-md border-primary/10 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-lg">{complaint.title}</CardTitle>
                  <Badge className={complaint.statusColor}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(complaint.status)}
                      {complaint.status}
                    </span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <Badge variant="secondary">{complaint.category}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Submitted</span>
                  <span className="font-medium">{complaint.date}</span>
                </div>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Complaints;
