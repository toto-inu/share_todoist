import React, { useState } from 'react';
import styles from "./index.module.scss";

import { gql, useMutation } from "@apollo/client";


function AddTaskButton(args) {
  const {refetch} = args;
  const [ content, setContent ] = useState('');

  const addMutation = gql`
    mutation addTask($content: String!) {
      insert_todoist(objects: {content: $content}) {
        affected_rows
      }
    }
  `

  const [addTaskMutation, {data, loading }] = useMutation(addMutation, {
    update: () => {
      refetch();
    }
  })
  
  const validate = () => {
    return content !== "";
  }
  
  const addTask = () => (e) => {
    e.preventDefault();
    if (!validate()) return;
    addTaskMutation({
      variables: {content: content}
    });
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
