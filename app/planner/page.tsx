"use client";

import FormModal from "@/components/FormModal";
import Header from "@/components/Header";
import List from "@/components/List";
import { Habit } from "@/types";
import { useState } from "react";

const emptyHabit: Habit = {
  id: "",
  name: "",
  description: "",
};

export default function Planner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [currentHabit, setCurrentHabit] = useState<Habit>({ ...emptyHabit });

  function onSubmit(habit: Habit) {
    if (habit.id === "") {
      // habit.id = crypto.randomUUID();
      // Temporary ID while no backend yet
      habit.id = new Date().toISOString();

      setHabits([...habits, habit]);
    } else {
      const index = habits.findIndex(({ id }) => id === habit.id);

      if (index !== -1) {
        habits[index] = habit;
        setHabits(habits);
      }
    }
  }

  function onEdit(habit: Habit) {
    setCurrentHabit(habit);
    setIsModalOpen(true);
  }

  return (
    <div className="px-4 py-8 mx-auto flex flex-col items-center justify-center">
      <Header />
      <List habits={habits} onClick={onEdit} />
      <FormModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        habit={currentHabit}
        onSubmit={onSubmit}
      />
    </div>
  );
}
