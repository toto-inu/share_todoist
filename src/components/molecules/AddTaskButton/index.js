import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTask, selectTasks } from '~/modules/tasks'
import styles from "./index.module.scss";


function AddTaskButton(args) {
  const [ content, setContent ] = useState('');
  
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();
  
  const validate = () => {
    return content !== "";
  }
  
  const addTask = () => (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(setTask({ content }));
    setContent("");
  }
  
  const handleChange = (setter) => (e) => {
    const newValue = e.target.value;
    setter(newValue);
  }
  
  return (
    <form onSubmit={addTask()} className={styles.addForm}>
      <div className={styles.addForm__content}>
        <input onChange={handleChange(setContent)} name="contents" value={content} placeholder="例: デザインのミーティング11時 p1 #ミーティング" className={styles.addForm__input}/>
      </div>
      <div className={styles.addForm__submit}>
        <button 
          className={styles.addForm__addButton} 
          disabled={!validate()}
        >
          タスクを追加
        </button>
        <button type="button" className={styles.addForm__cancelButton}>キャンセル</button>
      </div>
    </form>
  );
}

export default AddTaskButton;
