"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
// components
import Card from "@/app/ui/components/Card";
import { Box, Divider, Typography } from "@mui/material";
import Form from "@/app/ui/components/form/Form";
import TextInput from "@/app/ui/components/form/inputs/TextInput";
import Button, { ButtonSizes, ButtonTypes } from "@/app/ui/components/Button";
import SelectInput from "@/app/ui/components/form/inputs/SelectInput";
// hooks
import { useCategories } from "@/app/lib/hooks/useCategories";
import { useUnits } from "@/app/lib/hooks/useUnits";
// types
import { IProductRequest } from "@/app/lib/definitions/products";
import { CUPBOARD_ROUTE } from "@/app/lib/definitions/routes";
// utils
import { getUnitLabel } from "@/app/lib/utils";
import { useProducts } from "@/app/lib/hooks/useProducts";

interface ProductDetailsProps {
  productId?: string;
}

const ProductDetails = ({ productId }: ProductDetailsProps) => {
  const t = useTranslations();
  const router = useRouter();
  const { categories } = useCategories();
  const { units } = useUnits();
  const { products, addProduct, editProduct } = useProducts();
  const [previewProduct, setPreviewProduct] = useState<IProductRequest>();
  const [productToEdit, setProductToEdit] = useState<IProductRequest>();

  useEffect(() => {
    if (productId) {
      const productToEdit = products.find(
        (product) => product.id === productId
      );
      if (!productToEdit) router.push(CUPBOARD_ROUTE);
      setProductToEdit(productToEdit);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleFormSubmit = async (data: IProductRequest) => {
    const newProduct = productId
      ? await editProduct(data)
      : await addProduct(data);
    if (!newProduct) throw new Error("service not processed");
    router.push(CUPBOARD_ROUTE);
  };

  const observeValues = async (data: IProductRequest) => {
    setPreviewProduct(data);
  };

  return (
    <Box className="flex flex-col gap-3">
      <Divider textAlign="center">
        <Typography component="h1" variant="h4">
          {t("ui.info")}
        </Typography>
      </Divider>
      <Form<IProductRequest>
        observeValues={observeValues}
        updatedValues={productToEdit}
        onSubmit={handleFormSubmit}
      >
        <Box className="flex flex-col items-center gap-4">
          <TextInput isRequired label={t("products.name")} name="name" />
          <SelectInput
            isRequired
            label={t("products.unit")}
            name="unit_id"
            options={units.map((unit) => ({
              label: unit.name,
              value: unit.id,
            }))}
          />
          <TextInput isRequired label={t("products.amount")} name="quantity" />
          <SelectInput
            isRequired
            label={t("products.category")}
            name="category_id"
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
          <Card
            subTitle={`${t("products.amount")}: ${
              previewProduct?.quantity || t("products.amount")
            }${
              previewProduct?.unit_id
                ? getUnitLabel(
                    units.find((unit) => unit.id === previewProduct.unit_id)!
                  )
                : ""
            }`}
            title={previewProduct?.name || t("products.name")}
          />
          <Box className="flex gap-2">
            <Button
              buttonProps={{ onClick: () => router.push(CUPBOARD_ROUTE) }}
              size={ButtonSizes.LARGE}
            >
              {t("form.cancel")}
            </Button>
            <Button size={ButtonSizes.LARGE} type={ButtonTypes.SUBMIT}>
              {t(productId ? "form.edit" : "form.save")}
            </Button>
          </Box>
        </Box>
      </Form>
    </Box>
  );
};

export default ProductDetails;
