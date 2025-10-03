import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Vote, Calendar } from "lucide-react";

const Elections = () => {
  const elections = [
    {
      id: 1,
      title: "Student Council President",
      status: "Active",
      endDate: "March 15, 2025",
      candidates: 4,
    },
    {
      id: 2,
      title: "Sports Captain",
      status: "Active",
      endDate: "March 15, 2025",
      candidates: 3,
    },
    {
      id: 3,
      title: "Cultural Secretary",
      status: "Upcoming",
      endDate: "March 20, 2025",
      candidates: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="pt-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Campus Elections
          </h1>
          <p className="text-muted-foreground mt-1">Vote for your student representatives</p>
        </div>

        <div className="space-y-4">
          {elections.map((election) => (
            <Card key={election.id} className="shadow-md border-primary/10 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                      <Vote className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{election.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          className={
                            election.status === "Active"
                              ? "bg-success text-success-foreground"
                              : "bg-accent text-accent-foreground"
                          }
                        >
                          {election.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {election.candidates} candidates
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Ends on:</span>
                  <span className="font-medium">{election.endDate}</span>
                </div>
                <Button
                  className="w-full bg-gradient-primary"
                  disabled={election.status !== "Active"}
                >
                  {election.status === "Active" ? "Cast Your Vote" : "View Candidates"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Elections;
