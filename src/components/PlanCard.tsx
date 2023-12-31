import { FC, useState } from "react";
import { Person } from "../models/Person";

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
        const { value } = e.target;
        const newPrice = parseInt(value) || 0;
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

    const handleGaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const newPrice = parseInt(value) || 0;
        person.gave = newPrice;
        editPerson(person);
    };

    return (
        <>
            <div className="flex justify-between text-xl">
                <div className="">{person.name}</div>
                <div className="">
                    <button
                        className="px-2 py-1 bg-gray-300 border rounded border-gray-600 hover:bg-gray-200"
                        onClick={() => setEditMode((editMode) => !editMode)}
                    >
                        {person.orderName}
                    </button>
                </div>
            </div>
            {editMode && (
                <div className="text-xl mt-2">
                    <div className="w-full mb-2">
                        <input
                            type="text"
                            className="w-full py-1.5 px-2 rounded border-2 border-gray-500"
                            value={person.orderName}
                            onChange={handleOrderNameChange}
                        />
                    </div>
                    <div className="w-full">
                        {person.orderName.length > 0 &&
                            orderNameKeywords(person.orderName).length > 0 && (
                                <div className="">
                                    {orderNameKeywords(person.orderName).map(
                                        (orderNameKeyword) => (
                                            <button
                                                key={orderNameKeyword}
                                                className="border mr-2 px-2 py-1 rounded bg-red-500 border-red-600 hover:bg-red-400"
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
            <div className="text-xl mt-2">
                <div className="flex justify-between mt-2">
                    <div>Платил: </div>
                    <div>
                        <input
                            type="text"
                            className="w-full py-1.5 px-2 rounded border-2 border-gray-500"
                            value={person.gave}
                            onChange={handleGaveChange}
                        />
                    </div>
                </div>
                <div className="flex justify-between mt-2">
                    <div>Цена: </div>
                    <div>
                        <input
                            type="text"
                            className="w-full py-1.5 px-2 rounded border-2 border-gray-500"
                            value={person.price}
                            onChange={handlePriceChange}
                        />
                    </div>
                </div>
                <div className="flex justify-between mt-2">
                    <div>За враќање: </div>
                    <div>{person.getReturnAmount()}</div>
                </div>
                <div className="flex justify-between mt-2">
                    <div>Вратено: </div>
                    <div>
                        <input
                            type="checkbox"
                            className="w-10 h-10"
                            checked={person.moneyReturned}
                            onChange={handleCheckboxChange}
                        />
                    </div>
                </div>
                <button
                    className="w-full py-2 px-5 bg-red-500 hover:bg-red-400 border rounded border-red-600"
                    onClick={() => deletePerson(person)}
                >
                    Избриши
                </button>
            </div>
        </>
    );
};

export default PlanCard;
