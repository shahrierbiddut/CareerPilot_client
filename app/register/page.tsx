import RegisterSidebar from "./components/RegisterSidebar";
import RegisterForm from "./components/RegisterForm";

export const metadata = {
  title: "Register | CareerPilot AI",
  description: "Create your CareerPilot AI account and take the next step in your career.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-[1200px] flex gap-8 lg:gap-16 justify-center">
        
        {/* Left Branding Panel (Hidden on Mobile/Tablet) */}
        <RegisterSidebar />
        
        {/* Right Form Container */}
        <div className="flex-1 flex items-center justify-center w-full max-w-[500px] lg:max-w-none">
          <RegisterForm />
        </div>

      </div>
    </div>
  );
}
