import Typography from "./common/Typography";
import Button from "./common/Button";
import EditDebtItemForm from "./EditDebtItemForm";
import { capitalize } from "@/utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import useAppStore from "../store/appStore";

export default function DebtItem({ item, className }: IDebtItemProps) {
  const [editingDebtItem, setEditingDebtItem] = useState(false);
  const { debtItems, setAppState } = useAppStore();

  return !editingDebtItem ? (
    <div
      className={`
      DEBT-ITEM grid grid-cols-3 items-center p-2 border Default-outline text-[1.4rem] ${className}
    `}
    >
      <Typography>{capitalize(item.name)}</Typography>
      <Typography currency className="text-right">
        {item.amount}
      </Typography>
      <div className="flex justify-self-end">
        <Button
          className={`size-[45px] font-arial font-bold hover:bg-green-300 hover:border-green-300 hover:text-black active:bg-white active:border-white ml-1 active:text-black Default-outline`}
          onClick={() => setEditingDebtItem(true)}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </Button>
        <Button
          onClick={deleteItem}
          className={`size-[45px] font-arial font-bold hover:bg-green-300 hover:border-green-300 hover:text-black active:bg-white active:border-white ml-1 active:text-black Default-outline`}
        >
          X
        </Button>
      </div>
    </div>
  ) : (
    <EditDebtItemForm item={item} setEditingDebtItem={setEditingDebtItem} />
  );

  function deleteItem(): void {
    const filtered: IDebtItem[] = debtItems.filter((dItem) => {
      return dItem.id !== item.id;
    });
    setAppState({ debtItems: filtered });
  }
}

interface IDebtItemProps {
  item: IDebtItem;
  className?: string;
}

interface IDebtItem {
  id: number;
  name: string;
  amount: number;
}
