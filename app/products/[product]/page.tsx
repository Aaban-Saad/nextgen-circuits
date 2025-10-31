import Breadcrumbs from "./components/breadcrumbs";
import ImageGallery from "./components/image-gallery";
import ProductActions from "./components/product-actions";
import ProductTabs from "./components/product-tabs";
import { fetchMockProduct } from "./data";

export default async function ProductPage() {
  const product = await fetchMockProduct();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs current={product.name} />

        {/* Product header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Image gallery */}
          <div className="lg:col-span-6">
            <ImageGallery images={product.images} />
          </div>

          {/* Details */}
          <div className="lg:col-span-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                {product.name}
              </h1>
              <button
                type="button"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80"
              >
                <span className="i-ph-heart-light" aria-hidden /> Add to Wishlist
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Product ID: <span className="font-medium">rd_10001</span>
            </p>

            <p className="text-primary font-medium mb-2">Category {" "}
              <span className="text-gray-800">{product.category}</span>
            </p>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl sm:text-3xl font-bold">
                {product.currency}
                {product.price.toFixed(2)}
              </span>
            </div>

            <p className="text-gray-700 mb-6">{product.highlight}</p>
            <ProductActions availability={product.availability} />
          </div>
        </div>

        <ProductTabs product={product} />
      </div>
    </div>
  );
}