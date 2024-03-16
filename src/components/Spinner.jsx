import React, { Component } from 'react'
import tenor from './tenor.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className="my-3" src={tenor} alt="loading"width="20px" height="20px"/>
      </div>
    )
  }
}

export default Spinner