import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Task } from '../../interfaces';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface BasicModalProps {
    handleClose: () => void;
    taskId: number;
    updateTask: (task: Task) => void;
}

const BasicModal: React.FC<BasicModalProps> = ({ handleClose, taskId, updateTask }) => {
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [task, setTask] = useState<Task | null>(null);

    const fetchTask = async () => {
        try {
            debugger
            const response = await fetch(`https://dummyjson.com/todos/${taskId}`);
            const data = await response.json();
            setTask(data);
            setUpdatedTitle(data.title);
        } catch (error) {
            console.error('Error fetching task:', error);
        }
    };

    useEffect(() => {
        fetchTask();
    }, [taskId]);

    const updateListTasks = () => {
        if (task) {
            const updatedTask: Task = { ...task, title: updatedTitle };
            updateTask(updatedTask);
            handleClose();
        }
    };

    return (
        <Modal
            open={true}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h2 id="modal-modal-title">Update Task</h2>
                <TextField
                    fullWidth
                    label="Task Title"
                    variant="outlined"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <Button onClick={updateListTasks} variant="contained" sx={{ mt: 2 }}>Update Task</Button>
            </Box>
        </Modal>
    );
}

export default BasicModal;
