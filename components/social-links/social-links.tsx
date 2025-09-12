import styles from './social-links.module.scss';

export function SocialLinks() {
  return (
    <div className={styles.socialLinks}>
      <a href="https://www.instagram.com/gonserovskaya/" target="_blank" rel="noopener noreferrer">
        Instagram
      </a>
      <a href="https://www.facebook.com/gonserovskaya/" target="_blank" rel="noopener noreferrer">
        Facebook
      </a>
      <a href="https://www.linkedin.com/company/gonserovskaya/" target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
    </div>
  );
}
