import { FormEvent, useEffect, useRef, useState } from "react";
import { Habit, habitSchema } from "../types";
import { ValidationError } from "yup";
import classNames from "classnames";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { init, close, set, save } from "@/lib/habitSlice";

const emptyHabit: Habit = {
  id: "",
  name: "",
  description: "",
};

export default function FormModal() {
  const habit = useAppSelector((state) => state.habit.instance);
  const isOpen = useAppSelector((state) => state.habit.isFormOpen);
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Habit>({ ...emptyHabit });
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      setErrors(emptyHabit);
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    let validationErrors = {
      ...emptyHabit,
    };
    setErrors(validationErrors);
    try {
      habitSchema.validateSync(habit, { abortEarly: false });
      dispatch(save(habit));
    } catch (e) {
      if (e instanceof ValidationError) {
        e.errors.forEach((message) => {
          const field = message.split(" ")[0];
          console.log(field, message);
          validationErrors = {
            ...validationErrors,
            [field]: message,
          };
        });
        setErrors(validationErrors);
      }
    }
  }

  return (
    <>
      <button className="link link-hover" onClick={() => dispatch(init())}>
        <code>[create a new habit]</code>
      </button>
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <form className="modal-box" onSubmit={onSubmit}>
          <div className="flex flex-col">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Name</span>
                <span className="label-text-alt text-error">{errors.name}</span>
              </div>
              <input
                type="text"
                placeholder="Name of your habit"
                className={classNames("input input-bordered w-full", {
                  "input-error": errors.name,
                })}
                value={habit.name}
                onChange={(e) =>
                  dispatch(set({ ...habit, name: e.currentTarget.value }))
                }
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Description</span>
                <span className="label-text-alt text-error">
                  {errors.description}
                </span>
              </div>
              <textarea
                className={classNames(
                  "textarea textarea-bordered w-full h-24 max-h-52",
                  {
                    "textarea-error": errors.description,
                  }
                )}
                placeholder="What is this habit about?"
                value={habit.description}
                onChange={(e) =>
                  dispatch(
                    set({ ...habit, description: e.currentTarget.value })
                  )
                }
              ></textarea>
            </label>
          </div>
          <div className="modal-action">
            <button
              className="btn btn-outline"
              type="button"
              onClick={() => dispatch(close())}
            >
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              {habit.id === "" ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
