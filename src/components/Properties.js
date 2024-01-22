    import React from 'react'

    function Properties(props) {
        const sendDataToParent=()=>{
            props.onChildData('hellooo')
        }
    return (
        <div>   
        {props.data.name}
        {props.data.age}
        <button onClick={sendDataToParent}>send data to parent</button>
        </div>
    )
    }

    export default Properties
