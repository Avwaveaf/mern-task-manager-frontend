import React from 'react';
import "./taskItem.styles.scss";
import { FiDelete, FiEdit3, FiCheckSquare } from 'react-icons/fi';

const TaskItem = ({ data, deleteTaskHandler , getSingleTask, setIsEditing, setTaskToComplete}) => {
    const { title, _id, createdAt, isCompleted } = data;
    
  return (
      <div className={ `task_item_container ${isCompleted?"completed_task":""}`}>
          
          <h1 className={isCompleted?"text_mark": "" }>{title}</h1>
          { 
              isCompleted?<span>Completed</span>:""
          }
          <p>{createdAt}</p>
          <div className='task_item_tools_container'>
            
          <FiDelete onClick={() => { 
              deleteTaskHandler(_id)
          }} color="red" className='react-icon' />
          <FiEdit3 color='blue' className='react-icon' onClick={() => { 
              getSingleTask(data);
              setIsEditing(true);
          }} />
          <FiCheckSquare onClick={() => { 
              setTaskToComplete(data)
            }} color="green" className='react-icon'/>
            </div>
      </div>
  )
}

export default TaskItem