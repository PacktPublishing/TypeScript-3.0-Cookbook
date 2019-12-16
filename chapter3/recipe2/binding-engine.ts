class Binder {
  public static bind(bindingObject: any): void {
    document.querySelectorAll(`[twoway-bind]`).forEach(bind => {
      const inputElement: HTMLInputElement = bind as HTMLInputElement;
      if (!inputElement) return;
      const elementName: string | null = inputElement.getAttribute("twoway-bind");
      if (elementName !== null && bindingObject.hasOwnProperty(elementName)) {
        const element = Reflect.get(bindingObject, elementName);
        if (element) {
          element.attach(() => inputElement.value = element.getValue());
          inputElement.addEventListener('change', ()=> {
            element.setValue(inputElement.value);
          });
        }
      }
    });
    document.querySelectorAll(`[oneway-bind]`).forEach(bind => {
      const htmlElement: HTMLElement = bind as HTMLElement;
      if (!htmlElement) return;
      const elementName: string | null = htmlElement.getAttribute(`oneway-bind`);
      if (elementName !== null && bindingObject.hasOwnProperty(elementName)) {
        const element = Reflect.get(bindingObject, elementName);
        if (element) {
          element.attach(() => htmlElement.textContent = element.getValue());
        }
      }
    })
  }
}

class BoundObject<T> {
  constructor(private subscribers:any[] = [], private value: any = null) { }
  public bind<K extends keyof T>(obj: T, property: K): void {
    this.setValue(obj[property]);
  }

  public attach(subscriber: any): void {
    this.subscribers.push(subscriber);
    subscriber();
  }

  public setValue(value: any): void {
    if (this.value === value) return;
    this.value = value;
    this.notify();
  }

  public getValue(): any {
    return this.value;
  }
  private notify(): void {
    this.subscribers.forEach(subscriber => {
      subscriber();
    })
  }
}

class Person {
  public firstName: string = 'Shona';
  public lastName: string = 'Hui';
}

class ExampleBoundViewModel {
  constructor(private person: Person = new Person()) {
    this.firstName.bind(this.person, "firstName");
    this.lastName.bind(this.person, "lastName");
  }

  public firstName: BoundObject<Person> = new BoundObject<Person>();
  public lastName: BoundObject<Person> = new BoundObject<Person>();

  public bind(): void {
    Binder.bind(this);
  }    
}