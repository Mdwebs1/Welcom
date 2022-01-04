import React, { useState, useEffect } from "react";
import Message from "./Message";
import firebaseDb from "../firebase";
import Text from "./Text";
import {useParams} from "react-router-dom"
import Nav from './Nav'


const Chat = () => {
    var [contactObjects, setContactObjects] = useState({})
    var [currentId, setCurrentId] = useState('')
    var [user, setUser] = useState(localStorage.getItem('id'))

    let {id} = useParams();

    useEffect(() => {
        // console.log(user)

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
            <Nav/>  
                <div>
                    <h1 className="chat_title" >Chat</h1>
                </div>
            </div>
            <div>
                <div className='div-chat'>
                <h3 className="message_title" >Messages</h3>

                    <table  style={{width: '100%' ,padding: '20px'}} >
                        <tbody>
                            {
                                Object.keys(contactObjects).map(id => {
                                    return         <Text id={id} onDelete={onDelete} setCurrentId={setCurrentId}
                                      contactObjects={contactObjects[id]} user={user}/>

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