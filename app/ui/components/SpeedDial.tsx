// components
import {
  SpeedDial as MuiSpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";

export enum SpeedDialDirections {
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
  UP = "up",
}

export interface ISpeedDialActions {
  icon: JSX.Element;
  name: string;
}

interface SpeedDialProps {
  actions: ISpeedDialActions[];
  ariaLabel: string;
  className?: string;
  direction?: SpeedDialDirections;
  icon?: React.ReactNode;
}

export default function SpeedDial({
  actions,
  ariaLabel,
  className,
  direction = SpeedDialDirections.UP,
  icon,
}: SpeedDialProps) {
  return (
    <MuiSpeedDial
      ariaLabel={ariaLabel}
      className={className}
      direction={direction}
      icon={icon ?? <SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </MuiSpeedDial>
  );
}
