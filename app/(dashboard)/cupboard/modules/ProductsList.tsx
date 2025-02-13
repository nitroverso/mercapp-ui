"use client";

import { useEffect } from "react";
// components
import ProductsGroup from "@/app/(dashboard)/cupboard/modules/ProductsGroup";
import { LinearProgress } from "@mui/material";
// hooks
import { useProducts } from "@/app/lib/hooks/useProducts";
import { useCategories } from "@/app/lib/hooks/useCategories";
import { useUnits } from "@/app/lib/hooks/useUnits";

const ProductsList = () => {
  const {
    loadingProducts,
    loadProducts,
    products,
    groupedProducts,
    getGroupedProducts,
  } = useProducts();
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
  }, [products.length, categories.length, units.length]);

  const isLoading = loadingProducts || loadingCategories || loadingUnits;

  return (
    <>
      {isLoading ? (
        <LinearProgress />
      ) : (
        groupedProducts.map(({ id, name, products }) => {
          return (
            <ProductsGroup key={id} categoryName={name} products={products} />
          );
        })
      )}
    </>
  );
};

export default ProductsList;
