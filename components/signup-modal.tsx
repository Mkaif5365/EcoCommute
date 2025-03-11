'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';

export interface SignupModalProps {
  onClose: () => void;
  onLoginClick: () => void;
}

export default function SignupModal({ onClose, onLoginClick }: SignupModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simple validation
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Password validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    // Mock signup success
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      
      // Close modal after showing success message
      setTimeout(() => {
        onClose();
        onLoginClick(); // Redirect to login after signup
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg bg-[#1b1b1b] p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <p className="text-gray-400">Join the Green Commute revolution</p>
        </div>
        
        {success ? (
          <div className="rounded-md bg-green-500/10 p-6 text-center">
            <h3 className="text-xl font-medium text-green-500 mb-2">Account Created!</h3>
            <p className="text-gray-300">Redirecting you to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-500"
                />
                <p className="text-xs text-gray-400">
                  Password must be at least 8 characters long
                </p>
              </div>
              
              {error && (
                <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-500">
                  {error}
                </div>
              )}
              
              <Button
                type="submit"
                className="w-full bg-[#00aa55] text-[#0a2540] hover:bg-[#00aa55]/90"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </div>
          </form>
        )}
        
        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <button
            onClick={onLoginClick}
            className="text-[#00aa55] hover:underline"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
} 