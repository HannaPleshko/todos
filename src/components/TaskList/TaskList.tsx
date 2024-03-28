import React, { useState } from 'react';
import { Task } from '../../interfaces';
import style from './TaskList.module.scss'
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import BasicModal from '../BasicModal/BasicModal';

interface TaskListProps {
  tasks: Task[];
  updateTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, updateTask, deleteTask }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div className={style.wrapper}>
      {tasks.map(task => (
        <div key={task.id} className={style.item}>
          <p>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => updateTask({ ...task, completed: !task.completed })}
            />
            {task.title}
          </p>
          <div>
            <CreateIcon onClick={handleOpen} />
            <DeleteIcon onClick={() => deleteTask(task.id)} />
          </div>
        </div>
      ))}
      {open && <BasicModal open={open} handleClose={handleClose} />}
    </div>
  );
};

export default TaskList;
