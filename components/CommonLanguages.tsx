import styles from '../styles/CommonLanguages.module.scss';
import commonLanguages from '../data/top.json';
import Link from 'next/link';

export default function CommonLanguagesBanner(): JSX.Element {
  return (
    <div className={styles.root}>
      {commonLanguages.map((language) => (
        <span key={language.language}>
          <Link href={language.hyperlink}>
            <a>{language.script}</a>
          </Link>
        </span>
      ))}
    </div>
  );
}
