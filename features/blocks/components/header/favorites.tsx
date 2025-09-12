'use client';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

export const Favorites = () => {
  return (
    <div className="actions flex items-center gap-4 text-muted-foreground">
      <Button
        size="icon"
        variant="ghost"
        onMouseDown={() => {
          console.log('favorites');
        }}
      >
        <Star className="size-4" />
      </Button>
    </div>
  );
};
