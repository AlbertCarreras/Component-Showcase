import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertComponent } from "@shared/routes";
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

export function useCreateComponent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: InsertComponent) => {
      const validated = api.components.create.input.parse(data);
      const res = await fetch(api.components.create.path, {
        method: api.components.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const errorData = await res.json();
          const parsedError = api.components.create.responses[400].parse(errorData);
          throw new Error(parsedError.message);
        }
        throw new Error("Failed to create component");
      }
      
      const responseData = await res.json();
      return parseWithLogging(api.components.create.responses[201], responseData, "components.create");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.components.list.path] });
    },
  });
}
