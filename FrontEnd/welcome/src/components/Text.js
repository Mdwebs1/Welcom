import React from 'react'

function Text({setCurrentId, id,onDelete, user,contactObjects  }) {

    const [toggle, setToggle] = React.useState(false)

return (
<>
        <tr  onClick={() => setToggle(!toggle) } style={contactObjects.senderId === user ? { float: 'right'}: { float: 'left'}} key={id}>
                                        <div style={contactObjects.senderId === user ? {backgroundColor: 'rgba(6, 141, 126, 1)', padding: '15px', borderRadius: '4px'}: {backgroundColor: 'gray', padding: '15px', borderRadius: '4px'}} >
                                        <td className="message">{contactObjects.message}</td>
                                        </div>
                                        <td className={ toggle? '' : "actions"}>
        <button  onClick={() => { setCurrentId(id) }}>
            Edit
        </button>
        <button onClick={() => { onDelete(id) }}>
        Delete
        </button>
    </td>                                    </tr><br/><br/><br/> <br/><br/>

  </>
        
    )
}

export default Text
