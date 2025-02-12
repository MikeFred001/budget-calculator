import Controls from "./Controls";
import PanelHeader from "./common/PanelHeader";
import { useState } from "react";

export default function ControlsPanel() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="CONTROLS-PANEL">
      <PanelHeader
        defaultText="Controls"
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <Controls />
    </div>
  );
}
