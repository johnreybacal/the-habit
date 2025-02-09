import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Habit, habitSchema } from "../types";
import { ValidationError } from "yup";
import classNames from "classnames";

interface FormModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  habit: Habit;
  onSubmit: (habit: Habit) => void;
}

const emptyHabit: Habit = {
  id: "",
  name: "",
  description: "",
};

export default function FormModal(props: FormModalProps) {
  const [habit, setHabit] = useState<Habit>({ ...emptyHabit });
  const [errors, setErrors] = useState<Habit>({ ...emptyHabit });
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (props.isOpen) {
      setErrors(emptyHabit);
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [props.isOpen]);

  useEffect(() => {
    setHabit(props.habit);
  }, [props.habit]);

  function onCreate() {
    setHabit(emptyHabit);
    props.setIsOpen(true);
  }

  function closeModal() {
    props.setIsOpen(false);
  }

  function onSubmit() {
    let validationErrors = {
      ...emptyHabit,
    };
    setErrors(validationErrors);
    try {
      habitSchema.validateSync(habit, { abortEarly: false });
      props.onSubmit(habit);
      closeModal();
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
        console.log(validationErrors);
        setErrors(validationErrors);
      }
    }
  }

  return (
    <>
      <button className="link link-hover" onClick={onCreate}>
        <code>[create a new habit]</code>
      </button>
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
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
                  setHabit({ ...habit, name: e.currentTarget.value })
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
                  "textarea textarea-bordered w-full h-24",
                  {
                    "textarea-error": errors.description,
                  }
                )}
                placeholder="What is this habit about?"
                value={habit.description}
                onChange={(e) =>
                  setHabit({ ...habit, description: e.currentTarget.value })
                }
              ></textarea>
            </label>
          </div>
          <div className="modal-action">
            <button
              className="btn btn-outline btn-secondary"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={onSubmit}>
              {habit.id === "" ? "Create" : "Update"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
