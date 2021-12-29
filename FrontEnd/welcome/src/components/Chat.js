import React, { useState, useEffect } from "react";
import Message from "./Message";
import firebaseDb from "../firebase";
import {useParams} from "react-router-dom"

const Chat = () => {
    var [contactObjects, setContactObjects] = useState({})
    var [currentId, setCurrentId] = useState('')
    var [user, setUser] = useState(localStorage.getItem('id'))

    let {id} = useParams();

    useEffect(() => {
        console.log(user)

        firebaseDb.child(`contacts${id}`).on('value', snapshot => {
            if (snapshot.val() != null)
                setContactObjects({
                    ...snapshot.val()
                })
            else
                setContactObjects({})
        })
    }, [])// similar to componentDidMount
    const addOrEdit = obj => {
        if (currentId == '')
            firebaseDb.child(`contacts${id}`).push(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
        else
            firebaseDb.child(`contacts${id}/${currentId}`).set(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
    }
    const onDelete = key => {
        if (window.confirm('Are you sure to delete this record?')) {
            debugger
            firebaseDb.child(`contacts${id}/${key}`).remove(
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
        }
    }
    return (
        <>
            <div>
                <div>
                    <h1 >Chat</h1>
                </div>
            </div>
            <div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Massage</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(contactObjects).map(id => {
                                    return <tr style={{width: '500px'}} key={id}>
                                        <div style={contactObjects[id].senderId === user ? {backgroundColor: 'red', textAlign: 'right'}: {backgroundColor: 'green', textAlign: 'left'}} >
                                        <td className="message">{contactObjects[id].message}</td>
                                        </div>
                                        <td>
                                            <button  onClick={() => { setCurrentId(id) }}>
                                                Edit
                                            </button>
                                            <button onClick={() => { onDelete(id) }}>
                                            Delete
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div >
                    <Message {...({ addOrEdit, currentId, contactObjects, user })} />
                </div>
            </div>
        </>
    );
}
export default Chat;