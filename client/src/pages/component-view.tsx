import { useRoute } from "wouter";
import { useComponent } from "@/hooks/use-components";
import { CodeBlock } from "@/components/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/legacy-components/tabs";
import { Button } from "@/legacy-components/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/legacy-components/card";
import { Skeleton } from "@/legacy-components/skeleton";

export default function ComponentView() {
  const [, params] = useRoute("/components/:id");
  const id = params?.id ? parseInt(params.id, 10) : null;
  const component = useComponent(id || 0);

  if (!id) return null;

  if (component === undefined) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-6 lg:px-8 space-y-8">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  if (component === null) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Component not found</h2>
        <p className="text-muted-foreground mt-2">The component you're looking for doesn't exist.</p>
      </div>
    );
  }

  // A helper to render real Shadcn components for the pre-seeded examples to show off the UI
  const renderPreview = () => {
    if (component.name.toLowerCase() === "button") {
      return (
        <div className="flex flex-wrap items-center gap-4 p-12 border border-dashed rounded-xl bg-muted/20 justify-center">
          <Button variant="default">Primary Action</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      );
    }
    
    if (component.name.toLowerCase() === "card") {
      return (
        <div className="flex items-center justify-center p-12 border border-dashed rounded-xl bg-muted/20">
          <Card className="w-[350px] shadow-sm">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>View and manage project settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Card content provides context and actions related to the title.
              </p>
              <Button className="mt-4 w-full">Manage</Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-dashed rounded-xl bg-muted/10 text-muted-foreground">
        <p>Live preview is only available for built-in primitives.</p>
        <p className="text-sm mt-1">Check the Code tab to see the implementation.</p>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 lg:px-8 animate-in fade-in duration-300">
      <div className="space-y-2 mb-10 pb-6 border-b border-border/40">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          {component.name}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {component.description}
        </p>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full max-w-[200px] grid-cols-2 mb-8 bg-muted/50 p-1 rounded-lg">
          <TabsTrigger value="preview" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm">Preview</TabsTrigger>
          <TabsTrigger value="code" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="mt-0 outline-none">
          {renderPreview()}
        </TabsContent>
        <TabsContent value="code" className="mt-0 outline-none">
          <CodeBlock code={component.code} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
