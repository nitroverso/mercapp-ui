import { redirect } from "next/navigation";
// modules
import ProductDetails from "@/app/(dashboard)/cupboard/modules/ProductDetails";
// types
import { CUPBOARD_ROUTE } from "@/app/lib/definitions/routes";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const productId = (await searchParams).productId;
  if (!productId) redirect(CUPBOARD_ROUTE);
  return <ProductDetails productId={productId as string} />;
}
