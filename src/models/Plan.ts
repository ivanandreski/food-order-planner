import { Person } from "./Person";

export class Plan {
    persons: Person[];

    constructor(persons: Person[] = []) {
        this.persons = persons;
    }
}