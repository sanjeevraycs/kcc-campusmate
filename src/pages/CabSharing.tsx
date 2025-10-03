import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, MapPin, Clock, Users } from "lucide-react";

const CabSharing = () => {
  const rides = [
    {
      id: 1,
      driver: "Alex Kumar",
      from: "Campus Gate 1",
      to: "City Center",
      time: "4:30 PM",
      seats: 2,
      cost: "₹50",
    },
    {
      id: 2,
      driver: "Priya Sharma",
      from: "Campus Gate 2",
      to: "Railway Station",
      time: "5:00 PM",
      seats: 3,
      cost: "₹40",
    },
    {
      id: 3,
      driver: "Rahul Verma",
      from: "Hostel Block A",
      to: "Shopping Mall",
      time: "6:00 PM",
      seats: 1,
      cost: "₹60",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="pt-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Cab Sharing
          </h1>
          <p className="text-muted-foreground mt-1">Share rides with fellow students</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="h-14 bg-gradient-primary shadow-md">
            <Car className="w-5 h-5 mr-2" />
            Offer Ride
          </Button>
          <Button variant="outline" className="h-14 border-2 border-primary">
            Find Ride
          </Button>
        </div>

        {/* Available Rides */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Available Rides</h2>
          {rides.map((ride) => (
            <Card key={ride.id} className="shadow-md border-primary/10 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                      {ride.driver.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{ride.driver}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        <Users className="w-3 h-3 mr-1" />
                        {ride.seats} seats
                      </Badge>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-primary">{ride.cost}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">From</p>
                    <p className="font-medium">{ride.from}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">To</p>
                    <p className="font-medium">{ride.to}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <p className="font-medium text-primary">{ride.time}</p>
                </div>
                <Button className="w-full bg-gradient-primary">Book Ride</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CabSharing;
