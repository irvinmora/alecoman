"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/constants";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-[#1E3A5F] sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Alecoman Industrial"
                width={150}
                height={95}
                priority
                unoptimized={true}
                style={{ height: "85px", width: "auto", objectFit: "contain" }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-white text-sm font-medium hover:bg-blue-600 rounded-lg transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                className="ml-2 px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors"
              >
                Admin
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-[#1E3A5F] border-t border-blue-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-white text-sm font-medium hover:bg-blue-700 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors text-center mt-2"
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
