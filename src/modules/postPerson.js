import axios from 'axios'

    const postPersonFunc = async (newObject) => {
        const response = await axios
            .post('http://localhost:3001/persons', newObject)
            console.log(response)
    }

    const deletePersonFunc = async (oldObject) => {
        const response = await axios
            .delete(`http://localhost:3001/persons/${oldObject.id}`)
            console.log(response)
    }

    // const updatePersonFunc = async (id, newObject) => {
    //     const response = await axios.put(`http://localhost:3001/persons/${id}`, newObject);
    //     console.log(response);
    //   };
    

const postPersonModule = { postPersonFunc, deletePersonFunc, }

export default postPersonModule