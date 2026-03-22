import React from 'react'
import next_page from "../assets/next_page.svg"
import delete_icon from "../assets/delete.png"

const StickyNoteItems = ({id, text, openNote, deleteSticky}) => {

  return (
    <div onClick={() => openNote(id)} className="flex bg-[#BA9BD9] px-5 py-4 mt-2 rounded-[1rem] justify-between items-center w-full cursor-pointer">
        <p className="text-slate-700">{text ? text.slice(0, 30) : "Empty note..."}</p>
        <div className="flex gap-2">
        <img onClick={() => {deleteSticky(id)}} src={delete_icon} alt="delete icon" className="w-3.5 cursor-pointer"/>
        {/*<a ><img src={next_page} alt="" className="w-3 cursor-pointer"/></a>*/}
        </div>
    </div>
  )
}

export default StickyNoteItems

