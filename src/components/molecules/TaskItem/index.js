import styles from "./index.module.scss";
// import TaskItem from "../../molecules/TaskItem/index";
import arrowIcon from "~/arrow_icon.png";
import arrowDown from "~/arrow_down.png";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import { gql, useMutation } from "@apollo/client";

function TaskItem(args) {
  const { task, refetch } = args;

  // Graphql Mutations
  const doneMutation = gql`
    mutation done($id: Int!) {
      update_todoist(where: {id: {_eq: $id}}, _set: {done: true}) {
        affected_rows
      }
    }
  `

  const deleteMutation = gql`
    mutation delete($id: Int!) {
      delete_todoist(where: {id: {_eq: $id}}) {
        affected_rows
      }
    }
  `

  // GraphQL get [Mutation Methods]
  const [doneTask] = useMutation(doneMutation,{
    update() {
      refetch();
    }
  });

  const [deleteTask] = useMutation(deleteMutation,{
    update() {
      refetch();
    }
  });
  
  return (
    <>
      <ContextMenuTrigger id={`contextMenu-${task.id}`}>
        <li
          key={task.id}
          className={`${styles.TaskItem} ${styles["TaskItem--" + task.layer]}`}
        >
          {/* 上記のhiddenは敢えてTypoすることでhiddenしないようにしている */}
          <div className={styles.TaskItem__body}>
            {task.child_ids.length !== 0 && (
              <button className={styles.TaskItem__pullDown}>
                <img
                  className={`${styles.TaskItem__pullDownImage} ${styles["TaskItem__pullDownImage--active"]}`}
                  src={arrowDown}
                  alt=""
                />
              </button>
            )}
            <button className={styles.TaskItem__checkbox} onClick={e => {
              doneTask({
                variables: {id: task.id}
              })
            }} >
              <div className={styles.TaskItem__checkboxCircle}></div>
            </button>
            <div className={styles.TaskItem__content}>
              <div className={styles.TaskItem__contentText}>{task.content}</div>
              {task.child_ids.length !== 0 && (
                <div className={styles.TaskItem__childInfos}>
                  <img
                    src={arrowIcon}
                    width="10px"
                    height="10px"
                    className={styles.TaskItem__arrowIcon}
                    alt=""
                  />
                  <span className={styles.TaskItem__childCounter}>
                    0/{task.child_ids.length}
                  </span>
                </div>
              )}
            </div>
          </div>
        </li>
      </ContextMenuTrigger>
      <ContextMenu id={`contextMenu-${task.id}`}>
        <MenuItem onClick={e => {
          deleteTask({
            variables: {id: task.id}
          })
        }}>
          <span>削除</span>
        </MenuItem>
      </ContextMenu>
    </>
  );
}

export default TaskItem;
