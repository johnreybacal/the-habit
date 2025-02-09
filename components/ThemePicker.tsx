"use client";

import { themes } from "@/tailwind.config";
import classNames from "classnames";
import { useEffect, useState } from "react";

export default function ThemePicker() {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const theme = localStorage.getItem("theme") ?? "light";
    setTheme(theme);
  }, []);

  useEffect(() => {
    document.querySelector("html")!.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="link link-hover">
        <code>[change theme]</code>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
      >
        {themes.map((t) => (
          <li
            key={t}
            className={classNames(
              "btn btn-sm btn-block btn-ghost justify-start",
              {
                "btn-outline btn-active": t === theme,
              }
            )}
            onClick={() => setTheme(t)}
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
