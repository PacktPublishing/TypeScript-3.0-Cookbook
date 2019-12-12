class BindingBase {
  public bind(reflect: any): void {
    document.querySelectorAll(`[twoway-bind]`).forEach(bind => {
      const inputElement: HTMLInputElement = bind as HTMLInputElement;
      if (!inputElement) return;
      const elementName: string | null = inputElement.getAttribute("twoway-bind");
      if (elementName !== null && reflect.hasOwnProperty(elementName)) {
        const element = Reflect.get(reflect, elementName);
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
      if (elementName !== null && reflect.hasOwnProperty(elementName)) {
        const element = Reflect.get(reflect, elementName);
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

class Example {
  public firstName: string = 'Shona';
  public lastName: string = 'Hui';
}

class ExampleBoundViewModel {
  constructor(private example: Example = new Example(), private binding: BindingBase = new BindingBase()) {
    this.firstName.bind(this.example, "firstName");
    this.lastName.bind(this.example, "lastName");
  }

  public firstName: BoundObject<Example> = new BoundObject<Example>();
  public lastName: BoundObject<Example> = new BoundObject<Example>();

  public bind(): void {
    this.binding.bind(this);
  }    
}