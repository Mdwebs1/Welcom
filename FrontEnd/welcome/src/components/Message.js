import React, { useState, useEffect } from "react";


const Message = (props) => {
    const initialFieldValues = {
        message: '',
        senderId: '',
    }
    var [values, setValues] = useState(initialFieldValues)
    useEffect(() => {
        if (props.currentId == '')
            setValues({
                ...initialFieldValues
            })
        else
            setValues({
                ...props.contactObjects[props.currentId]
            })
    }, [props.currentId, props.contactObjects])
    const handleInputChange = e => {
        var { name, value } = e.target
        setValues({
            ...values, [name]: value, senderId: props.user
        })
    }
    const handleFormSubmit = e => {
        e.preventDefault();
        props.addOrEdit(values)
    }
    return (
        <form className="messageInput" autoComplete="off" onSubmit={handleFormSubmit}>
                <input className="form-control" placeholder="Message" name="message"
                    value={values.message}
                    onChange={handleInputChange}
                />
            <div className="form-group">
                <input type="submit" value={props.currentId == '' ? "Send" : "Update"} className="btn btn-primary btn-block" />
            </div>
        </form>
    );
}
export default Message;
