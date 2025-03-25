"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
// components
import { Box, Divider, Typography } from "@mui/material";
import Form from "@/app/ui/components/form/Form";
import TextInput from "@/app/ui/components/form/inputs/TextInput";
import DateInput from "@/app/ui/components/form/inputs/DateInput";
import Button, { ButtonSizes, ButtonTypes } from "@/app/ui/components/Button";
import TransferList from "@/app/(dashboard)/events/modules/TransferList";
// hooks
import { useEvents } from "@/app/lib/hooks/useEvents";
import { useProducts } from "@/app/lib/hooks/useProducts";
import { useUnits } from "@/app/lib/hooks/useUnits";
// types
import { EVENTS_ROUTE } from "@/app/lib/definitions/routes";
import { IEventRequest } from "@/app/lib/definitions/events";

interface EventDetailsProps {
  eventId?: string;
}

const EventDetails = ({ eventId }: EventDetailsProps) => {
  const t = useTranslations();
  const router = useRouter();
  const { addEvent } = useEvents();
  const { products } = useProducts();
  const { units } = useUnits();
  const [productIds, setProductIds] = useState<string[]>([]);

  const handleFormSubmit = async (data: IEventRequest) => {
    const newEvent = eventId
      ? await addEvent({ ...data, productIds })
      : await addEvent({ ...data, productIds });
    if (!newEvent) throw new Error("service not processed");
    router.push(EVENTS_ROUTE);
  };

  return (
    <Box className="flex flex-col gap-3">
      <Divider textAlign="center">
        <Typography component="h1" variant="h4">
          {t("ui.info")}
        </Typography>
      </Divider>
      <Form<IEventRequest> preventReset onSubmit={handleFormSubmit}>
        <Box className="flex flex-col items-center gap-4">
          <TextInput isRequired label={t("events.name")} name="name" />
          <DateInput isRequired label={t("events.date")} name="date" />
          <TransferList
            products={products}
            units={units}
            onRightChange={(list) => setProductIds(list.map((item) => item.id))}
          />
          <Box className="flex gap-2">
            <Button
              buttonProps={{ onClick: () => router.push(EVENTS_ROUTE) }}
              size={ButtonSizes.LARGE}
            >
              {t("form.cancel")}
            </Button>
            <Button size={ButtonSizes.LARGE} type={ButtonTypes.SUBMIT}>
              {t(eventId ? "form.edit" : "form.save")}
            </Button>
          </Box>
        </Box>
      </Form>
    </Box>
  );
};

export default EventDetails;
