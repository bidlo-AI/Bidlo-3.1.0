import { Inbox } from 'lucide-react';
import { motion } from 'framer-motion';

export const Empty = () => (
  <motion.div
    key="check-icon"
    className="w-full flex flex-col items-center justify-center p-16 pt-12 text-sm text-muted-foreground-opaque space-y-1"
    initial={{ y: 5, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
  >
    <Inbox className="size-10" />
    <p className="text-base">No organization invites yet!</p>
    <p>New invites will appear here automatically.</p>
  </motion.div>
);
