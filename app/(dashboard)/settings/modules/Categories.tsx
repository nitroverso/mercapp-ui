"use client";

import { useTranslations } from "next-intl";
// components
import ControlBox, { ControlBoxFormT } from "@/app/ui/components/ControlBox";
// hooks
import { useStore } from "@/app/lib/hooks/useStore";
// services
import {
  addNewCategory,
  deleteCategory,
} from "@/app/lib/services/serviceCategories";

const Categories = () => {
  const t = useTranslations("settings");
  const {
    categories: { list },
    categoriesActions: { setLoadingCategories, setCategories },
  } = useStore();

  const handleSubmit = async ({ itemName }: ControlBoxFormT) => {
    setLoadingCategories(true);
    const category = await addNewCategory({ name: itemName });
    setCategories([...list, ...[category]]);
    setLoadingCategories(false);
  };

  const handleDelete = async (categoryId: string) => {
    setLoadingCategories(true);
    await deleteCategory({ categoryId });
    const newList = [...list].filter(({ id }) => id !== categoryId);
    setCategories(newList);
    setLoadingCategories(false);
  };

  return (
    <ControlBox
      boxItemManager={{ handleSubmit, inputLabel: t("categoryAdd") }}
      boxItemsList={{
        description: t("categoriesDesc"),
        items: list.map((category) => ({
          id: category.id,
          label: category.name,
        })),
        onDelete: handleDelete,
      }}
      boxMainHeader={{
        boxIcon: "🍱",
        boxTitle: t("categories"),
      }}
    />
  );
};

export default Categories;
