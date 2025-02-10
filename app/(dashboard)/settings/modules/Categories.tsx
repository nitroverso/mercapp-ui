"use client";

import { useTranslations } from "next-intl";
// components
import ControlBox, { ControlBoxFormT } from "@/app/ui/components/ControlBox";
// hooks
import { useCategories } from "@/app/lib/hooks/useCategories";

const Categories = () => {
  const t = useTranslations("settings");

  const { addCategory, categories, deleteCategory } = useCategories();

  const handleSubmit = async ({ itemName }: ControlBoxFormT) => {
    await addCategory(itemName);
  };

  const handleDelete = async (categoryId: string) => {
    await deleteCategory(categoryId);
  };

  return (
    <ControlBox
      boxItemManager={{ inputLabel: t("categoryAdd"), onSubmit: handleSubmit }}
      boxItemsList={{
        description: t("categoriesDesc"),
        items: categories.map((category) => ({
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
