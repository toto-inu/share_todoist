import React from 'react';

import { useSelector } from 'react-redux';
import { selectTasks } from '~/modules/tasks'

import styles from "./index.module.scss";

import TaskItem from "~/components/molecules/TaskItem/index";
import AddTaskButton from "~/components/molecules/AddTaskButton/index";


function TaskView() {
  const tasks = useSelector(selectTasks);

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
