import LoginSidebar from "./components/LoginSidebar";
import LoginForm from "./components/LoginForm";

export const metadata = {
  title: "Login | CareerPilot AI",
  description: "Sign in to continue your career growth journey with AI.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-[1200px] flex gap-8 lg:gap-16 justify-center">
        
        {/* Left Branding Panel (Hidden on Mobile/Tablet) */}
        <LoginSidebar />
        
        {/* Right Form Container */}
        <div className="flex-1 flex items-center justify-center w-full max-w-[500px] lg:max-w-none">
          <LoginForm />
        </div>

      </div>
    </div>
  );
}
