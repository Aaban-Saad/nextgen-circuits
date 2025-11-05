import { Clock, ShoppingCart, Star, Heart } from "lucide-react";

export function RecentActivityCard() {
  const activities = [
    {
      icon: ShoppingCart,
      text: "You placed an order #ORD12345",
      time: "2 days ago",
    },
    {
      icon: Star,
      text: "You reviewed Arduino Nano",
      time: "5 days ago",
    },
    {
      icon: Heart,
      text: "You added Raspberry Pi 4 to wishlist",
      time: "1 week ago",
    },
  ];

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <i><Clock className="size-5" /></i>
        <h3>Recent Activity</h3>
      </div>
      <div className="card-content">
        <div className="activity-list">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="activity-item">
                <div className="activity-icon">
                  <Icon className="size-4" />
                </div>
                <div className="activity-details">
                  <p>{activity.text}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

