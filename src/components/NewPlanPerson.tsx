import { FC, useState } from "react";

interface NewPlanPerson {
    addNewPerson: (name: string, orderName: string, gave: string) => void;
    orderNameKeywords: (input: string) => string[];
}

const NewPlanPerson: FC<NewPlanPerson> = ({
    addNewPerson,
    orderNameKeywords,
}) => {
    const [name, setName] = useState<string>("");
    const [orderName, setOrderName] = useState<string>("");
    const [gave, setGave] = useState<string>("");

    const [isOrderNameFocused, setIsOrderNameFocused] =
        useState<boolean>(false);

    const reset = (): void => {
        setName("");
        setOrderName("");
        setGave("");
    };

    const handleAddPerson = (): void => {
        if (name.length > 0 && orderName.length > 0) {
            addNewPerson(name, orderName, gave);
            reset();
        }
    };

    const handleKeywordClick = (keyword: string): void => {
        setOrderName(keyword);
    };

    return (
        <div className="text-xl">
            <div className="mb-2">
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
            <div className="mb-2">
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
                            }, 500);
                        }}
                    />
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
            <div className="mb-2">
                <div className="flex justify-between">
                    <div className="mr-3">Платил:</div>
                    <input
                        className="py-1.5 px-2 rounded border-2 border-gray-500"
                        type="text"
                        value={gave}
                        onChange={(e) => {
                            setGave(e.target.value);
                        }}
                    />
                </div>
            </div>
            <button
                className="w-full py-2 px-5 border-2 rounded bg-blue-500 border-blue-600 hover:bg-blue-400"
                onClick={handleAddPerson}
            >
                Додади
            </button>
        </div>
    );
};

export default NewPlanPerson;
