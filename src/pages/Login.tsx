import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const isPhone = /^\d+$/.test(identifier);

      if (isPhone && !validatePhoneNumber(identifier)) {
        toast({
          title: "Invalid Phone Number",
          description: "Please enter a valid 10-digit Indian phone number starting with 6-9.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const query = isPhone
        ? supabase.from("users").select("*").eq("phone_number", identifier)
        : supabase.from("users").select("*").eq("roll_number", identifier);

      const { data: user, error } = await query.maybeSingle();

      if (error) throw error;

      if (!user) {
        toast({
          title: "User Not Found",
          description: "No account found with this phone number or roll number. Please sign up first.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

      const { error: updateError } = await supabase
        .from("users")
        .update({
          current_otp: otp,
          otp_expires_at: otpExpiresAt,
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      toast({
        title: "OTP Sent",
        description: `Verification code ${otp} sent to ${user.phone_number}`,
      });

      navigate("/verify-otp", {
        state: {
          phoneNumber: user.phone_number,
          userId: user.id,
          isSignup: false
        }
      });
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow mb-4">
            <GraduationCap className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome to Kcc
          </h1>
          <p className="text-muted-foreground">Your complete campus companion</p>
        </div>

        <Card className="shadow-lg border-primary/10 bg-gradient-card">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your roll number or registered phone number to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identifier">Roll Number / Phone Number</Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Enter your roll number or phone number"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  className="h-12 text-base"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-base bg-gradient-primary hover:shadow-glow transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </Button>
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="text-primary hover:underline font-medium"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
