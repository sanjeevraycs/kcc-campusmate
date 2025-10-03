import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogIn, LogOut, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

const GateLogs = () => {
  const logs = [
    { id: 1, type: "Entry", gate: "Gate 1", time: "09:15 AM", date: "Today" },
    { id: 2, type: "Exit", gate: "Gate 2", time: "05:30 PM", date: "Yesterday" },
    { id: 3, type: "Entry", gate: "Gate 1", time: "08:45 AM", date: "Yesterday" },
    { id: 4, type: "Exit", gate: "Gate 1", time: "06:00 PM", date: "2 days ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="pt-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Gate Logs
          </h1>
          <p className="text-muted-foreground mt-1">Track your campus entry and exit</p>
        </div>

        <Card className="shadow-lg border-primary/10 bg-gradient-card">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-32 h-32 mx-auto bg-white rounded-lg p-4 shadow-md">
              <QrCode className="w-full h-full text-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Your Entry QR Code</h3>
              <p className="text-sm text-muted-foreground">Scan at gates for quick entry</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          {logs.map((log) => (
            <Card key={log.id} className="shadow-md border-primary/10 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        log.type === "Entry"
                          ? "bg-success/10"
                          : "bg-destructive/10"
                      }`}
                    >
                      {log.type === "Entry" ? (
                        <LogIn className="w-6 h-6 text-success" />
                      ) : (
                        <LogOut className="w-6 h-6 text-destructive" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{log.type}</CardTitle>
                      <p className="text-sm text-muted-foreground">{log.gate}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{log.date}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Time: <span className="font-medium text-foreground">{log.time}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GateLogs;
