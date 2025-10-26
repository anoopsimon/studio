import { DraftingCompass } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex items-center gap-3">
          <DraftingCompass className="h-7 w-7 text-primary" />
          <h1 className="font-headline text-3xl font-bold text-foreground">
            CardCraft
          </h1>
        </div>
      </div>
    </header>
  );
}
