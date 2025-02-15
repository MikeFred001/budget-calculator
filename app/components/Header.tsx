import Typography from "./common/Typography";

export default function Header() {
  return (
    <div className="HEADER justify-between leading-none text-[2rem] hidden md:flex">
      <Typography className="drop-shadow-[0_0_5px_rgba(34,197,94,1)]">
        Girl Math
      </Typography>
      <Typography>{new Date().toLocaleDateString()}</Typography>
    </div>
  );
}
