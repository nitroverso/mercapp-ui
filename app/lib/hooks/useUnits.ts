// hooks
import { useStore } from "@/app/lib/hooks/useStore";
import { useError } from "@/app/lib/hooks/useError";
// services
import { getAllUnitsService } from "@/app/lib/services/serviceUnits";

export function useUnits() {
  const {
    units: { list, loadingUnits },
    unitsActions: { setUnits, setLoadingUnits },
  } = useStore();

  const { processError } = useError();

  const loadUnits = async () => {
    try {
      setLoadingUnits(true);
      const categories = await getAllUnitsService();
      setUnits(categories);
      setLoadingUnits(false);
    } catch (error) {
      setLoadingUnits(false);
      processError(error);
    }
  };

  return {
    units: list,
    loadUnits,
    loadingUnits,
  };
}
