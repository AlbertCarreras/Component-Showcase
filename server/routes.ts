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

  app.post(api.components.create.path, async (req, res) => {
    try {
      const input = api.components.create.input.parse(req.body);
      const comp = await storage.createComponent(input);
      res.status(201).json(comp);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
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