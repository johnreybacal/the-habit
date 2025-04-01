# the-habit

```typescript
interface Habit {
  id: string; // uuid
  name: string;
  description: string;
  days: string[]; // Mon, Tue, Wed, ...
  time: Date; // time only
  recurring: boolean;
  interval: number; // in minutes, if recurring
}

interface Activity {
  id: string;
  habitId: string;
  status: string; // Completed, Skipped
  createdAt: Date;
}
```
