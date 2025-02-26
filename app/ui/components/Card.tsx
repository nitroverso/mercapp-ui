// components
import Button, { ButtonScope, ButtonSizes } from "@/app/ui/components/Button";
import {
  Box,
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  SvgIconTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface CardProps {
  cardActions?: {
    action: () => void;
    icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
      muiName: string;
    };
  }[];
  description?: string;
  image?: string;
  subTitle: string;
  title: string;
}

const Card = ({
  cardActions,
  description,
  image = "/shopping-cart.webp",
  subTitle,
  title,
}: CardProps) => {
  const renderCardActions = () => {
    if (!cardActions || !cardActions.length) return null;
    return (
      <CardActions disableSpacing>
        {cardActions.map(({ action, icon: Icon }, index) => (
          <Button
            key={index}
            iconButtonProps={{
              color: "primary",
              onClick: action,
              size: ButtonSizes.MEDIUM,
            }}
            scope={ButtonScope.ICON}
          >
            <Icon />
          </Button>
        ))}
      </CardActions>
    );
  };

  return (
    <MuiCard className="flex h-full max-w-[720px]" variant="outlined">
      <CardMedia
        alt={`Card image for ${title}`}
        component="img"
        image={image}
        sx={{ width: "30%" }}
      />
      <Box className="flex flex-col">
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography variant="h5">{title}</Typography>
          <Typography sx={{ color: "text.secondary" }} variant="subtitle1">
            {subTitle}
          </Typography>
          <Typography sx={{ color: "text.secondary" }} variant="subtitle2">
            {description}
          </Typography>
        </CardContent>
        {renderCardActions()}
      </Box>
    </MuiCard>
  );
};

export default Card;
