import { ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { Box, Button, Group, Switch } from "@mantine/core";

type ViewSwitcherProps = {
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
};

export const ViewSwitcher = ({
  onViewModeChange,
  onViewListChange,
  isChecked,
}: ViewSwitcherProps) => {
  return (<>
    <Group align={"center"} position={"center"}>
      <Button.Group p={"xs"}>
        <Button
          variant="white"

          onClick={() => onViewModeChange(ViewMode.Hour)}
        >
          Hour
        </Button>
        <Button
          variant="white"
          onClick={() => onViewModeChange(ViewMode.QuarterDay)}
        >
          Quarter of Day
        </Button>
        <Button
          variant="white"

          onClick={() => onViewModeChange(ViewMode.HalfDay)}
        >
          Half of Day
        </Button>
        <Button variant="white" onClick={() => onViewModeChange(ViewMode.Day)}>
          Day
        </Button>
        <Button
          variant="white"

          onClick={() => onViewModeChange(ViewMode.Week)}
        >
          Week
        </Button>
        <Button
          variant="white"

          onClick={() => onViewModeChange(ViewMode.Month)}
        >
          Month
        </Button>
        <Button
          variant="white"

          onClick={() => onViewModeChange(ViewMode.Year)}
        >
          Year
        </Button>
      </Button.Group>
      <Switch label={"show task date"} checked={isChecked} onChange={() => onViewListChange(!isChecked)} />

    </Group>
  </>)
}