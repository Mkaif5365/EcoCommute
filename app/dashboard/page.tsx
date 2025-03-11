'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, User, Mail, Calendar } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated (this is a backup to middleware)
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Authentication System</h1>
          <Button 
            variant="ghost" 
            className="text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-6">Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Welcome, {user?.name}!</CardTitle>
              <CardDescription className="text-gray-400">
                You've successfully logged in to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300">
                <User className="h-5 w-5 text-blue-400" />
                <span>{user?.name}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-5 w-5 text-blue-400" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Calendar className="h-5 w-5 text-blue-400" />
                <span>Account created: {new Date().toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Security</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">Your account is protected with password authentication.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                Change Password
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Account Settings</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your profile and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">Update your profile information and account settings.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
} 