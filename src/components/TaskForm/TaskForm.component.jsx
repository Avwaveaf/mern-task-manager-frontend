import "./taskForm.styles.scss";

const TaskForm = ({ ...props}) => {
    const { submitHandler, inputTitle, inputformChange, isEditing, updateTask } = props;

  return (
    <form onSubmit={isEditing?updateTask:submitHandler}>
          <input type="text" name="" value={inputTitle.title} onChange={inputformChange} />
          <button type="submit">{ isEditing?"Edit":"submit"}</button>
    </form>
  )
}

export default TaskForm