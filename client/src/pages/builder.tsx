import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { Code2, Wand2 } from "lucide-react";
import { insertComponentSchema } from "@shared/schema";
import { useCreateComponent } from "@/hooks/use-components";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type FormValues = z.infer<typeof insertComponentSchema>;

export default function Builder() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const createMutation = useCreateComponent();

  const form = useForm<FormValues>({
    resolver: zodResolver(insertComponentSchema),
    defaultValues: {
      name: "",
      description: "",
      code: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const newComponent = await createMutation.mutateAsync(data);
      toast({
        title: "Component created",
        description: `${newComponent.name} has been added to the library.`,
      });
      setLocation(`/components/${newComponent.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create component",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight flex items-center gap-3">
          <Wand2 className="h-8 w-8 text-primary" />
          Component Builder
        </h1>
        <p className="text-muted-foreground text-lg">
          Document a new component for your library.
        </p>
      </div>

      <Card className="border-border/40 shadow-sm">
        <CardHeader className="bg-muted/20 border-b border-border/40">
          <CardTitle>Details</CardTitle>
          <CardDescription>Enter the specifications for your new component.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Component Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Accordion" className="bg-background" {...field} />
                    </FormControl>
                    <FormDescription>
                      The display name in the sidebar.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Explain what this component does and when to use it..." 
                        className="resize-none min-h-[100px] bg-background"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Code2 className="h-4 w-4" /> Code Snippet
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={`import { Button } from "@/components/ui/button";\n\nexport function MyComponent() {\n  return <Button>Click</Button>;\n}`} 
                        className="font-mono text-sm resize-y min-h-[250px] bg-[#1E1E1E] text-slate-300 border-none focus-visible:ring-1 focus-visible:ring-primary/20"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Paste the React/TypeScript implementation here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4 flex justify-end">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="px-8 rounded-full"
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending ? "Creating..." : "Save Component"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
