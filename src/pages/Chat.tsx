import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Users, Brain } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Chat = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [smartReplies, setSmartReplies] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      fetchMessages();
      subscribeToMessages();
    }
  }, [selectedRoom]);

  const fetchRooms = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("chat_room_members")
        .select("room_id, chat_rooms(*)")
        .eq("user_id", user.id);

      if (data) {
        const roomsData = data.map(d => d.chat_rooms).filter(Boolean);
        setRooms(roomsData);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const fetchMessages = async () => {
    if (!selectedRoom) return;

    try {
      const { data } = await supabase
        .from("chat_messages")
        .select("*, profiles(full_name)")
        .eq("room_id", selectedRoom)
        .order("created_at", { ascending: true });

      if (data) setMessages(data);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel(`room-${selectedRoom}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${selectedRoom}`,
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedRoom) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("chat_messages")
        .insert({
          room_id: selectedRoom,
          user_id: user.id,
          content: newMessage,
        });

      if (error) throw error;
      setNewMessage("");
      setSmartReplies([]);
    } catch (error) {
      toast({ title: "Error", description: "Failed to send message", variant: "destructive" });
    }
  };

  const generateSmartReplies = async () => {
    if (messages.length === 0) return;

    try {
      const lastMessage = messages[messages.length - 1];
      const { data, error } = await supabase.functions.invoke("ai-smart-reply", {
        body: { 
          message: lastMessage.content,
          context: "campus chat"
        },
      });

      if (error) throw error;
      
      const repliesText = data.replies;
      const repliesArray = repliesText.split('\n').filter((r: string) => r.trim()).slice(0, 3);
      setSmartReplies(repliesArray);
    } catch (error) {
      console.error("Error generating smart replies:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="pt-4 mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Chat & Discussion
          </h1>
          <p className="text-muted-foreground mt-1">Connect with your peers</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="md:col-span-1 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5" />
                Chat Rooms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {rooms.map((room) => (
                <Button
                  key={room.id}
                  variant={selectedRoom === room.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedRoom(room.id)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {room.name}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="md:col-span-2 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  {rooms.find(r => r.id === selectedRoom)?.name || "Select a room"}
                </span>
                {selectedRoom && (
                  <Button onClick={generateSmartReplies} size="sm" variant="outline">
                    <Brain className="w-4 h-4 mr-2" />
                    Smart Reply
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-96 overflow-y-auto space-y-3 p-4 bg-muted/30 rounded-lg">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="flex justify-start"
                  >
                    <div className="max-w-[70%] bg-card rounded-lg p-3 shadow-sm">
                      <p className="text-xs font-semibold mb-1">{msg.profiles?.full_name}</p>
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(msg.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {smartReplies.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {smartReplies.map((reply, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="cursor-pointer hover:bg-secondary/80"
                      onClick={() => setNewMessage(reply.replace(/^[0-9.\-*]\s*/, ''))}
                    >
                      {reply.replace(/^[0-9.\-*]\s*/, '')}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                  disabled={!selectedRoom}
                />
                <Button onClick={sendMessage} disabled={!selectedRoom} className="bg-gradient-primary">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;
