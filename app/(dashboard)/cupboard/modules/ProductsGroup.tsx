// components
import ProductCard from "@/app/(dashboard)/cupboard/modules/ProductCard";
import EmptyState from "@/app/ui/components/Empty";
import { Box, Divider, Grid2 as Grid, Typography } from "@mui/material";
// types
import { IProduct } from "@/app/lib/definitions/products";

interface ProductsGroupProps {
  categoryName: string;
  products: IProduct[];
}

const ProductsGroup = ({ categoryName, products }: ProductsGroupProps) => {
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
          {products.map(({ id, name, quantity, unit_id }) => (
            <Grid key={id} size={{ xs: 1 }}>
              <ProductCard amount={`${quantity}`} name={name} />
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
