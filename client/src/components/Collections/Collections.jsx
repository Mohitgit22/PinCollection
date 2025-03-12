import React from 'react'
import Image from '../image/image';
import './collections.css';

const Collections = () => {
  return (
    <div className='collection'>
    <Image path="/pins/pin1.jpeg" alt="" />
    <div className='collectionInfo'>
        <h1> Minimalist Bedrooms</h1>
        <span> 12 Plus . 1w</span>
    </div>
    <Image path="/pins/pin1.jpeg" alt="" />
    <div className='collectionInfo'>
        <h1> Minimalist Bedrooms</h1>
        <span> 12 Plus . 1w</span>
    </div>
    <Image path="/pins/pin1.jpeg" alt="" />
    <div className='collectionInfo'>
        <h1> Minimalist Bedrooms</h1>
        <span> 12 Plus . 1w</span>
    </div>
    </div>
    
  )
}

export default Collections