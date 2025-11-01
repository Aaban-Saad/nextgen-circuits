import { User } from "lucide-react";

export function MyProfileCard() {
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
              <span>John Doe</span>
            </p>
            <p>
              <span>Email:</span>
              <span>john@example.com</span>
            </p>
            <p>
              <span>Member Since:</span>
              <span>Jan 2023</span>
            </p>
            <p>
              <span>Membership:</span>
              <span className="membership-badge">Premium</span>
            </p>
          </div>
        </div>
        <a href="/user/profile" className="view-all">Edit Profile</a>
      </div>
    </div>
  );
}

