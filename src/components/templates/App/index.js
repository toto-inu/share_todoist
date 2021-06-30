import "./index.module.scss";
import TaskView from "../../organism/TaskView/index";
import Header from "../../organism/Header/index";
import "../../../styles/reset.scss";
import "../../../styles/foundation.scss";
import styles from "./index.module.scss";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.App__task}>
        {/* [TODO] TaskViewにclass名を割り当てたい */}
        <TaskView />
      </div>
    </div>
  );
}

export default App;
