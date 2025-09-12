'use client';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';

export const HistoryButton = () => (
  <div className="actions flex items-center gap-4 text-muted-foreground">
    <Button
      size="icon"
      variant="ghost"
      onMouseDown={() => {
        console.log('history');
      }}
    >
      <History className="size-4" />
    </Button>
  </div>
);
