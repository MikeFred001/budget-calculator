import Typography from "./common/Typography";
import Button from "./common/Button";
import useAppStore from "../store/appStore";

export default function Switch({
  label,
  buttonLabels = [],
  state,
  buttonWidth,
}: ISwitchProps) {
  const app = useAppStore();
  const appStoreSetting = app[state];
  const headerStyle =
    "Default-filled text-center text-[.9rem] leading-tight font-semibold";

  return (
    <div className="SWITCH relative flex justify-around">
      <div className="border border-green-300">
        <div className={headerStyle}>{label}</div>
        <div className="flex">
          <Button
            onClick={() => app.setAppState({ [state]: false })}
            className={`flex flex-grow justify-center items-center hover:font-semibold ${
              appStoreSetting
                ? "Default-outline !border-none"
                : "Default-filled !border-black"
            }`}
            style={{ width: `${buttonWidth}px` }}
          >
            <Typography>{buttonLabels[0]}</Typography>
          </Button>
          <Button
            onClick={() => app.setAppState({ [state]: true })}
            className={`flex flex-grow justify-center items-center hover:font-semibold ${
              appStoreSetting
                ? "Default-filled !border-black"
                : "Default-outline !border-none"
            }`}
            style={{ width: `${buttonWidth}px` }}
          >
            <Typography>{buttonLabels[1]}</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ISwitchProps {
  label: string;
  buttonLabels: string[];
  state: string;
  buttonWidth?: number;
}
