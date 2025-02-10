"use client";

import { useTranslations } from "next-intl";
// components
import ControlBox, {
  ControlBoxFormEditT,
  ControlBoxFormT,
} from "@/app/ui/components/ControlBox";
// hooks
import { useCategories } from "@/app/lib/hooks/useCategories";

const Categories = () => {
  const t = useTranslations("settings");

  const { addCategory, categories, deleteCategory, editCategory } =
    useCategories();

  const handleAdd = async ({ itemName }: ControlBoxFormT) => {
    await addCategory(itemName);
  };

  const handleEdit = async ({ itemId, itemName }: ControlBoxFormEditT) => {
    await editCategory(itemId, itemName);
  };

  const handleDelete = async (categoryId: string) => {
    await deleteCategory(categoryId);
  };

  return (
    <ControlBox
      boxItemManager={{
        addLabel: t("categoryAdd"),
        editLabel: t("categoryEdit"),
        onAdd: handleAdd,
        onEdit: handleEdit,
      }}
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
