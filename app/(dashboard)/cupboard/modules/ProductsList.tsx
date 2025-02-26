"use client";

import { useEffect } from "react";
// components
import ProductsGroup from "@/app/(dashboard)/cupboard/modules/ProductsGroup";
import { LinearProgress } from "@mui/material";
import EmptyState from "@/app/ui/components/Empty";
// hooks
import { useProducts } from "@/app/lib/hooks/useProducts";
import { useCategories } from "@/app/lib/hooks/useCategories";
import { useUnits } from "@/app/lib/hooks/useUnits";

interface ProductListProps {
  searchQuery?: string;
}

const ProductsList = ({ searchQuery }: ProductListProps) => {
  const {
    loadingProducts,
    loadProducts,
    products,
    groupedProducts,
    getGroupedProducts,
  } = useProducts({ searchQuery });
  const { categories, loadingCategories } = useCategories();
  const { units, loadingUnits } = useUnits();

  useEffect(() => {
    const loadProductsList = async () => {
      try {
        await loadProducts();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    };

    if (products.length) {
      if (categories.length && units.length) getGroupedProducts();
    } else {
      loadProductsList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length, categories.length, units.length, searchQuery]);

  const isLoading = loadingProducts || loadingCategories || loadingUnits;

  const renderGroupedProducts = () => {
    if (!groupedProducts.length) return <EmptyState />;
    return groupedProducts.map(({ id, name, products }) => {
      return <ProductsGroup key={id} categoryName={name} products={products} />;
    });
  };

  return <>{isLoading ? <LinearProgress /> : renderGroupedProducts()}</>;
};

export default ProductsList;
