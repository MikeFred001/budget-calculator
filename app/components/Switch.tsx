import Typography from "./common/Typography";
import Button from "./common/Button";

export default function Switch({ split, toggleSplit }: ISwitchProps) {
  return (
    <div className="SWITCH relative flex justify-around border border-green-300 w-[20rem]">
      <Button
        onClick={() => toggleSplit(true)}
        className={`py-[6px] flex flex-grow justify-center items-center hover:font-semibold ${
          split ? "Default-filled" : "Default-outline"
        }`}
      >
        <Typography>Split</Typography>
      </Button>
      <Button
        onClick={() => toggleSplit(false)}
        className={`py-[6px] flex flex-grow justify-center items-center hover:font-semibold ${
          split ? "Default-outline" : "Default-filled"
        }`}
      >
        <Typography>Merge</Typography>
      </Button>
    </div>
  );
}

interface ISwitchProps {
  split: boolean;
  toggleSplit: (setting: boolean) => void;
}
