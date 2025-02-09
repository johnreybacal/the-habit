import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Habit } from "../types";

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
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (props.isOpen) {
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
    modalRef.current?.showModal();
    props.setIsOpen(true);
  }

  function closeModal() {
    props.setIsOpen(false);
  }

  function onSubmit() {
    props.onSubmit(habit);
    closeModal();
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
              </div>
              <input
                type="text"
                placeholder="Name of your habit"
                className="input input-bordered w-full"
                value={habit.name}
                onChange={(e) =>
                  setHabit({ ...habit, name: e.currentTarget.value })
                }
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <textarea
                className="textarea textarea-bordered w-full h-24"
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
