"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="header bg-secondary text-secondary-foreground drop-shadow-2xl border-b border-accent/10 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="header-wrapper flex items-center justify-between py-4">
          {/* Logo */}
          <div className="logo">
            <Link href="/" className="logo-text text-2xl font-bold">
              <span className="">Next</span>
              <span className="text-accent">Gen </span>
              <span className="">Circuits</span>
            </Link>
          </div>

          {/* Navigation Menu - Desktop */}
          <nav className="nav-menu hidden lg:block">
            <ul className="menu flex items-center space-x-8">
              <li>
                <Link
                  href="/"
                  className={`relative inline-block font-bold transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-accent after:w-full after:origin-left after:transition-transform after:duration-300 ${
                    isActive("/")
                      ? "text-secondary-foreground after:scale-x-100"
                      : "text-muted hover:text-secondary-foreground after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className={`relative inline-block font-bold transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-accent after:w-full after:origin-left after:transition-transform after:duration-300 ${
                    isActive("/products")
                      ? "text-secondary-foreground after:scale-x-100"
                      : "text-muted hover:text-secondary-foreground after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className={`relative inline-block font-bold transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-accent after:w-full after:origin-left after:transition-transform after:duration-300 ${
                    isActive("/categories")
                      ? "text-secondary-foreground after:scale-x-100"
                      : "text-muted hover:text-secondary-foreground after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`relative inline-block font-bold transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-accent after:w-full after:origin-left after:transition-transform after:duration-300 ${
                    isActive("/about")
                      ? "text-secondary-foreground after:scale-x-100"
                      : "text-muted hover:text-secondary-foreground after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`relative inline-block font-bold transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-accent after:w-full after:origin-left after:transition-transform after:duration-300 ${
                    isActive("/contact")
                      ? "text-secondary-foreground after:scale-x-100"
                      : "text-muted hover:text-secondary-foreground after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Header Actions */}
          <div className="header-actions flex items-center gap-4">
            {/* Search Box - Desktop */}
            <div className="search-box hidden md:flex items-center bg-gray-100 rounded-md px-3 py-2">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none flex-1 text-sm"
              />
              <Search className="w-4 h-4 text-gray-500" />
            </div>

            {/* User Actions */}
            <div className="user-actions flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">
                  <User className="w-5 h-5" />
                </Link>
              </Button>

              <Button variant="ghost" size="sm" asChild className="relative">
                <Link href="/cart">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.nav
            className="mobile-menu lg:hidden border-t py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className={`block transition-colors ${
                    isActive("/")
                      ? "text-secondary-foreground font-bold"
                      : "text-muted hover:text-secondary-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className={`block transition-colors ${
                    isActive("/products")
                      ? "text-secondary-foreground font-bold"
                      : "text-muted hover:text-secondary-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className={`block transition-colors ${
                    isActive("/categories")
                      ? "text-secondary-foreground font-bold"
                      : "text-muted hover:text-secondary-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`block transition-colors ${
                    isActive("/about")
                      ? "text-secondary-foreground font-bold"
                      : "text-muted hover:text-secondary-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`block transition-colors ${
                    isActive("/contact")
                      ? "text-secondary-foreground font-bold"
                      : "text-muted hover:text-secondary-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* Mobile Search */}
            <div className="search-box flex items-center bg-gray-100 rounded-md px-3 py-2 mt-4">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none flex-1 text-sm"
              />
              <Search className="w-4 h-4 text-gray-500" />
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
}