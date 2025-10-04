import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Events = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel('events-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [eventsRes, regsRes] = await Promise.all([
        supabase.from("events").select("*").order("start_time", { ascending: true }),
        supabase.from("event_registrations").select("event_id").eq("user_id", user.id),
      ]);

      if (eventsRes.data) setEvents(eventsRes.data);
      if (regsRes.data) {
        setRegistrations(new Set(regsRes.data.map(r => r.event_id)));
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("event_registrations")
        .insert({ event_id: eventId, user_id: user.id });

      if (error) throw error;

      toast({ title: "Registered!", description: "You've successfully registered for this event" });
      fetchData();
    } catch (error) {
      toast({ title: "Error", description: "Failed to register", variant: "destructive" });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="pt-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Event Calendar
          </h1>
          <p className="text-muted-foreground mt-1">Upcoming events and fests</p>
        </div>

        <div className="grid gap-4">
          {events.map((event) => {
            const isRegistered = registrations.has(event.id);
            const isPast = new Date(event.end_time) < new Date();

            return (
              <Card key={event.id} className="shadow-md border-primary/10 animate-fade-in">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <Badge variant="secondary" className="mt-2">
                        {event.category}
                      </Badge>
                    </div>
                    {event.image_url && (
                      <div className="text-4xl">{event.image_url}</div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{event.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{formatDate(event.start_time)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{formatTime(event.start_time)} - {formatTime(event.end_time)}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    {event.max_participants && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span>Max {event.max_participants} participants</span>
                      </div>
                    )}
                  </div>

                  {event.registration_required && !isPast && (
                    <Button
                      onClick={() => handleRegister(event.id)}
                      disabled={isRegistered}
                      className="w-full bg-gradient-primary"
                    >
                      {isRegistered ? "Registered ✓" : "Register Now"}
                    </Button>
                  )}

                  {isPast && (
                    <Badge variant="outline" className="w-full justify-center">
                      Event Ended
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Events;
