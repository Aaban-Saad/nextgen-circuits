import FeaturedCategories from "@/components/featured-categories";
import FeaturedProducts from "@/components/featured-products";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Newsletter from "@/components/newsletter";
import WhyChooseUs from "@/components/why-choose-us";
import { ScrollArea } from "@/components/ui/scroll-area";


export default function HomePage() {
  return (
    <div className="min-h-screen">
      <ScrollArea className="h-screen">
        <Header />
        <main>
          <Hero />
          <FeaturedCategories />
          <FeaturedProducts />
          <WhyChooseUs />
          <Newsletter />
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
}