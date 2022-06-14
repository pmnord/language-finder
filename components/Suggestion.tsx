import Link from "next/link";

const classes = {
  label: "translate-y-4 text-xs text-gray-500",
  suggestionName: "ml-1 text-lg",
  iconAndName: "flex items-center",
};

export default function Suggestion({ suggestion }): JSX.Element {
  if (suggestion.type === "country") {
    return (
      <div>
        <label className={classes.label}>Country</label>
        <div className={classes.iconAndName}>
          <img
            className="shado mr-2 ml-0.5 h-5 shadow-lg shadow-neutral-400"
            src={`flags/${suggestion.flagSvg}`}
            alt={suggestion.name}
            title={suggestion.fullName}
          />
          <p className="ml-1 text-lg">{suggestion.name}</p>
        </div>
      </div>
    );
  } else if (suggestion.type === "language") {
    return (
      <Link href={suggestion.hyperlink}>
        <a className="text-black no-underline">
          <div>
            <label className={classes.label}>Language</label>
            <div className={classes.iconAndName}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-7 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
              <div>
                <p className={classes.suggestionName}>{suggestion.name}</p>
                {suggestion.script.length > 0 && (
                  <p className="ml-1">{suggestion.script}</p>
                )}
              </div>
            </div>
          </div>
        </a>
      </Link>
    );
  } else {
    return null;
  }
}
