import { FC, useState } from "react";
import { Person } from "../models/Person";
import TrashIcon from "./TrashIcon";

interface PlanCardProps {
    person: Person;
    editPriceForKeyword: (price: number, keyword: string) => void;
    editPerson: (person: Person) => void;
    deletePerson: (person: Person) => void;
    orderNameKeywords: (input: string) => string[];
}

const PlanCard: FC<PlanCardProps> = ({
    person,
    editPriceForKeyword,
    editPerson,
    deletePerson,
    orderNameKeywords,
}) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPrice = parseInt(e.target.value) || 0;
        editPriceForKeyword(newPrice, person.orderName);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        person.moneyReturned = e.target.checked;
        editPerson(person);
    };

    const handleOrderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeOrderName(e.target.value);
    };

    const changeOrderName = (orderName: string) => {
        person.orderName = orderName;
        editPerson(person);
    };

    return (
        <>
            <div className="flex text-xl">
                <div className="w-2/12">{person.name}</div>
                <div className="w-2/12">
                    <button
                        className="px-2 py-1 bg-gray-300 border rounded border-gray-600 hover:bg-gray-200"
                        onClick={() => setEditMode((editMode) => !editMode)}
                    >
                        {person.orderName}
                    </button>
                </div>
                <div className="w-2/12">{person.gave} ДЕН</div>
                <div className="w-2/12">
                    <input
                        type="number"
                        className="w-11/12 py-1.5 px-2 rounded border-2 border-gray-500"
                        value={person.price}
                        onChange={handlePriceChange}
                    />
                </div>
                <div className="w-2/12">{person.getReturnAmount()}</div>
                <div className="w-2/12 flex">
                    <input
                        type="checkbox"
                        className="w-1/2"
                        checked={person.moneyReturned}
                        onChange={handleCheckboxChange}
                    />
                    <button
                        className="w-1/2 py-2 px-5 bg-red-500 hover:bg-red-400 border rounded border-red-600"
                        onClick={() => deletePerson(person)}
                    >
                        <TrashIcon />
                    </button>
                </div>
            </div>
            {editMode && (
                <div className="flex text-xl">
                    <div className="w-2/12">
                        <input
                            type="text"
                            className="w-full py-1.5 px-2 rounded border-2 border-gray-500"
                            value={person.orderName}
                            onChange={handleOrderNameChange}
                        />
                    </div>
                    <div className="w-10/12">
                        {person.orderName.length > 0 &&
                            orderNameKeywords(person.orderName).length > 0 && (
                                <div className="mb-2">
                                    {orderNameKeywords(person.orderName).map(
                                        (orderNameKeyword) => (
                                            <button
                                                key={orderNameKeyword}
                                                className="border ml-2 px-2 py-1 rounded bg-red-500 border-red-600 hover:bg-red-400"
                                                onClick={() =>
                                                    changeOrderName(
                                                        orderNameKeyword
                                                    )
                                                }
                                            >
                                                {orderNameKeyword}
                                            </button>
                                        )
                                    )}
                                </div>
                            )}
                    </div>
                </div>
            )}
        </>
    );
};

export default PlanCard;
