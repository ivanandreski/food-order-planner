import { useEffect, useState } from "react";
import { Plan } from "./models/Plan";
import { Person } from "./models/Person";
import PlanCard from "./components/PlanCard";
import NewPlanPerson from "./components/NewPlanPerson";
import Card from "./components/Card";
import Summary from "./components/Summary";

const App = () => {
    const [plan, setPlan] = useState<Plan>(new Plan());

    const init = (): void => {
        const persons: Person[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith("person_")) {
                persons.push(Person.fromJson(localStorage.getItem(key)!));
            }
        }

        setPlan(new Plan(persons));
    };

    useEffect(() => {
        init();
    }, []);

    const addNewPerson = (name: string, orderName: string, gave: string): void => {
        const gaveNum = parseInt(gave) || 0;
        const existingPrice = plan.persons.find(p => p.orderName == orderName)?.price || 0;
        const person = new Person(null, name, orderName, gaveNum, existingPrice, null);

        let i = 0;
        for (;;) {
            const jsonString = localStorage.getItem(`person_${i}`);
            if (jsonString == null) {
                localStorage.setItem(`person_${i}`, person.toJson());
                break;
            }

            i++;
        }
        init();
    };

    const editPerson = (person: Person): void => {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith("person_")) {
                const tempPerson = Person.fromJson(localStorage.getItem(key)!);
                if (person.id == tempPerson.id) {
                    localStorage.setItem(key, person.toJson());
                    break;
                }
            }
        }
        init();
    };

    const deletePerson = (person: Person): void => {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith("person_")) {
                const tempPerson = Person.fromJson(localStorage.getItem(key)!);
                if (person.id == tempPerson.id) {
                    localStorage.removeItem(key);
                    break;
                }
            }
        }
        init();
    };

    const editPriceForKeyword = (price: number, keyword: string): void => {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith("person_")) {
                const tempPerson = Person.fromJson(localStorage.getItem(key)!);
                if (tempPerson.orderName == keyword) {
                    tempPerson.price = price;
                    localStorage.setItem(key, tempPerson.toJson());
                }
            }
        }
        init();
    };

    const orderNameKeywords = (input: string) => [
        ...new Set(
            plan.persons
                .map((person) => person.orderName)
                .filter(
                    (orderName) =>
                        orderName.toLowerCase().startsWith(input.toLowerCase()) &&
                        orderName != input
                )
        ),
    ];

    return (
        <div className="px-3 py-2">
            {plan.persons
            .sort((person1, person2) => {
                if(person1.id > person2.id)
                    return 1;
                if(person1.id < person2.id)
                    return -1;

                    return 0;
            })
            .map((person) => (
                <Card key={person.id}>
                    <PlanCard
                        person={person}
                        editPriceForKeyword={editPriceForKeyword}
                        editPerson={editPerson}
                        deletePerson={deletePerson}
                        orderNameKeywords={orderNameKeywords}
                    />
                </Card>
            ))}
            <Card>
                <NewPlanPerson
                    addNewPerson={addNewPerson}
                    orderNameKeywords={orderNameKeywords}
                />
            </Card>
            <Card>
                <Summary plan={plan} />
            </Card>
        </div>
    );
};

export default App;
