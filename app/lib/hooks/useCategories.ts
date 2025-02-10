import { useTranslations } from "next-intl";
// hooks
import { useStore } from "@/app/lib/hooks/useStore";
// services
import { getAllCategories } from "@/app/lib/services/serviceCategories";
// types
import { ALERT_SEVERITY } from "@/app/lib/definitions/ui";
import { handleErrorUI } from "@/app/lib/utils/errorHandler";

export function useCategories() {
  const t = useTranslations("ui");
  const {
    auth: { session: storedSession },
    categoriesActions: { setCategories, setLoadingCategories },
    uiActions: {
      uiAlertsActions: { setMessage },
    },
  } = useStore();

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const categories = await getAllCategories();
      setCategories(categories);
      setLoadingCategories(false);
      setMessage(
        t("welcome", { name: storedSession!.profile.firstName }),
        ALERT_SEVERITY.SUCCESS
      );
    } catch (error) {
      setLoadingCategories(false);
      const cleansedError = handleErrorUI(
        error,
        "Error when loading categories."
      );
      setMessage(cleansedError, ALERT_SEVERITY.ERROR);
    }
  };

  return { loadCategories };
}
