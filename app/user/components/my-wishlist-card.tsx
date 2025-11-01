import { Heart } from "lucide-react";

export function MyWishlistCard() {
  const wishlistItems = [
    "Arduino Mega",
    "Raspberry Pi 4",
    "ESP32 Dev Board",
  ];

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <i><Heart className="size-5" /></i>
        <h3>My Wishlist</h3>
      </div>
      <div className="card-content">
        <div className="wishlist-items">
          <p>You have {wishlistItems.length} items in your wishlist.</p>
          <div className="wishlist-preview">
            {wishlistItems.map((item, index) => (
              <div key={index} className="preview-item">
                {item}
              </div>
            ))}
          </div>
        </div>
        <a href="/user/profile?tab=wishlist" className="view-all">View Wishlist</a>
      </div>
    </div>
  );
}

