"use client";

import { useState } from "react";
// components
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
} from "@mui/material";
import Button, {
  ButtonScope,
  ButtonSizes,
  ButtonTypes,
} from "@/app/ui/components/Button";
import Form from "@/app/ui/components/form/Form";
import TextInput from "@/app/ui/components/form/inputs/TextInput";
import EmptyState from "@/app/ui/components/Empty";
// icons
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Dns from "@mui/icons-material/Dns";
import { InputSizes } from "@/app/ui/components/form/inputs/BaseInput";

type ControlBoxFormT = { itemName: string };

interface ControlBoxProps {
  boxMainHeader: {
    boxTitle: string;
    boxIcon: React.ReactNode;
  };
  boxItemManager: {
    handleSubmit: ({ itemName }: ControlBoxFormT) => void;
    inputLabel: string;
  };
  boxItemsList: {
    description: string;
    items: { id: string; label: string }[];
  };
}

export default function ControlBox({
  boxMainHeader: { boxIcon, boxTitle },
  boxItemManager: { handleSubmit, inputLabel },
  boxItemsList: { description, items },
}: ControlBoxProps) {
  const [open, setOpen] = useState(true);

  const renderBoxMainHeader = () => {
    return (
      <Box className="p-5 flex items-center">
        {/* Control box main header icon */}
        <ListItemIcon sx={{ fontSize: 20 }}>{boxIcon}</ListItemIcon>
        <ListItemText
          primary={boxTitle}
          primaryTypographyProps={{
            fontSize: 20,
            fontWeight: "medium",
            letterSpacing: 0,
          }}
        />
      </Box>
    );
  };

  const renderBoxItemManager = () => {
    return (
      <ListItem component="div">
        <Form<ControlBoxFormT> onSubmit={handleSubmit}>
          <Box className="flex items-center">
            <TextInput
              isRequired
              label={inputLabel}
              name="firstName"
              size={InputSizes.SMALL}
            />
            {/* Control box item manager action button (could be an array) */}
            <Button
              iconButtonProps={{ color: "primary", size: ButtonSizes.LARGE }}
              scope={ButtonScope.ICON}
              type={ButtonTypes.SUBMIT}
            >
              {/* Control box item manager action tooltip */}
              <Tooltip title="Add a new category">
                <AddCircleIcon />
              </Tooltip>
            </Button>
          </Box>
        </Form>
      </ListItem>
    );
  };

  const renderBoxItemsList = () => {
    return (
      <Box>
        {/* Control box items description */}
        <ListItemButton alignItems="flex-start">
          <ListItemText
            primary={description}
            primaryTypographyProps={{
              fontSize: 15,
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
          />
        </ListItemButton>
        {/* Control box items list with actions */}
        {items.length ? (
          items.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <Button
                  iconButtonProps={{ "aria-label": "delete", edge: "end" }}
                  scope={ButtonScope.ICON}
                >
                  {/* Control box item list action icon */}
                  <DeleteIcon />
                </Button>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <Dns />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.label} />
            </ListItem>
          ))
        ) : (
          <EmptyState />
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Paper elevation={0} sx={{ minWidth: 256, width: 400 }}>
        <List component="nav">
          {renderBoxMainHeader()}
          <Divider />
          {renderBoxItemManager()}
          <Divider />
          {renderBoxItemsList()}
        </List>
      </Paper>
    </Box>
  );
}
