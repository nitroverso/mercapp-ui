import { useTranslations } from "next-intl";
// hooks
import { useStore } from "@/app/lib/hooks/useStore";
import { useError } from "@/app/lib/hooks/useError";
// services
import { getAllCategories } from "@/app/lib/services/serviceCategories";
// types
import { ALERT_SEVERITY } from "@/app/lib/definitions/ui";

export function useCategories() {
  const t = useTranslations("ui");
  const {
    auth: { session: storedSession },
    categoriesActions: { setCategories, setLoadingCategories },
    uiActions: {
      uiAlertsActions: { setMessage },
    },
  } = useStore();

  const { processError } = useError();

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
      processError(error);
    }
  };

  return { loadCategories };
}
