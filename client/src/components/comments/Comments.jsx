import React, { useState } from 'react'
import './comments.css'
import Image from '../image/image'; 
import EmojiPicker from "emoji-picker-react";


const Comments = () => {

    const [open, setOpen] = useState(false);

  return (
    <>
    <div className='comment'>
        <Image path = "/general/noAvatar.png" alt="" />
        <div className='commentContent'>
        <span className='commentUsername'>John Doe</span>
        <p className='commentText'>
            dkfbnkjfaf ad kasdksa daskd ad kas das das
        </p>
        <span className='commentTime'>1hr</span>
        </div>
    </div>

    <div className='comment'>
        <Image path = "/general/noAvatar.png" alt="" />
        <div className='commentContent'>
        <span className='commentUsername'>John Doe</span>
        <p className='commentText'>
            dkfbnkjfaf ad kasdksa daskd ad kas das das
        </p>
        <span className='commentTime'>1hr</span>
        </div>
    </div>

    <div className='comment'>
        <Image path = "/general/noAvatar.png" alt="" />
        <div className='commentContent'>
        <span className='commentUsername'>John Doe</span>
        <p className='commentText'>
            dkfbnkjfaf ad kasdksa daskd ad kas das das
        </p>
        <span className='commentTime'>1hr</span>
        </div>
    </div>

    <form className='commentForm'>
        <input type="text" placeholder='Add a comment' />
        <div className='emoji'>
            <div onClick={() => setOpen((prev) => !prev)}>😀</div>
           { open &&  <div className='emojiPicker'> 
             <EmojiPicker />
            </div>
           }
        </div>
    </form>

    
    </>
  )
}

export default Comments;