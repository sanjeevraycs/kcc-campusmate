import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Brain } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("marketplace")
        .select("*, profiles(full_name)")
        .eq("status", "available")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRecommendations = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      const { data, error } = await supabase.functions.invoke("ai-recommend-marketplace", {
        body: {
          userProfile: profile,
          browsingHistory: [],
          availableItems: products.slice(0, 10)
        }
      });

      if (error) throw error;
      setRecommendations(data.recommendations);
      toast({ title: "AI Recommendations Generated", description: "Check personalized suggestions below" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate recommendations", variant: "destructive" });
    }
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="pt-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Marketplace
          </h1>
          <p className="text-muted-foreground mt-1">Buy and sell with fellow students</p>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Button onClick={getRecommendations} className="h-12 bg-gradient-primary">
            <Brain className="w-4 h-4 mr-2" />
            AI Recommendations
          </Button>
        </div>

        {recommendations && (
          <Card className="shadow-md border-primary/10 bg-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Brain className="w-5 h-5" />
                AI Recommendations for You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap">{recommendations}</p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="shadow-md border-primary/10 hover:shadow-lg transition-all duration-300 animate-fade-in">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                    <CardTitle className="text-lg">{product.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between text-sm pt-2">
                  <span className="text-muted-foreground">Condition</span>
                  <Badge variant="outline" className="border-success text-success">
                    {product.condition}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Seller</span>
                  <span className="font-medium">{product.profiles?.full_name}</span>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-2xl font-bold text-primary">₹{product.price}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-primary">Contact Seller</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
