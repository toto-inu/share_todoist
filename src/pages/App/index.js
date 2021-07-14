import TaskView from "~/components/organism/TaskView/index";
import Header from "~/components/organism/Header/index";
import styles from "./index.module.scss";

export const App = () => {
  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.App__task}>
        <TaskView />
      </div>
    </div>
  );
}
