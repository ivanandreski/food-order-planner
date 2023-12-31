import { FC } from "react";
import { Plan } from "../models/Plan";
import { Person } from "../models/Person";

interface SummaryProps {
    plan: Plan;
}

interface SummaryValueInterface {
    price: number;
    quantity: number;
}

interface SummaryValuesInterface {
    [orderName: string]: SummaryValueInterface;
}

const Summary: FC<SummaryProps> = ({ plan }) => {
    const summaryValues: SummaryValuesInterface = plan.persons.reduce(
        (result: SummaryValuesInterface, person: Person) => {
            const orderName = person.orderName;

            // Increment the count for the current orderName
            result[orderName] = {
                price: person.price,
                quantity: (result[orderName]?.quantity || 0) + 1,
            };

            return result;
        },
        {}
    );

    const total = plan.persons
        .map((p) => p.price)
        .reduce((partial, a) => partial + a, 0);

    return (
        <div className="text-xl">
            <div className="my-3 border-b-2 border-gray-500">Нарачка: </div>
            {Object.keys(summaryValues).map((orderName) => (
                <div key={orderName} className="flex justify-between">
                    <div>{orderName}</div>
                    <div>
                        {summaryValues[orderName].price} X{" "}
                        {summaryValues[orderName].quantity} ={" "}
                        {summaryValues[orderName].price *
                            summaryValues[orderName].quantity}
                    </div>
                </div>
            ))}
            {total > 0 && (
                <div className="flex justify-between border-black border-t-2 py-1.5">
                    <div>Total</div>
                    <div>{total}</div>
                </div>
            )}
        </div>
    );
};

export default Summary;
