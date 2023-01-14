import React, { useEffect, useState } from 'react';
import TaskForm from '../TaskForm/TaskForm.component';
import "./taskList.style.scss";
import axios from 'axios';
import { toast } from 'react-toastify';
import { URL } from '../../App';
import Loader from '../Loader/Loader.component';
import TaskItem from '../TaskItem/TaskItem.component';

const TaskList = () => {

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputTitle, setInputTitle] = useState({
        title:''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [taskId, setTaskId] = useState('');

    const inputformChange = (event) => {
        setInputTitle({
            title:event.target.value
        });
     }

    const submitHandler = async(event) => { 
        event.preventDefault(); 
        const { title } = inputTitle;
        if (title === '') {
            return toast.error("Title cannot be empty", {
                autoClose:5000
            })
         }
        
        try {
            await axios.post(`${URL}/api/v1/tasks`, inputTitle);
            setInputTitle({ title: '' });
            toast.success('Added successfully...!')
            getTaskHandler();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getTaskHandler = async () => { 
        setIsLoading(true);
        try {
            const { data} = await axios.get(`${URL}/api/v1/tasks`);
            setTasks(data);
            setIsLoading(false);
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    const deleteTaskHandler = async (id) => {
        try {
            await axios.delete(`${URL}/api/v1/tasks/${id}`);
            toast.success("Task successfully deleted");
            getTaskHandler();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getSingleTask = async (task) => {
        setInputTitle({ title: task.title });
        setTaskId(task._id);
    }

    const updateTask = async (event) => {
        event.preventDefault();
        const { title} = inputTitle
        if (title === '') { 
            return toast.error('title cannot be empty');
        };
        try {
            await axios.put(`${URL}/api/v1/tasks/${taskId}`, {
                title: title,
                isCompleted:false
            });
            setInputTitle({ title: '' });
            setIsEditing(false);
            toast.success('task successfully edited');
            getTaskHandler();
        } catch (error) {
            toast.error(error.message)
        }
     };

    const setTaskToComplete = async (task) => { 
        try {
            await axios.put(`${URL}/api/v1/tasks/${task._id}`, {
                title: task.title,
                isCompleted: !task.isCompleted
            });
            toast.success(`${task.title} is now ${task.isCompleted?"Not Completed":"Completed"}!`);
            getTaskHandler();
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getTaskHandler();
    }, [])


    
  return (
      <div className='task_list_container'>
          <h1>Task Manager</h1>
    
          <TaskForm isEditing={isEditing} updateTask={updateTask }  submitHandler={submitHandler} inputTitle={inputTitle} setInputTitle={setInputTitle} inputformChange={ inputformChange} />
          <div className='task_list_item_container'>
              { 
                isLoading && <Loader/>
              }
              { 
                  tasks.map(item => {
                      const {_id } = item;
                      return <TaskItem key={_id} data={item} deleteTaskHandler={deleteTaskHandler} getSingleTask={getSingleTask} setIsEditing={setIsEditing} setTaskToComplete={setTaskToComplete }  />
                   })
              }
          </div>
      </div>
  )
}

export default TaskList;