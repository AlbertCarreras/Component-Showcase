import { Code2, Layers, Palette, Zap } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/legacy-components/button";
import { Card, CardContent } from "@/legacy-components/card";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6 text-center md:text-left mb-16">
        <div className="inline-flex items-center rounded-full border border-border/40 bg-muted/50 px-3 py-1 text-sm font-medium">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
          Design System v1.0
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground">
          Build beautiful interfaces,<br className="hidden md:block" /> with confidence.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          A minimalist, documentation-first approach to building and organizing your React component library. Designed for clarity and speed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4 md:justify-start justify-center">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/builder">Create Component</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 bg-transparent">
            <Link href="/components/1">View Library</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <FeatureCard 
          icon={<Layers className="h-5 w-5" />}
          title="Component Driven"
          description="Browse and organize your UI elements in a clean, centralized repository accessible to the whole team."
        />
        <FeatureCard 
          icon={<Code2 className="h-5 w-5" />}
          title="Live Documentation"
          description="Every component includes description and syntax-highlighted code snippets ready to copy."
        />
        <FeatureCard 
          icon={<Palette className="h-5 w-5" />}
          title="Design Tokens"
          description="Built on top of a robust token system ensuring visual consistency across your entire application."
        />
        <FeatureCard 
          icon={<Zap className="h-5 w-5" />}
          title="Fast Workflow"
          description="Use the integrated builder to rapidly document new components as you develop them."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6 space-y-4">
        <div className="h-10 w-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-medium text-lg tracking-tight">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
