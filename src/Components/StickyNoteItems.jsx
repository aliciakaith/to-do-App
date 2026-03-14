import React from 'react'
import tick from "../assets/tick.svg";

const StickyNoteItems = () => {
  return (
    <div className="flex bg-[#BA9BD9] px-5 py-3 mt-7 rounded-[1rem] justify-between items-center">
        <p>heading of notes here</p>
        <img src={tick} alt="" className="w-5"/>
    </div>
  )
}

export default StickyNoteItems

