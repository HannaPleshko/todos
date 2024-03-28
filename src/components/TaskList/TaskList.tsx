import React from 'react';
import { Task } from '../../interfaces';
import style from './TaskList.module.scss'
import DeleteIcon from '@mui/icons-material/Delete';

interface TaskListProps {
  tasks: Task[];
  updateTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, updateTask, deleteTask }) => {
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
          <DeleteIcon onClick={() => deleteTask(task.id)} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
