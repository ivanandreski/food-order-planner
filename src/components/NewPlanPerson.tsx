import { FC, useState } from "react";
import { Person } from "../models/Person";

interface NewPlanPerson {
    addNewPerson: (person: Person) => void;
    orderNameKeywords: (input: string) => string[];
}

const NewPlanPerson: FC<NewPlanPerson> = ({
    addNewPerson,
    orderNameKeywords,
}) => {
    const [name, setName] = useState<string>("");
    const [orderName, setOrderName] = useState<string>("");
    const [gave, setGave] = useState<number>(0);

    const [isOrderNameFocused, setIsOrderNameFocused] =
        useState<boolean>(false);

    const reset = (): void => {
        setName("");
        setOrderName("");
        setGave(0);
    };

    const handleAddPerson = (): void => {
        if (name.length > 0 && orderName.length > 0) {
            const person = new Person(null, name, orderName, gave, 0, null);
            addNewPerson(person);
            reset();
        }
    };

    const handleKeywordClick = (keyword: string): void => {
        setOrderName(keyword);
    };

    return (
        <div className="text-xl">
            <div className="flex mb-2">
                <div className="w-1/2 mr-2">
                    <div className="flex justify-between">
                        <div className="mr-3">Име:</div>
                        <input
                            className="py-1.5 px-2 rounded border-2 border-gray-500"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="w-1/2 ml-2">
                    <div className="flex justify-between">
                        <div className="mr-3">Нарачка:</div>
                        <input
                            className="py-1.5 px-2 rounded border-2 border-gray-500"
                            type="text"
                            value={orderName}
                            onChange={(e) => setOrderName(e.target.value)}
                            onFocus={() => setIsOrderNameFocused(true)}
                            onBlur={() => {
                                setTimeout(() => {
                                    setIsOrderNameFocused(false);
                                }, 100);
                            }}
                        />
                    </div>
                </div>
            </div>
            {isOrderNameFocused &&
                orderName.length > 0 &&
                orderNameKeywords(orderName).length > 0 && (
                    <div className="mb-2">
                        {orderNameKeywords(orderName).map(
                            (orderNameKeyword) => (
                                <button
                                    key={orderNameKeyword}
                                    className="border mr-2 px-2 py-1 rounded bg-red-500 border-red-600 hover:bg-red-400"
                                    onClick={() =>
                                        handleKeywordClick(orderNameKeyword)
                                    }
                                >
                                    {orderNameKeyword}
                                </button>
                            )
                        )}
                    </div>
                )}
            <div className="flex">
                <div className="w-1/2 mr-2">
                    <div className="flex justify-between">
                        <div className="mr-3">Платил:</div>
                        <input
                            className="py-1.5 px-2 rounded border-2 border-gray-500"
                            type="number"
                            value={gave}
                            onChange={(e) => {
                                const { value } = e.target;
                                if (value.startsWith("0") && value.length > 1) {
                                    e.target.value = parseInt(value).toString();
                                }
                                setGave(parseInt(value) || 0);
                            }}
                        />
                    </div>
                </div>
                <button
                    className="w-1/2 ml-2 border-2 rounded bg-red-500 border-red-600 hover:bg-red-400"
                    onClick={handleAddPerson}
                >
                    Додади
                </button>
            </div>
        </div>
    );
};

export default NewPlanPerson;