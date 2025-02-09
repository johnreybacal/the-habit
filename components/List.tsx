import { Habit } from "../types";

interface ListProps {
  habits: Habit[];
}

export const List: React.FC<ListProps> = (props) => {
  console.log("list", props);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6 w-full">
      {props.habits.map((habit) => (
        <div
          key={habit.id}
          className="card bg-base-100 w-full sm:w-96 shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title">{habit.name}</h2>
            <p>{habit.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
