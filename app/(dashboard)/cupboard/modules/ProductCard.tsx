// components
import Card from "@/app/ui/components/Card";

interface ProductCardProps {
  amount: string;
  image?: string;
  name: string;
}

const ProductCard = ({ amount, name, image }: ProductCardProps) => {
  return <Card image={image} subTitle={amount} title={name} />;
};

export default ProductCard;
