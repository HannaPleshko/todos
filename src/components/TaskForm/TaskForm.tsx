import React, { useState } from 'react';
import { Task } from '../../interfaces';
import { Button, TextField } from '@mui/material';
import style from './TaskForm.module.scss';

interface TaskFormProps {
  addTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ id: Math.floor(Math.random() * 1000), title, completed: false });
    setTitle('');
  };

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit}>
        <TextField
          multiline
          fullWidth
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          label="Enter task title"
          variant="outlined"
        />
        <Button type="submit" variant="contained">
          Add Task
        </Button>
      </form>
    </>
  );
};

export default TaskForm;
