import { generateRandomId } from "../utils/Utils";

export class Person {
    id: number;
    name: string;
    orderName: string;
    gave: number;
    price: number;
    moneyReturned: boolean;

    constructor(
        id: number | null,
        name: string,
        orderName: string,
        gave: number,
        price: number,
        moneyReturned: boolean | null
    ) {
        this.id = id || generateRandomId();
        this.name = name;
        this.orderName = orderName;
        this.gave = gave;
        this.price = price;
        this.moneyReturned = moneyReturned || gave - price == 0;
    }

    getReturnAmount(): string {
        if (this.price == 0) {
            return "/";
        }

        return (this.gave - this.price).toString() + " ДЕН";
    }

    toJson(): string {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            orderName: this.orderName,
            gave: this.gave,
            returned: this.price,
            moneyReturned: this.moneyReturned,
        });
    }

    static fromJson(jsonString: string): Person {
        const value = JSON.parse(jsonString);

        return new Person(
            value.id,
            value.name,
            value.orderName,
            value.gave,
            value.returned,
            value.moneyReturned
        );
    }
}
