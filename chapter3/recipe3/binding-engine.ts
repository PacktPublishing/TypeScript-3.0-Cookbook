class BindingBase {
  public bind(reflect: any) {
    this.createElement('collection', 'option', reflect);
  }

  private createElement(selector: string, htmlElement: string, reflect: any): void {
    document.querySelectorAll(`[${selector}]`).forEach(bind => {
      const listElement = bind as HTMLSelectElement;
      if (!listElement) return;
      const elementName: string | null = listElement.getAttribute(selector);
      if (elementName !== null && reflect.hasOwnProperty(elementName)) {
        const element = Reflect.get(reflect, elementName);
        if (element) {
          element.attach(() => {
            while (listElement.firstChild) {
              listElement.removeChild(listElement.firstChild);
            }
            const children = element.collection();
            if (children) {
              children.forEach((child: { firstName: string; lastName: string; }) => {
                const option: HTMLOptionElement = document.createElement(htmlElement) as HTMLOptionElement;
                option.text = child.firstName + ' ' + child.lastName;
                listElement.add(option);
              })
            }
          });
        }
      }
    })
  }
}

class BoundCollection<T> {
  constructor(private subscribers: any[] = [], private items: T[] = []) { }

  public push(item: T): void {
    this.items.push(item);
    this.notify();
  }

  public remove(item: T): void {
    const index = this.items.findIndex(i => item === i);
    this.items.splice(index, 1);
    this.notify();
  }

  public attach(subscriber: any): void {
    this.subscribers.push(subscriber);
    subscriber();
  }

  public collection(): T[] {
    return this.items;
  }

  private notify(): void {
    this.subscribers.forEach(subscriber => {
      subscriber();
    })
  }
}

class Person {
  public firstName: string = '';
  public lastName: string = '';
}

class People {
  constructor(public people: BoundCollection<Person> = new BoundCollection<Person>(), private bind: BindingBase = new BindingBase()) {
    this.addPerson('Rupam', 'Gaur');
    this.addPerson('Laszlo', 'Poca');
    this.bind.bind(this);
  }

  private addPerson(firstName: string, lastName: string): void {
    const person: Person = new Person();
    person.firstName = firstName;
    person.lastName = lastName;
    this.people.push(person)
  }
}