import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus } from "lucide-react";
import { useState } from "react";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const products = [
    {
      id: 1,
      title: "Data Structures Textbook",
      price: "₹500",
      condition: "Good",
      seller: "John D.",
      category: "Books",
      image: "📚",
    },
    {
      id: 2,
      title: "Scientific Calculator",
      price: "₹800",
      condition: "Excellent",
      seller: "Sarah M.",
      category: "Electronics",
      image: "🧮",
    },
    {
      id: 3,
      title: "Programming Laptop",
      price: "₹25,000",
      condition: "Good",
      seller: "Mike R.",
      category: "Electronics",
      image: "💻",
    },
    {
      id: 4,
      title: "Drafting Kit",
      price: "₹300",
      condition: "New",
      seller: "Emily K.",
      category: "Supplies",
      image: "📐",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="pt-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Marketplace
          </h1>
          <p className="text-muted-foreground mt-1">Buy and sell with fellow students</p>
        </div>

        {/* Search and Add */}
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
          <Button size="icon" className="h-12 w-12 bg-gradient-primary shadow-md">
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="shadow-md border-primary/10 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="text-5xl mb-2">{product.image}</div>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
                <CardTitle className="text-lg">{product.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Condition</span>
                  <Badge variant="outline" className="border-success text-success">
                    {product.condition}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Seller</span>
                  <span className="font-medium">{product.seller}</span>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-2xl font-bold text-primary">{product.price}</p>
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
