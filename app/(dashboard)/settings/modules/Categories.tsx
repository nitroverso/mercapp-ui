"use client";

import { useTranslations } from "next-intl";
// components
import ControlBox from "@/app/ui/components/ControlBox";
// hooks
import { useStore } from "@/app/lib/hooks/useStore";

const Categories = () => {
  const t = useTranslations("settings");
  const {
    categories: { list },
  } = useStore();

  return (
    <ControlBox
      boxItemManager={{ handleSubmit: undefined, inputLabel: t("categoryAdd") }}
      boxItemsList={{
        description: t("categoriesDesc"),
        items: list.map((category) => ({
          id: category.id,
          label: category.name,
        })),
      }}
      boxMainHeader={{
        boxIcon: "🍱",
        boxTitle: t("categories"),
      }}
    />
  );
};

export default Categories;
