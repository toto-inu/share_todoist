import React from 'react';

import styles from "./index.module.scss";

import TaskItem from "~/components/molecules/TaskItem/index";
import AddTaskButton from "~/components/molecules/AddTaskButton/index";

import { gql, useQuery } from "@apollo/client";

const query = gql`
  query MyQuery {
    todoist(where: {done: {_eq: false}}) {
      id
      done
      layer
      # created_at
      # updated_at
      content
      child_ids
    }
  }
`;

function TaskView() {
  const { data, loading } = useQuery(query);
  if( loading || !data ) return null;

  const tasks = data.todoist;

  // 親子要素のマッチングができていない
  // 親子のJSONを作成 → 平滑化することで順番を整理すること

  return (
    <div>
      <div className={styles.Section__title}>直近やること</div>
      <ul className={styles.Section__body}>
        {tasks.map((task) => {
          if (!task.doneFlag) {
            return <TaskItem task={task} key={task.id} />;
          }
        })}
        <li>
          <AddTaskButton />
        </li>
      </ul>
    </div>
  );
}

export default TaskView;
