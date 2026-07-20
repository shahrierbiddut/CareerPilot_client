import Link from "next/link";
import { Mail, Rocket } from "lucide-react";

const navigation = {
  product: [
    { name: "Resume Analyzer", href: "/resume-analyzer" },
    { name: "Interview Coach", href: "/interview-coach" },
    { name: "Career Roadmap", href: "/career-roadmap" },
    { name: "Pricing", href: "/pricing" },
    { name: "Changelog", href: "/changelog" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "Resume Templates", href: "/templates" },
    { name: "Interview Guides", href: "/guides" },
    { name: "Help Center", href: "/help" },
    { name: "Community", href: "/community" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
    { name: "Partners", href: "/partners" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Security", href: "/security" },
  ],
  social: [
    { 
      name: "Twitter", 
      href: "#", 
      icon: (props: any) => <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1511 10.5381L12.8478 11.5346L18.6861 19.8812H16.2995L11.5541 13.096V13.0956Z" /></svg>
    },
    { 
      name: "LinkedIn", 
      href: "#", 
      icon: (props: any) => <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    },
    { 
      name: "GitHub", 
      href: "#", 
      icon: (props: any) => <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8 lg:pt-24">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Brand & Description */}
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cp-primary to-purple-600 shadow-lg shadow-cp-primary/20">
                <Rocket size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                CareerPilot <span className="text-cp-primary">AI</span>
              </span>
            </Link>
            <p className="text-sm leading-6 text-zinc-400 max-w-xs">
              Your personal AI career coach. Build better resumes, ace every interview, and navigate your professional journey with confidence.
            </p>
            <div className="flex gap-x-6">
              {navigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <a key={item.name} href={item.href} className="text-zinc-500 hover:text-white transition-colors">
                    <span className="sr-only">{item.name}</span>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Product</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-zinc-400 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Resources</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-zinc-400 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-zinc-400 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-zinc-400 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs leading-5 text-zinc-500">
            &copy; {new Date().getFullYear()} CareerPilot AI Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="mailto:support@careerpilot.ai" className="flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors">
              <Mail size={14} />
              support@careerpilot.ai
            </a>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              All systems operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
