const Form = ( { handleUpdate }) => {
    return (
        <form className="create" onSubmit={handleUpdate}>

        <label>Exercise Title:</label>
        <input 
            type="text" 
            onChange={(e) => {setTitle(e.target.value)}}
            value={title}   
            required={true}
        />

        <label>Exercise Load:</label>
        <input 
            type="number" 
            onChange={(e) => {setLoad(e.target.value)}}
            value={load}   
            required={true}
        />

        <label>Reps:</label>
        <input 
            type="number" 
            onChange={(e) => {setReps(e.target.value)}}
            value={reps}   
            required={true}
        />
        <button>Update</button>
        {error && <div className='error'>{error}</div>}

    </form>
    );
}
 
export default Form;