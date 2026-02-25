import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Box, Layers, PenTool, Type, Zap } from "lucide-react";
import { useComponents } from "@/hooks/use-components";

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const [location] = useLocation();
  const { data: customComponents } = useComponents();

  const navGroups = [
    {
      title: "Overview",
      items: [
        { label: "Introduction", href: "/", icon: <Zap className="w-4 h-4 mr-3" /> },
        { label: "Component Builder", href: "/builder", icon: <PenTool className="w-4 h-4 mr-3" /> },
      ],
    },
    {
      title: "Core Components",
      items: [
        { label: "Button", href: "/docs/button", icon: <Box className="w-4 h-4 mr-3" /> },
        { label: "Input", href: "/docs/input", icon: <Type className="w-4 h-4 mr-3" /> },
      ],
    },
  ];

  return (
    <div className={cn("flex flex-col h-full bg-background border-r border-border/60", className)}>
      <div className="p-6 flex items-center mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mr-3 shadow-md">
          <Layers className="w-4 h-4 text-primary-foreground" />
        </div>
        <h1 className="text-lg font-bold tracking-tight">Gestalt Lite</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-12 space-y-8">
        {navGroups.map((group, i) => (
          <div key={i} className="space-y-2">
            <h4 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {group.title}
            </h4>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "bg-primary/5 text-primary"
                        : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {customComponents && customComponents.length > 0 && (
          <div className="space-y-2">
            <h4 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Custom Components
            </h4>
            <div className="space-y-1">
              {customComponents.map((comp) => {
                const href = `/custom/${comp.id}`;
                const isActive = location === href;
                return (
                  <Link
                    key={comp.id}
                    href={href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "bg-primary/5 text-primary"
                        : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    )}
                  >
                    <Box className="w-4 h-4 mr-3 opacity-60" />
                    {comp.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
