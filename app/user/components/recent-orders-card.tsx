import { ShoppingCart } from "lucide-react";

export function RecentOrdersCard() {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <i><ShoppingCart className="size-5" /></i>
        <h3>Recent Orders</h3>
      </div>
      <div className="card-content">
        <div className="order-summary">
          <div className="summary-item">
            <span>Total Orders:</span>
            <span className="highlight">5</span>
          </div>
          <div className="summary-item">
            <span>Pending:</span>
            <span className="highlight">1</span>
          </div>
          <div className="summary-item">
            <span>Shipped:</span>
            <span className="highlight">2</span>
          </div>
          <div className="summary-item">
            <span>Delivered:</span>
            <span className="highlight">2</span>
          </div>
        </div>
        <a href="/user/orders" className="view-all">View All Orders</a>
      </div>
    </div>
  );
}

