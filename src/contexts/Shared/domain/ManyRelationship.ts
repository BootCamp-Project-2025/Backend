export abstract class ManyRelationship<T> {
  public currentItems: T[];
  private new: T[];
  private removed: T[];
  private edited: T[];

  constructor(initialItems?: T[]) {
    this.currentItems = initialItems ? initialItems : [];
    this.new = [];
    this.removed = [];
    this.edited = [];
  }

  abstract compareItems(a: T, b: T): boolean;

  public getItems(): T[] {
    return this.currentItems;
  }

  public getNewItems(): T[] {
    return this.new;
  }

  public getRemovedItems(): T[] {
    return this.removed;
  }

  public getEditedItems() {
    return this.edited;
  }

  public add(item: T): void {
    this.new.push(item);
    this.currentItems.push(item);
  }

  public edit(item: T, index: number): void {
    this.currentItems[index] = item;
    this.edited.push(item);
  }

  public remove(item: T): void {
    this.removeFromCurrent(item);
    this.removed.push(item);
  }

  private isCurrentItem(item: T): boolean {
    return (
      this.currentItems.filter((v: T) => this.compareItems(item, v)).length !==
      0
    );
  }

  private removeFromCurrent(item: T): void {
    this.currentItems = this.currentItems.filter(
      (v) => !this.compareItems(item, v)
    );
  }

  public exists(item: T): boolean {
    return this.isCurrentItem(item);
  }
}
