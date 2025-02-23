// components
import {
  Box,
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface CardProps {
  description?: string;
  image?: string;
  subTitle: string;
  title: string;
}

const Card = ({
  description,
  image = "/shopping-cart.webp",
  subTitle,
  title,
}: CardProps) => {
  return (
    <MuiCard className="flex h-full" variant="outlined">
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
      </Box>
    </MuiCard>
  );
};

export default Card;
