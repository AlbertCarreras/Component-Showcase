## Packages
react-syntax-highlighter | For beautiful code block rendering in documentation
@types/react-syntax-highlighter | TypeScript definitions for react-syntax-highlighter

## Notes
- Sidebar layout is implemented using standard flexbox + Shadcn sidebar guidelines.
- Dynamic component preview requires compiling React at runtime, which is complex for a simple setup, so we provide static visual representations for pre-seeded components and code-only views for custom ones, maintaining a clean documentation aesthetic.
