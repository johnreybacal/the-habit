import { InferType, object, string } from "yup";

export const habitSchema = object({
  id: string(),
  name: string().required(),
  description: string().required(),
});

export type Habit = InferType<typeof habitSchema>;
