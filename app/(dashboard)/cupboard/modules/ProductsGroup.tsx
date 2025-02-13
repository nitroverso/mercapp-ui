import { useTranslations } from "next-intl";
// components
import EmptyState from "@/app/ui/components/Empty";
import Card from "@/app/ui/components/Card";
import { Box, Divider, Grid2 as Grid, Typography } from "@mui/material";
// types
import { IProductWithUnit } from "@/app/lib/definitions/products";
// utils
import { getUnitLabel } from "@/app/lib/utils";

interface ProductsGroupProps {
  categoryName: string;
  products: IProductWithUnit[];
}

const ProductsGroup = ({ categoryName, products }: ProductsGroupProps) => {
  const t = useTranslations("products");

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
          {products.map(({ id, name, quantity, unit }) => (
            <Grid key={id} size={{ xs: 1 }}>
              <Card
                title={name}
                subTitle={`${t("amount")}: ${quantity}${getUnitLabel(unit)}`}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <EmptyState />
      )}
    </Box>
  );
};

export default ProductsGroup;
