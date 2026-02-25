import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const CORE_DOCS = [
  {
    slug: "button",
    name: "Button",
    description: "Buttons allow users to take actions, and make choices, with a single tap.",
    preview: (
      <div className="flex flex-wrap gap-4 items-center justify-center p-12">
        <Button variant="default">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    ),
    code: `import { Button } from "@/components/ui/button";

export default function Example() {
  return (
    <div className="flex gap-4">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  )
}`,
  },
  {
    slug: "input",
    name: "Input",
    description: "Inputs allow users to enter text into a UI.",
    preview: (
      <div className="w-full max-w-sm space-y-4 p-8">
        <div className="space-y-2">
          <label className="text-sm font-semibold">Email address</label>
          <Input placeholder="name@example.com" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-muted-foreground">Disabled Input</label>
          <Input disabled placeholder="Not allowed" />
        </div>
      </div>
    ),
    code: `import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Example() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="name@example.com" />
    </div>
  )
}`,
  }
];
