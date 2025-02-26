import ProductsList from "@/app/(dashboard)/cupboard/modules/ProductsList";
import { ITopBarSearch } from "@/app/lib/definitions/ui";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<ITopBarSearch>;
}) {
  const searchQuery = (await searchParams).searchQuery;
  return <ProductsList searchQuery={searchQuery} />;
}
