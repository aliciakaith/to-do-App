import React from 'react'
import tick from "../assets/tick.svg";
import not_tick from "../assets/not_tick.png";
import delete_icon from '../assets/delete.png';
import { IoTimerOutline } from 'react-icons/io5';
import { FaRegTrashAlt } from "react-icons/fa";

const TodoItems = ({text, id, isComplete, deleteTodo, toggle, openTimer, selectedTodoTimer, timerRunning}) => {
  const hasTimer = selectedTodoTimer === id && timerRunning;
  return (
    <div className="flex items-center my-3 gap-2 rounded-xl px-3 py-1.2">
      <div onClick={() => {toggle(id)}} className="flex flex-1 items-center cursor-pointer">
        <img src={isComplete ? tick : not_tick} alt="status" className="w-7"/>
        <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${isComplete ? "line-through" : ""}`}>{text}</p>
      </div>
      <div className= "flex items-center gap-2 ">
        <IoTimerOutline onClick={() => openTimer(id)} className={`cursor-pointer text-base ${hasTimer ? "text-[#BA9BD9]" : "text-gray-500"} w-5 h-5`}/>
        <FaRegTrashAlt onClick={() => deleteTodo(id)} className="text-gray-500 cursor-pointer text-base w-4 h-4"/>
      </div>
    </div>
  )
}

export default TodoItems
