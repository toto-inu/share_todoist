import styles from "./index.module.scss";

export const LoginButton = ({...args}) => {
  return (
    <button className={styles.Login} {...args}>
      <div className={styles.Login__wrapper}>
        <span className={styles.Login__text}>
          ログイン
        </span>
      </div>
    </button>
  )
}