import { FC } from "react";
import { Plan } from "../models/Plan";
import { Person } from "../models/Person";

interface SummaryProps {
    plan: Plan;
}

interface OrderNameCountsInterface {
    [orderName: string]: number;
}

const Summary: FC<SummaryProps> = ({ plan }) => {
    const orderNameCounts: OrderNameCountsInterface = plan.persons.reduce(
        (result: OrderNameCountsInterface, person: Person) => {
            const orderName = person.orderName;

            // Increment the count for the current orderName
            result[orderName] = (result[orderName] || 0) + 1;

            return result;
        },
        {}
    );

    return (
        <div className="text-xl">
            <div className="my-3 border-b-2 border-gray-500">Нарачка: </div>
            {Object.keys(orderNameCounts).map((orderName) => (
                <div key={orderName} className="flex justify-between">
                    <div>{orderName}</div>
                    <div>X {orderNameCounts[orderName]}</div>
                </div>
            ))}
        </div>
    );
};

export default Summary;
