import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useComponents() {
  return useQuery({
    queryKey: [api.components.list.path],
    queryFn: async () => {
      const res = await fetch(api.components.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch components");
      const data = await res.json();
      return parseWithLogging(api.components.list.responses[200], data, "components.list");
    },
  });
}

export function useComponent(id: number) {
  const { data: components } = useComponents();
  return components?.find((c) => c.id === id);
}