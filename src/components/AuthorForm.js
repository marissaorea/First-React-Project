import React from 'react'

const AuthorForm = (props) => {

  let messageField = {} //enables to pass field values to the parent component


    return (
      <form onSubmit={(event) => {
        props.handleSubmit(messageField.name.value, messageField.message.value); event.preventDefault(); event.target.reset();}}>
            <div className='ui input'>
              <input ref={input => messageField.name = input} placeholder="Enter Name here"/>
              <input ref={input => messageField.message = input} placeholder="Enter Message here"/>
            </div>
          <br></br>
              <button className="ui green basic button">Submit</button>
      </form>
    )


} //end of functional component


export default AuthorForm
