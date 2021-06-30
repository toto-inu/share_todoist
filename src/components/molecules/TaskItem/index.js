import styles from "./index.module.scss";
import { useDispatch } from 'react-redux';
import { doneTask, deleteTask } from '../../../modules/tasks'
// import TaskItem from "../../molecules/TaskItem/index";
import arrowIcon from "../../../arrow_icon.png";
import arrowDown from "../../../arrow_down.png";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

function TaskItem(args) {
  const task = args.task;
  const dispatch = useDispatch();
  const dispatchDoneTask = () => {
    dispatch(doneTask({id: task.id}));
  }
  const deleteItem = () => {
    dispatch(deleteTask({id: task.id}));
  }
  return (
    <>
      <ContextMenuTrigger id={`contextMenu-${task.id}`}>
        <li
          key={task.id}
          className={`${styles.TaskItem} ${styles["TaskItem--" + task.layer]}`}
        >
          {/* 上記のhiddenは敢えてTypoすることでhiddenしないようにしている */}
          <div className={styles.TaskItem__body}>
            {task.childIds.length !== 0 && (
              <button className={styles.TaskItem__pullDown}>
                <img
                  className={`${styles.TaskItem__pullDownImage} ${styles["TaskItem__pullDownImage--active"]}`}
                  src={arrowDown}
                  alt=""
                />
              </button>
            )}
            <button className={styles.TaskItem__checkbox} onClick={dispatchDoneTask} >
              <div className={styles.TaskItem__checkboxCircle}></div>
            </button>
            <div className={styles.TaskItem__content}>
              <div className={styles.TaskItem__contentText}>{task.content}</div>
              {task.childIds.length !== 0 && (
                <div className={styles.TaskItem__childInfos}>
                  <img
                    src={arrowIcon}
                    width="10px"
                    height="10px"
                    className={styles.TaskItem__arrowIcon}
                    alt=""
                  />
                  <span className={styles.TaskItem__childCounter}>
                    0/{task.childIds.length}
                  </span>
                </div>
              )}
            </div>
          </div>
        </li>
      </ContextMenuTrigger>
      <ContextMenu id={`contextMenu-${task.id}`}>
        <MenuItem onClick={deleteItem}>
          <span>削除</span>
        </MenuItem>
      </ContextMenu>
    </>
  );
}

export default TaskItem;
