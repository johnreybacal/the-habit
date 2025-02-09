import Link from "next/link.js";
import ThemePicker from "./ThemePicker";

export default function Header() {
  return (
    <div className="max-w-screen-md mx-auto flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">
        <Link href="/" className="link link-hover">
          the-habit
        </Link>
      </h1>
      <q className="my-4">
        We are what we repeatedly do. Excellence, then, is not an act, but a
        habit
      </q>
      <div className="flex flex-row gap-2">
        <a href="./planner" className="link link-hover">
          <code>[planner]</code>
        </a>
        <a href="" className="link link-hover">
          <code>[history]</code>
        </a>
        <ThemePicker />
      </div>
    </div>
  );
}
