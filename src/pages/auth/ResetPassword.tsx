
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { LiquidGlass } from "@/components/ui/liquid-glass";

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sessionEstablished, setSessionEstablished] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    const establishSession = async () => {
      console.log('ResetPassword - Checking URL parameters');
      
      // Check for the token_hash and type parameters that Supabase sends
      const tokenHash = searchParams.get('token_hash');
      const type = searchParams.get('type');
      
      console.log('ResetPassword - URL params:', { tokenHash, type });
      
      if (!tokenHash || type !== 'recovery') {
        console.log('ResetPassword - Invalid or missing parameters');
        setError("Invalid reset link. Please request a new password reset.");
        return;
      }

      try {
        console.log('ResetPassword - Verifying OTP with token hash');
        
        // Verify the OTP token hash to establish the session
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: 'recovery'
        });

        console.log('ResetPassword - Verify OTP result:', { data, error });

        if (error) {
          console.error('ResetPassword - Verify OTP error:', error);
          setError("Invalid or expired reset link. Please request a new password reset.");
          return;
        }

        if (data.session) {
          console.log('ResetPassword - Session established successfully');
          setSessionEstablished(true);
        } else {
          console.log('ResetPassword - No session in response');
          setError("Failed to establish session. Please try again.");
        }
      } catch (error) {
        console.error('ResetPassword - Exception during session establishment:', error);
        setError("An error occurred. Please try again.");
      }
    };

    establishSession();
  }, [searchParams]);

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!sessionEstablished) {
      toast.error("Session not established. Please try clicking the reset link again.");
      return;
    }

    setLoading(true);
    try {
      console.log('ResetPassword - Updating password');
      
      const { error } = await supabase.auth.updateUser({
        password: data.password
      });

      if (error) {
        console.error('ResetPassword - Update password error:', error);
        throw error;
      }

      console.log('ResetPassword - Password updated successfully');
      setSuccess(true);
      toast.success("Password updated successfully!");
      
      // Redirect to sign in after a short delay
      setTimeout(() => {
        navigate('/auth');
      }, 2000);
    } catch (error) {
      console.error('ResetPassword - Error updating password:', error);
      toast.error(error instanceof Error ? error.message : "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen wellness-gradient p-4 md:p-6 lg:p-8">
        <div className="max-w-md mx-auto mt-20">
          <LiquidGlass variant="text" className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-black mb-4">Invalid Reset Link</h1>
            <p className="text-gray-600 mb-6">
              {error}
            </p>
            <Button asChild className="w-full">
              <Link to="/auth/forgot-password">Request New Reset Link</Link>
            </Button>
          </LiquidGlass>
        </div>
      </div>
    );
  }

  // Show success state
  if (success) {
    return (
      <div className="min-h-screen wellness-gradient p-4 md:p-6 lg:p-8">
        <div className="max-w-md mx-auto mt-20">
          <LiquidGlass variant="text" className="p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-black mb-4">Password Updated!</h1>
            <p className="text-gray-600 mb-6">
              Your password has been successfully updated. You can now sign in with your new password.
            </p>
            <Button asChild className="w-full">
              <Link to="/auth">Sign In</Link>
            </Button>
          </LiquidGlass>
        </div>
      </div>
    );
  }

  // Show loading state while establishing session
  if (!sessionEstablished) {
    return (
      <div className="min-h-screen wellness-gradient p-4 md:p-6 lg:p-8">
        <div className="max-w-md mx-auto mt-20">
          <LiquidGlass variant="text" className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-black mb-4">Verifying Reset Link</h1>
            <p className="text-gray-600">
              Please wait while we verify your password reset link...
            </p>
          </LiquidGlass>
        </div>
      </div>
    );
  }

  // Show password reset form
  return (
    <div className="min-h-screen wellness-gradient p-4 md:p-6 lg:p-8">
      <div className="max-w-md mx-auto mt-20">
        <LiquidGlass variant="text" className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-black mb-2">Set New Password</h1>
            <p className="text-gray-600">
              Choose a strong password for your Sahara account.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="password">New Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter new password"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="Confirm new password"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link to="/auth" className="text-crimson-wine hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </LiquidGlass>
      </div>
    </div>
  );
}
