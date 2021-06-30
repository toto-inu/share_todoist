import React, { useState } from 'react';
import styles from "./index.module.scss";


function AddTaskButton(args) {
  const [ content, setContent ] = useState('');
  const [tasks, setTasks] = [ args.tasks, args.setTasks ];
  
  const validate = () => {
    return content !== "";
  }
  
  const addTask = () => (e) => {
    e.preventDefault();
    if (!validate()) return;
    setTasks(content);
    setContent("");
  }
  
  const handleChange = (setter) => (e) => {
    const newValue = e.target.value;
    setter(newValue);
  }
  
  return (
    <form onSubmit={addTask(tasks, setTasks, content, setContent)} className={styles.addForm}>
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
