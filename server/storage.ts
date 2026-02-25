import { components, type Component, type InsertComponent } from "@shared/schema";

export interface IStorage {
  getComponents(): Promise<Component[]>;
  createComponent(component: InsertComponent): Promise<Component>;
}

export class MemStorage implements IStorage {
  private components: Map<number, Component>;
  private currentId: number;

  constructor() {
    this.components = new Map();
    this.currentId = 1;
  }

  async getComponents(): Promise<Component[]> {
    return Array.from(this.components.values());
  }

  async createComponent(insertComponent: InsertComponent): Promise<Component> {
    const id = this.currentId++;
    const component: Component = { ...insertComponent, id };
    this.components.set(id, component);
    return component;
  }
}

export const storage = new MemStorage();