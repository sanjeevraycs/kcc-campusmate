import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const phoneNumber = location.state?.phoneNumber || "";
  const userId = location.state?.userId || "";
  const isSignup = location.state?.isSignup || false;

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("phone_number", phoneNumber)
        .maybeSingle();

      if (error) throw error;

      if (!user) {
        toast({
          title: "User Not Found",
          description: "Please try logging in again.",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      if (user.current_otp !== otp) {
        toast({
          title: "Invalid OTP",
          description: "The OTP you entered is incorrect. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const now = new Date();
      const expiresAt = new Date(user.otp_expires_at);

      if (now > expiresAt) {
        toast({
          title: "OTP Expired",
          description: "Your OTP has expired. Please request a new one.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const { error: updateError } = await supabase
        .from("users")
        .update({
          is_verified: true,
          current_otp: null,
          otp_expires_at: null,
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      localStorage.setItem("userId", user.id);
      localStorage.setItem("userPhone", user.phone_number);
      localStorage.setItem("userName", user.name);

      toast({
        title: "Success!",
        description: isSignup ? "Account created successfully!" : "Login successful!",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

      const { error } = await supabase
        .from("users")
        .update({
          current_otp: otp,
          otp_expires_at: otpExpiresAt,
        })
        .eq("phone_number", phoneNumber);

      if (error) throw error;

      toast({
        title: "OTP Sent",
        description: `New verification code ${otp} sent to ${phoneNumber}`,
      });
      setResendTimer(30);
    } catch (error: any) {
      toast({
        title: "Failed to Resend",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="w-full max-w-md space-y-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/login")}
          className="mb-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Button>

        <Card className="shadow-lg border-primary/10 bg-gradient-card">
          <CardHeader>
            <CardTitle>Verify OTP</CardTitle>
            <CardDescription>
              Enter the 6-digit code sent to your registered phone number
              {phoneNumber && <span className="block mt-1 font-medium text-foreground">{phoneNumber}</span>}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                  required
                  className="h-14 text-center text-2xl tracking-widest font-mono"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-base bg-gradient-primary hover:shadow-glow transition-all duration-300"
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>
              <div className="text-center">
                {resendTimer > 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Resend OTP in {resendTimer}s
                  </p>
                ) : (
                  <Button
                    type="button"
                    variant="link"
                    onClick={handleResend}
                    className="text-primary"
                  >
                    Resend OTP
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyOTP;
