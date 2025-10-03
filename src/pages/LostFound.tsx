import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus } from "lucide-react";
import { useState } from "react";

const LostFound = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const items = [
    {
      id: 1,
      title: "Black Backpack",
      category: "Lost",
      location: "Library",
      date: "2 days ago",
      description: "Black Nike backpack with laptop inside",
      image: "🎒",
    },
    {
      id: 2,
      title: "iPhone 14 Pro",
      category: "Found",
      location: "Cafeteria",
      date: "1 day ago",
      description: "Blue iPhone with cracked screen protector",
      image: "📱",
    },
    {
      id: 3,
      title: "Student ID Card",
      category: "Found",
      location: "Sports Ground",
      date: "3 hours ago",
      description: "ID card with roll number CS2023045",
      image: "🪪",
    },
    {
      id: 4,
      title: "Calculus Textbook",
      category: "Lost",
      location: "LH-201",
      date: "1 week ago",
      description: "Thomas' Calculus, 14th edition",
      image: "📘",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="pt-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Lost & Found
          </h1>
          <p className="text-muted-foreground mt-1">Find lost items or report found ones</p>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Button size="icon" className="h-12 w-12 bg-gradient-primary shadow-md">
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <Card key={item.id} className="shadow-md border-primary/10 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="text-5xl mb-2">{item.image}</div>
                  <Badge
                    className={
                      item.category === "Lost"
                        ? "bg-destructive/10 text-destructive border-destructive"
                        : "bg-success/10 text-success border-success"
                    }
                    variant="outline"
                  >
                    {item.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <div className="flex items-center justify-between text-sm pt-2 border-t">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{item.location}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Reported:</span>
                  <span className="font-medium">{item.date}</span>
                </div>
                <Button className="w-full bg-gradient-primary">Contact</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LostFound;
