import { type Component } from "@shared/schema";

export interface IStorage {
  getComponents(): Promise<Component[]>;
  createComponent(component: Omit<Component, "id">): Promise<Component>;
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

  async createComponent(component: Omit<Component, "id">): Promise<Component> {
    const id = this.currentId++;
    const newComponent: Component = { ...component, id };
    this.components.set(id, newComponent);
    return newComponent;
  }
}

export const storage = new MemStorage();