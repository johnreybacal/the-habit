import { Habit } from "../types";

interface ListProps {
  habits: Habit[];
}

export const List: React.FC<ListProps> = (props) => {
  console.log("list", props);

  return (
    <div className="flex flex-col gap-8 py-6">
      {props.habits.map((habit) => (
        <div key={habit.id} className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{habit.name}</h2>
            <p>{habit.description}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
