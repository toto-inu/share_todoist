import React from 'react';

import styles from "./index.module.scss";

import TaskItem from "~/components/molecules/TaskItem/index";
import AddTaskButton from "~/components/molecules/AddTaskButton/index";

import { gql, useSubscription } from "@apollo/client";


// GraphQL Query,Mutation
const subscription = gql`
  subscription onTaskAdded {
    todoist {
      id
      done
      created_at
      create_user_id
      content
      child_ids
      layer
      limit
      updated_at
    }
  }
`

function TaskView() {
  // const { data, loading, refetch } = useQuery(query);
  const { data, loading } = useSubscription(subscription);

  if( loading || !data ) return null;
  
  const tasks = data.todoist;

  const refetch = () => 0;

  // 親子要素のマッチングができていない
  // 親子のJSONを作成 → 平滑化することで順番を整理すること

  return (
    <div>
      <div className={styles.Section__title}>直近やること</div>
      <ul className={styles.Section__body}>
        {tasks.map((task) => {
          if (!task.done) {
            return <TaskItem task={task} refetch={refetch} />;
          }
          return <></>
        })}
        <li>
          <AddTaskButton refetch={refetch} />
        </li>
      </ul>
    </div>
  );
}

export default TaskView;
