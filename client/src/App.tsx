import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/legacy-components/toaster";
import { TooltipProvider } from "@/legacy-components/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/legacy-components/sidebar";

import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ComponentView from "@/pages/component-view";
import { AppSidebar } from "@/components/app-sidebar";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/components/:id" component={ComponentView}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const sidebarStyle = {
    "--sidebar-width": "18rem",
    "--sidebar-width-icon": "4rem",
  } as React.CSSProperties;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={sidebarStyle}>
          <div className="flex h-screen w-full bg-background overflow-hidden selection:bg-primary selection:text-primary-foreground">
            <AppSidebar />
            <div className="flex flex-col flex-1 relative min-w-0">
              <header className="flex h-14 items-center gap-4 border-b border-border/40 bg-background/95 backdrop-blur px-4 lg:px-6 sticky top-0 z-10">
                <SidebarTrigger className="hover-elevate -ml-2" />
                <div className="w-full flex-1">
                  {/* Optional: Add search or breadcrumbs here in the future */}
                </div>
              </header>
              <main className="flex-1 overflow-y-auto overflow-x-hidden focus:outline-none bg-[#FAFAFA] dark:bg-background">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
