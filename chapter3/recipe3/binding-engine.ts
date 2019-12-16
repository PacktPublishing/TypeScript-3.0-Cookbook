class Binder {
  public static bind(bindingObject: any): void {
    document.querySelectorAll(`[collection]`).forEach(bind => {
      const listElement = bind as HTMLSelectElement;
      if (!listElement) return;
      const elementName: string | null = listElement.getAttribute('collection');
      if (elementName !== null && bindingObject.hasOwnProperty(elementName)) {
        const element = Reflect.get(bindingObject, elementName);
        Binder.attach(element, listElement);
      }
    })
  }

  private static attach(element: any, listElement: HTMLSelectElement): void {
    if (!element) return;
    element.attach(() => {
      while (listElement.firstChild) {
        listElement.removeChild(listElement.firstChild);
      }
      Binder.bindItems(element.collection(), listElement);
    });
  }

  private static bindItems(children: any, listElement: HTMLSelectElement) {
    if (!children) return
    children.forEach((child: any) => {
      const option: HTMLOptionElement = document.createElement('option') as HTMLOptionElement;
      option.text = child;
      listElement.add(option);
    });
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

  public toString(): string {
    return this.firstName + ' ' + this.lastName;
  }
}

class PeopleViewModel {
  constructor(public people: BoundCollection<Person> = new BoundCollection<Person>()) {
    this.addPerson('Rupam', 'Gaur');
    this.addPerson('Laszlo', 'Poca');
  }

  public bind(): void {
    Binder.bind(this);
  }

  private addPerson(firstName: string, lastName: string): void {
    const person: Person = new Person();
    person.firstName = firstName;
    person.lastName = lastName;
    this.people.push(person)
  }
}