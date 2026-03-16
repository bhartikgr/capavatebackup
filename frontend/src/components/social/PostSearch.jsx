import React from 'react'

export default function PostSearch () {
  return (
    <div className='d-flex align-items-center gap-3'>
      <div className='user-profile flex-shrink-0'>
        <img
          src={require('../../assets/images/capavate.png')}
          alt='Company logo'
          className='w-100 h-100 object-fit-cover'
        />
      </div>
      <div className='w-100'>
        <input
          type='text'
          className='serach_input'
          placeholder='Start a post'
        />
      </div>
    </div>
  )
}
