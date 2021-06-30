import { useSelector, useDispatch } from 'react-redux';
import { setTask, selectTasks } from '../../../modules/tasks'
import styles from "./index.module.scss";
import TaskItem from "../../molecules/TaskItem/index";
import AddTaskButton from "../../molecules/AddTaskButton/index";
import React, { useState } from 'react';

function TaskView() {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();
  const dispatchSetTask = (content) => {
    dispatch(setTask({ content }));
  }
  return (
    <div>
      <div className={styles.Section__title}>直近やること</div>
      <ul className={styles.Section__body}>
        {tasks.map((task) => {
          if (!task.doneFlag) {
            return <TaskItem task={task} />;
          }
        })}
        {/* 後々Reduxに移行する */}
        <li>
          <AddTaskButton tasks={tasks} setTasks={dispatchSetTask} />
        </li>
      </ul>
      {/* <button onClick={() => setTasks(tasks.filter(task=>task.id!==deleteTargetId))}>Delete ID={deleteTargetId}</button> */}
      {/* <form onSubmit={deleteTask(tasks, setTasks, content)}>
        <input onChange={handleChange(setContent)} name="contents" value={content} />
        <button>削除</button>
      </form> */}
    </div>
  );
}

const handleChange = (setter) => (e) => {
  const newValue = e.target.value;
  setter(newValue);
}

const deleteTask = (tasks, setTasks, targetId) => (e) => {
  e.preventDefault();
  const newTasks = tasks.filter(task => {
    return task.id !== Number(targetId);
  })
  setTasks(newTasks);
}


export default TaskView;
