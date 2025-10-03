import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const rollNumber = location.state?.rollNumber || "";

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success!",
        description: "You've been successfully verified.",
      });
      navigate("/dashboard");
    }, 1500);
  };

  const handleResend = () => {
    toast({
      title: "OTP Sent",
      description: "A new verification code has been sent.",
    });
    setResendTimer(30);
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
              {rollNumber && <span className="block mt-1 font-medium text-foreground">{rollNumber}</span>}
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
