import React, { Component } from 'react'
import loading from './Loading.gif'
export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img  className="my-3" src={loading} alt='loading'></img>
      </div>
    )
  }
}
