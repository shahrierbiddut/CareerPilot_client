"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavLink {
  name: string;
  href: string;
}

interface NavLinksProps {
  links: NavLink[];
}

export default function NavLinks({ links }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-6 lg:gap-8">
      {links.map((link) => {
        const isActive = pathname === link.href;
        
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`nav-link text-sm font-medium transition-colors hover:text-cp-primary py-1 ${
              isActive ? "text-cp-primary active" : "text-zinc-600 dark:text-zinc-300"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
