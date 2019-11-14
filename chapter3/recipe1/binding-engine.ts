type Constructor<T = {}> = new (...args: any[]) => T;
function Bound<TBase extends Constructor>(base: TBase) {
  return class extends base {
    constructor(...args: any[]) {
      super(...args);
    }
    public bindInput<T, K extends keyof T>(obj: T, key: K, row: HTMLTableRowElement, position: number): void {
      const cell = row.insertCell(position);
      const textBox: HTMLInputElement = <HTMLInputElement>(document.createElement('input'));
      const value = (<unknown>obj[key]) as string;
      textBox.value = value;
      textBox.addEventListener('change', () => {
        const content = textBox.value;
        (<unknown>obj[key]) = content;
        console.log(`This value is ${obj[key]}`);
      })
      cell.appendChild(textBox);
    }
  }
}

class PersonModel {
  public title: string = ``;
  public firstName: string = ``;
  public lastName: string = ``;
}

const BoundPerson = Bound(PersonModel);
class TableBind {
  
  constructor(private people: PersonModel[] = []) { }

  public populateTable(tableId: string) {
    const table: HTMLTableElement = document.getElementById(tableId) as HTMLTableElement;
    if (!table) return;

    this.push(table, 'Mrs', 'Daphne', 'Shakespeare');
    this.push(table, 'Mr', 'William', 'Fortescue-Fortescue III');
    this.push(table, 'Mr', 'Pramod', 'Puthir');
    this.push(table, 'Miss', 'Joanna', 'Chester-le-Street');
  }

  private push(table: HTMLTableElement, title: string, firstName: string, lastName: string) {
    const row: HTMLTableRowElement = table.insertRow(0);
    // How can we apply the bound model in here????
    const boundPerson = new BoundPerson();
    boundPerson.title = title;
    boundPerson.firstName = firstName;
    boundPerson.lastName = lastName;
    boundPerson.bindInput(boundPerson, 'title', row, 0);
    boundPerson.bindInput(boundPerson, 'firstName', row, 1);
    boundPerson.bindInput(boundPerson, 'lastName', row, 2);
    this.people.push(boundPerson);
  }
}