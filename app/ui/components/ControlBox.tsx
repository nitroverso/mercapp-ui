import { useState } from "react";
import clsx from "clsx";
// components
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
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
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import Dns from "@mui/icons-material/Dns";
import { InputSizes } from "@/app/ui/components/form/inputs/BaseInput";

type ControlBoxItem = { id: string; label: string };
export type ControlBoxFormT = { itemName: string };
export type ControlBoxFormEditT = ControlBoxFormT & { itemId: string };

interface ControlBoxProps {
  boxMainHeader: {
    boxTitle: string;
    boxIcon: React.ReactNode;
  };
  boxItemManager: {
    onAdd: (params: ControlBoxFormT) => void;
    onEdit: (params: ControlBoxFormEditT) => void;
    addLabel: string;
    editLabel: string;
  };
  boxItemsList: {
    description: string;
    items: ControlBoxItem[];
    onDelete: (id: string) => void;
  };
}

export default function ControlBox({
  boxMainHeader: { boxIcon, boxTitle },
  boxItemManager: { onAdd, onEdit, addLabel, editLabel },
  boxItemsList: { description, items, onDelete },
}: ControlBoxProps) {
  const [selectedItem, setSelectedItem] = useState<ControlBoxItem | null>(null);

  const renderHeader = () => {
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

  const renderForm = () => {
    const formLabel = selectedItem ? editLabel : addLabel;
    return (
      <ListItem component="div">
        <Form<ControlBoxFormT>
          updatedValues={
            selectedItem ? { itemName: selectedItem?.label } : undefined
          }
          onSubmit={
            selectedItem
              ? ({ itemName }) => onEdit({ itemId: selectedItem.id, itemName })
              : onAdd
          }
          onSuccess={() => setSelectedItem(null)}
        >
          <Box className="flex items-center">
            <TextInput
              isRequired
              label={formLabel}
              name="itemName"
              size={InputSizes.SMALL}
            />
            {/* Control box item manager action button (could be an array) */}
            <Button
              iconButtonProps={{ color: "primary", size: ButtonSizes.LARGE }}
              scope={ButtonScope.ICON}
              type={ButtonTypes.SUBMIT}
            >
              {/* Control box item manager action tooltip */}
              <Tooltip title={formLabel}>
                {selectedItem ? <SyncAltIcon /> : <AddCircleIcon />}
              </Tooltip>
            </Button>
          </Box>
        </Form>
        {selectedItem && (
          <Button
            iconButtonProps={{
              color: "primary",
              onClick: () => setSelectedItem(null),
              size: ButtonSizes.LARGE,
            }}
            scope={ButtonScope.ICON}
          >
            <CancelIcon />
          </Button>
        )}
      </ListItem>
    );
  };

  const renderList = () => {
    const renderSecondaryActions = (item: ControlBoxItem) => {
      return (
        <Box className="flex">
          <Button
            iconButtonProps={{
              onClick: () => setSelectedItem(item),
            }}
            scope={ButtonScope.ICON}
          >
            {/* Control box item list action icon */}
            <EditIcon />
          </Button>
          <Button
            iconButtonProps={{ onClick: () => onDelete(item.id) }}
            scope={ButtonScope.ICON}
          >
            {/* Control box item list action icon */}
            <DeleteIcon />
          </Button>
        </Box>
      );
    };

    return (
      <Box className="h-60 overflow-auto">
        {/* Control box items list with actions */}
        {items.length ? (
          items.map((item) => (
            <ListItem
              key={item.id}
              className={clsx(selectedItem?.id === item.id && "bg-gray-200")}
              secondaryAction={renderSecondaryActions(item)}
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
    <Box className="flex">
      <Paper elevation={0} sx={{ minWidth: 256, width: 400 }}>
        <List component="nav">
          {renderHeader()}
          <Divider />
          {renderForm()}
          <Divider />
          {/* Control box items description */}
          <ListItemText
            primary={description}
            primaryTypographyProps={{
              fontSize: 15,
              fontWeight: "medium",
              lineHeight: "20px",
              padding: "8px 16px",
            }}
          />
          <Divider />
          {renderList()}
        </List>
      </Paper>
    </Box>
  );
}
