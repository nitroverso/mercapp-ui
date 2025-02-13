"use client";

import { useEffect } from "react";
// components
import ProductsGroup from "@/app/(dashboard)/cupboard/modules/ProductsGroup";
import { LinearProgress } from "@mui/material";
// hooks
import { useProducts } from "@/app/lib/hooks/useProducts";
import { useCategories } from "@/app/lib/hooks/useCategories";

const ProductsList = () => {
  const {
    loadingProducts,
    loadProducts,
    products,
    groupedProducts,
    getGroupedProducts,
  } = useProducts();
  const { categories } = useCategories();

  useEffect(() => {
    const loadProductsList = async () => {
      try {
        await loadProducts();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    };

    if (products.length) {
      if (categories.length) getGroupedProducts();
    } else {
      loadProductsList();
    }
  }, [products.length, categories.length]);

  return (
    <>
      {loadingProducts ? (
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
