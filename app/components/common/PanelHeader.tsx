import Typography from "../common/Typography";
import Button from "../common/Button";
import { useState } from "react";

export default function PanelHeader({
  defaultText,
  collapsed,
  groupFreq = "Default",
  onButtonClick,
  setCollapsed,
}: IPanelHeaderProps) {
  const [headerText, setHeaderText] = useState(defaultText);
  const [headerDisabled, setHeaderDisabled] = useState(false);

  return (
    <div
      className={`
        PANEL-HEADER ${groupFreq}-filled ${defaultText === headerText ? "" : `${groupFreq}-hover`}
        px-2 cursor-pointer flex justify-between items-center md:h-8 h-12 active:bg-white active:border-white
      `}
      onMouseEnter={handleHeaderHover}
      onMouseLeave={() => setHeaderText(defaultText)}
    >
      {/* Desktop */}
      <Typography
        className="text-black font-bold hidden md:inline flex-grow"
        onClick={handleHeaderClick}
      >
        {headerText}
      </Typography>

      {/* Mobile */}
      <Typography
        className="text-black font-bold md:hidden flex-grow"
        onClick={handleHeaderClick}
      >
        {defaultText}
      </Typography>

      {onButtonClick && (
        <Button
          className={`${groupFreq}-outline ${groupFreq}-hover font-arial bg-black outline outline-black h-[80%] font-bold md:hover:text-black active:border-white active:bg-white z-10`}
          onClick={handleButtonClick}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
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

  function handleButtonHover() {
    setHeaderDisabled(true);
    setHeaderText(defaultText);
  }

  function handleButtonLeave() {
    setHeaderDisabled(false);
    handleHeaderHover();
  }

  function handleButtonClick() {
    if (collapsed) setCollapsed(false);
    if (onButtonClick) onButtonClick();
  }
}

interface IPanelHeaderProps {
  defaultText: string;
  collapsed: boolean;
  groupFreq?: string;
  onButtonClick?: () => void;
  setCollapsed: (collapsed: boolean) => void;
}
