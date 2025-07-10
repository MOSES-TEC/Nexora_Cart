import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {

    const { products, navigate } = useAppContext();

  return (
    <div className="mt-16">
        <p className="text-2xl md:text-3xl font-medium pb-4">Best Sellers</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-0">
            {products.filter((product) => product.inStock).slice(0, 5).map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>

        {/* Optional: Show more button for mobile */}
        <div className="flex justify-center mt-6 md:mt-8 sm:hidden">
          <button onClick={()=> {navigate("/products"); scrollTo(0,0)}} className="bg-green-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
            View All Products
          </button>
        </div>
    </div>
  );
};

export default BestSeller;

