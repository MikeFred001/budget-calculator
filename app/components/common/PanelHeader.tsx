import Typography from "../common/Typography";
import Button from "../common/Button";
import { useState } from "react";

export default function PanelHeader({
  defaultText,
  collapsed,
  groupFreq,
  onButtonClick,
  setCollapsed,
}: IPanelHeaderProps) {
  const [headerText, setHeaderText] = useState(defaultText);
  const [headerDisabled, setHeaderDisabled] = useState(false);

  groupFreq = groupFreq ? groupFreq : "Default";

  return (
    <div
      className={`
        ${groupFreq}-filled ${defaultText === headerText ? "" : `${groupFreq}-hover`}
        px-2 cursor-pointer flex justify-between items-center
      `}
      onClick={handleHeaderClick}
      onMouseEnter={handleHeaderHover}
      onMouseLeave={() => setHeaderText(defaultText)}
    >
      <Typography className="text-black font-bold">{headerText}</Typography>

      {onButtonClick && (
        <Button
          className={`${groupFreq}-outline ${groupFreq}-hover font-arial bg-black outline outline-black h-[25px] font-bold hover:text-black`}
          onClick={onButtonClick}
          onMouseEnter={handleAddHover}
          onMouseLeave={handleAddLeave}
        >
          +
        </Button>
      )}
    </div>
  );

  function handleHeaderHover() {
    if (collapsed) {
      setHeaderText("EXPAND");
    } else {
      setHeaderText("COLLAPSE");
    }
  }

  function handleHeaderClick() {
    if (headerDisabled) return;
    setCollapsed(!collapsed);
    if (headerText === "EXPAND") {
      setHeaderText("COLLAPSE");
    } else {
      setHeaderText("EXPAND");
    }
  }

  function handleAddHover() {
    setHeaderDisabled(true);
    setHeaderText(defaultText);
  }

  function handleAddLeave() {
    setHeaderDisabled(false);
    handleHeaderHover();
  }
}

interface IPanelHeaderProps {
  defaultText: string;
  collapsed: boolean;
  groupFreq?: string;
  onButtonClick?: () => void;
  setCollapsed: (collapsed: boolean) => void;
}
