import { ReactNode, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
// components
import {
  Card,
  CardHeader,
  Checkbox,
  Divider,
  Grid2 as Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Button from "@/app/ui/components/Button";
// icons
import ArrowForwardIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowBackIcon from "@mui/icons-material/KeyboardArrowLeft";
// types
import { IProduct } from "@/app/lib/definitions/products";
import { IUnit } from "@/app/lib/definitions/units";
// utils
import { getUnitLabel } from "@/app/lib/utils";

function not(a: readonly IProduct[], b: readonly IProduct[]) {
  return a.filter(
    (aProduct) => !b.some((bProduct) => bProduct.id === aProduct.id)
  );
}

function intersection(a: readonly IProduct[], b: readonly IProduct[]) {
  return a.filter((aProduct) =>
    b.some((bProduct) => bProduct.id === aProduct.id)
  );
}

function union(a: readonly IProduct[], b: readonly IProduct[]) {
  return [...a, ...not(b, a)];
}

interface TransferListProps {
  onRightChange: (list: readonly IProduct[]) => void;
  products: IProduct[];
  units: IUnit[];
}

export default function TransferList({
  products,
  units,
  onRightChange,
}: TransferListProps) {
  const t = useTranslations();

  const [checked, setChecked] = useState<readonly IProduct[]>([]);
  const [left, setLeft] = useState<readonly IProduct[]>([]);
  const [right, setRight] = useState<readonly IProduct[]>(products);

  useEffect(() => {
    if (products.length) setRight(products);
  }, [products.length]);

  useEffect(() => {
    onRightChange(right);
  }, [right.length]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  // ? This function allow to check or not a product
  const handleToggle = (product: IProduct) => () => {
    const currentIndex = checked.findIndex(
      (checkedProduct) => checkedProduct.id === product.id
    );
    const newChecked = [...checked];

    if (currentIndex === -1) {
      // If product is not checked, we mark it as checked by adding it
      newChecked.push(product);
    } else {
      // If product is checked, we mark it as unchecked by removing it
      newChecked.splice(currentIndex, 1);
    }

    // We set the global checked products
    setChecked(newChecked);
  };

  // ? This function determines how many products are checked
  const numberOfChecked = (products: readonly IProduct[]) =>
    intersection(checked, products).length;

  // ? This function allows select all products in a list
  const handleToggleAll = (products: readonly IProduct[]) => () => {
    // If all are already checked and tries to toggle all
    if (numberOfChecked(products) === products.length) {
      // We unchecked all (I think this could be changed by setting an empty array)
      setChecked(not(checked, products));
    } else {
      setChecked(union(checked, products));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title: ReactNode, list: readonly IProduct[]) => (
    <Card>
      <CardHeader
        avatar={
          <Checkbox
            checked={numberOfChecked(list) === list.length && list.length !== 0}
            disabled={list.length === 0}
            indeterminate={
              numberOfChecked(list) !== list.length &&
              numberOfChecked(list) !== 0
            }
            onClick={handleToggleAll(list)}
          />
        }
        subheader={`${numberOfChecked(list)}/${list.length} ${t(
          "ui.selected"
        )}`}
        sx={{ px: 2, py: 1 }}
        title={title}
      />
      <Divider />
      <List
        dense
        component="div"
        role="list"
        sx={{
          bgcolor: "background.paper",
          height: 300,
          overflow: "auto",
          width: 350,
        }}
      >
        {list.map((product) => {
          return (
            <ListItemButton
              key={product.id}
              role="listitem"
              onClick={handleToggle(product)}
            >
              <ListItemIcon>
                <Checkbox
                  disableRipple
                  checked={checked.some(
                    (checkedProduct) => checkedProduct.id === product.id
                  )}
                  tabIndex={-1}
                />
              </ListItemIcon>
              <ListItemText
                primary={`${product.name} (${product.quantity}${getUnitLabel(
                  units.find((unit) => unit.id === product.unit_id)!
                )})`}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid
      container
      columns={{ xs: 1, lg: 5 }}
      spacing={2}
      sx={{ alignItems: "center", justifyContent: "center" }}
    >
      <Grid size={{ xs: 1, lg: 2 }}>
        {customList(t("events.choices"), left)}
      </Grid>
      <Grid size={{ xs: 1 }}>
        <Grid container direction="column" sx={{ alignItems: "center" }}>
          <Button
            buttonProps={{
              disabled: rightChecked.length === 0,
              onClick: handleCheckedLeft,
            }}
            className="my-1"
          >
            <ArrowBackIcon />
          </Button>
          <Button
            buttonProps={{
              disabled: leftChecked.length === 0,
              onClick: handleCheckedRight,
            }}
            className="my-1"
          >
            <ArrowForwardIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid size={{ xs: 1, lg: 2 }}>
        {customList(t("events.chosen"), right)}
      </Grid>
    </Grid>
  );
}
