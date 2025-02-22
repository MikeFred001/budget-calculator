import Typography from "./common/Typography";
import Button from "./common/Button";
import useAppStore from "../store/appStore";

export default function Switch({
  label,
  buttonLabels = [],
  state,
}: ISwitchProps) {
  const app = useAppStore();
  const appStoreSetting = app[state];
  const headerStyle =
    "Default-filled flex text-center text-[.8rem] md:text-[.9rem] leading-tight font-semibold w-[65px] h-full h-10 md:h-auto md:w-auto items-center justify-center";

  return (
    <div className="SWITCH relative flex justify-around md:flex-col">
      <div className="border border-green-300 flex items-center md:block">
        <div className={headerStyle}>
          <Typography className="leading-none">{label}</Typography>
        </div>
        <div className="flex h-full md:h-auto">
          <Button
            onClick={() => app.setAppState({ [state]: false })}
            className={`flex flex-grow justify-center items-center md:hover:font-semibold w-[50px] md:w-[125px] ${
              appStoreSetting
                ? "Default-outline !border-none"
                : "Default-filled !border-black"
            }`}
          >
            <Typography>{buttonLabels[0]}</Typography>
          </Button>
          <Button
            onClick={() => app.setAppState({ [state]: true })}
            className={`flex flex-grow justify-center items-center md:hover:font-semibold w-[50px] md:w-[125px] ${
              appStoreSetting
                ? "Default-filled !border-black"
                : "Default-outline !border-none"
            }`}
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
}
