import { view } from "@/lib/slices/habitSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function List() {
  const habitList = useAppSelector((state) => state.habit.list);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6 w-full">
      {habitList.map((habit) => (
        <div
          key={habit.id!}
          className="card bg-base-100 w-full sm:w-96 shadow-xl"
          onClick={() => dispatch(view(habit.id!))}
        >
          <div className="card-body">
            <h2 className="card-title line-clamp-1">{habit.name}</h2>
            <p className="line-clamp-2">{habit.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
