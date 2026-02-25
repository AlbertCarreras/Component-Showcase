import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.components.list.path, async (req, res) => {
    const comps = await storage.getComponents();
    res.json(comps);
  });

  // seed mock data
  const existing = await storage.getComponents();
  if (existing.length === 0) {
    await storage.createComponent({
      name: "Button",
      description: "A simple button component for triggering actions.",
      code: '<Button variant="default">Click me</Button>'
    });
    await storage.createComponent({
      name: "Card",
      description: "A card to hold content like articles or settings.",
      code: '<Card><CardHeader>Title</CardHeader><CardContent>Content</CardContent></Card>'
    });
  }

  return httpServer;
}