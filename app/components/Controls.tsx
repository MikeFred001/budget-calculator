import Switch from "./Switch";

export default function Controls() {
  return (
    <div className="CONTROLS flex gap-2">
      <Switch
        label="Merge"
        buttonLabels={["On", "Off"]}
        state={"split"}
        buttonWidth={125}
      />
      <Switch
        label="Sort By Day"
        buttonLabels={["On", "Off"]}
        state={"budgetItemsSorted"}
        buttonWidth={125}
      />
    </div>
  );
}
