import { useEffect, useState } from "react";
import { Plan } from "./models/Plan";
import { Person } from "./models/Person";
import PlanCard from "./components/PlanCard";
import NewPlanPerson from "./components/NewPlanPerson";
import Card from "./components/Card";

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

    const addNewPerson = (person: Person): void => {
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
                        orderName.toLowerCase().includes(input.toLowerCase()) &&
                        orderName != input
                )
        ),
    ];

    return (
        <div className="px-10 py-5">
            {plan.persons.length > 0 && (
                <Card>
                    <div className="flex text-xl">
                        <div className="w-2/12">Име</div>
                        <div className="w-2/12">Нарачка</div>
                        <div className="w-2/12">Платил</div>
                        <div className="w-2/12">Цена</div>
                        <div className="w-2/12">За враќање</div>
                        <div className="w-2/12">Исплатено</div>
                    </div>
                </Card>
            )}
            {plan.persons.map((person) => (
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
        </div>
    );
};

export default App;