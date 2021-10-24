import Link from 'next/link';
import styles from '../styles/Suggestion.module.scss';

export default function Suggestion({ suggestion }): JSX.Element {
  if (suggestion.type === 'country') {
    return (
      <div>
        <label className={styles.suggestionLabel}>Country</label>
        <div className={styles.countryContent}>
          <img
            src={`flags/${suggestion.flagSvg}`}
            alt={suggestion.name}
            title={suggestion.fullName}
          />
          <p className={styles.suggestionName}>{suggestion.name}</p>
        </div>
      </div>
    );
  } else if (suggestion.type === 'language') {
    return (
      <Link href={suggestion.hyperlink}>
        <a className={styles.languagelink}>
          <div>
            <label className={styles.suggestionLabel}>Language</label>
            <div className={styles.countryContent}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className={styles.languageIcon}
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z' />
                <path d='M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z' />
              </svg>
              <div>
                <p className={styles.suggestionName}>{suggestion.name}</p>
                {suggestion.script.length > 0 && (
                  <p className={styles.suggestionScript}>{suggestion.script}</p>
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
