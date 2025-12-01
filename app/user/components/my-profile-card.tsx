'use client';

import { User } from "lucide-react";
import { useUser } from "@/hooks/use-user";

export function MyProfileCard() {
  const { user, isLoading } = useUser();

  console.log("User data in MyProfileCard:", user, isLoading);

  if (isLoading) {
    return (
      <div className="dashboard-card">
        <div className="card-header">
          <i><User className="size-5" /></i>
          <h3>My Profile</h3>
        </div>
        <div className="card-content">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <i><User className="size-5" /></i>
        <h3>My Profile</h3>
      </div>
      <div className="card-content">
        <div className="profile-summary">
          <div className="profile-info">
            <p>
              <span>Name:</span>
              <span>{user?.user_metadata.name}</span>
            </p>
            <p>
              <span>Email:</span>
              <span>{user?.email}</span>
            </p>
            <p>
              <span>Member Since:</span>
              <span>
                {user?.email_confirmed_at
                  ? new Date(user.email_confirmed_at).toLocaleDateString()
                  : "N/A"}
              </span>
            </p>
            
          </div>
        </div>
        <a href="/user/profile" className="view-all">Edit Profile</a>
      </div>
    </div>
  );
}

