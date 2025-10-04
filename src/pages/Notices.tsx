import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Pin, Calendar, Brain } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Notices = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchNotices();
    
    const channel = supabase
      .channel('notices-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notices' }, () => {
        fetchNotices();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchNotices = async () => {
    try {
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setNotices(data || []);
    } catch (error) {
      console.error("Error fetching notices:", error);
    } finally {
      setLoading(false);
    }
  };

  const summarizeNotice = async (noticeId: string, content: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("ai-summarize-notice", {
        body: { content },
      });

      if (error) throw error;

      await supabase
        .from("notices")
        .update({ summary: data.summary })
        .eq("id", noticeId);

      toast({ title: "AI Summary Generated", description: "Notice has been summarized" });
      fetchNotices();
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate summary", variant: "destructive" });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "destructive";
      case "high": return "default";
      case "normal": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="pt-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Notices & Announcements
          </h1>
          <p className="text-muted-foreground mt-1">Stay updated with campus news</p>
        </div>

        <div className="space-y-4">
          {notices.map((notice) => (
            <Card 
              key={notice.id} 
              className={`shadow-md border-primary/10 animate-fade-in ${notice.is_pinned ? 'border-primary/50 bg-primary/5' : ''}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {notice.is_pinned && <Pin className="w-4 h-4 text-primary" />}
                      {notice.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={getPriorityColor(notice.priority)}>
                        {notice.priority}
                      </Badge>
                      <Badge variant="outline">{notice.category}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(notice.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Bell className="w-5 h-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {notice.summary && (
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <p className="text-sm font-semibold flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4" />
                      AI Summary
                    </p>
                    <p className="text-sm whitespace-pre-wrap">{notice.summary}</p>
                  </div>
                )}
                
                <p className="text-sm whitespace-pre-wrap">{notice.content}</p>
                
                {!notice.summary && (
                  <Button 
                    onClick={() => summarizeNotice(notice.id, notice.content)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Generate AI Summary
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notices;
