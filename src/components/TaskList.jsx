import { useGetTasksQuery, useDeleteTaskMutation, useUpdateTaskMutation } from "../api/apiSlice"

function TaskList() {
    const { data: tasks, isError, isLoading, error } = useGetTasksQuery()

    const [deleteTask] = useDeleteTaskMutation()

    const [updatedTask] = useUpdateTaskMutation()

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {error.message}</div>

    console.log(tasks)

    return (
        <ul>
            {
                tasks.map((taks) => (
                    <li key={taks.id}>
                        <h3>{taks.name}</h3>
                        <p>{taks.description}</p>
                        <button onClick={() => deleteTask(taks.id)}>Delete</button>
                        <input type="checkbox" checked={taks.completed} id={taks.id} 
                        onChange={(e) => {
                            updatedTask({
                                ...taks,
                                completed : e.target.checked,
                            })
                        }} />
                        <label htmlFor={taks.id}>Completed</label>
                    </li>
                ))
            }
        </ul>
    )
}

export default TaskList