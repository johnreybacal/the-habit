export default function ThemePicker() {
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="link link-hover">
        <code>[change theme]</code>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
      >
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Light"
            value="light"
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Dark"
            value="dark"
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Retro"
            value="retro"
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Cyberpunk"
            value="cyberpunk"
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Valentine"
            value="valentine"
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Aqua"
            value="aqua"
          />
        </li>
      </ul>
    </div>
  );
}
