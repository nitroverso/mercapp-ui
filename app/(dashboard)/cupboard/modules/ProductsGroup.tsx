import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
// components
import EmptyState from "@/app/ui/components/Empty";
import Card from "@/app/ui/components/Card";
import { Box, Divider, Grid2 as Grid, Typography } from "@mui/material";
import AlertDialog from "@/app/ui/components/AlertDialog";
// hooks
import { useProducts } from "@/app/lib/hooks/useProducts";
// icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// types
import { IProductWithUnit } from "@/app/lib/definitions/products";
// utils
import { getUnitLabel } from "@/app/lib/utils";
import { CUPBOARD_ROUTE_EDIT } from "@/app/lib/definitions/routes";

interface ProductsGroupProps {
  categoryName: string;
  products: IProductWithUnit[];
}

const ProductsGroup = ({ categoryName, products }: ProductsGroupProps) => {
  const t = useTranslations("products");
  const router = useRouter();
  const { deleteProduct } = useProducts();
  const [productToDelete, setProductToDelete] = useState<IProductWithUnit>();

  return (
    <Box className="flex flex-col gap-3 grow mb-7">
      <Divider textAlign="left">
        <Typography variant="button">{categoryName.toUpperCase()}</Typography>
      </Divider>
      {products.length ? (
        <Grid
          container
          // eslint-disable-next-line sort-keys
          columns={{ xs: 1, sm: 2, lg: 3 }}
          // eslint-disable-next-line sort-keys
          spacing={{ xs: 2, md: 3 }}
        >
          {products.map((product) => {
            const { id, name, quantity, unit } = product;
            return (
              <Grid key={id} size={{ xs: 1 }}>
                <Card
                  cardActions={[
                    {
                      action: () =>
                        router.push(`${CUPBOARD_ROUTE_EDIT}?productId=${id}`),
                      icon: EditIcon,
                    },
                    {
                      action: () => setProductToDelete(product),
                      icon: DeleteIcon,
                    },
                  ]}
                  subTitle={`${t("amount")}: ${quantity}${getUnitLabel(unit)}`}
                  title={name}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <EmptyState />
      )}
      <AlertDialog
        description={t("deleteDescription", { name: productToDelete?.name })}
        handleClose={() => setProductToDelete(undefined)}
        handleConfirm={() => {
          deleteProduct(productToDelete!.id);
          setProductToDelete(undefined);
        }}
        open={!!productToDelete}
        title={t("deleteTitle")}
      />
    </Box>
  );
};

export default ProductsGroup;
