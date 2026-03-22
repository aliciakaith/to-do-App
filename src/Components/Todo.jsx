import { useRef, useEffect, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";
import StickyNoteItems from "./StickyNoteItems";
import Plus from "../assets/Plus.svg";
import StickyNoteEditor from "./StickyNoteEditor";
import { useParams, useNavigate } from 'react-router-dom'
import back from "../assets/back.svg"
import { FaListUl } from "react-icons/fa";
import TimerPopup from "./TimerPopup";

const Todo = ({lists, setLists}) => {

  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [timerOpen, setTimerOpen] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [selectedTodoTimer, setSelectedTodoTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false)
  const [totalTime, setTotalTime] = useState(0)

  const inputRef = useRef();  
  const { id } = useParams()
  const navigate = useNavigate()
  const currentList = lists.find((list) => list.id === Number(id)) || lists[0]

  // Helper to update the current list inside the lists array in App.jsx
  const updateCurrentList = (updatedFields) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === currentList.id ? { ...list, ...updatedFields } : list
      )
    )
  }

  const openTimer = (timerId) => {
    if (timerRunning) {
        setTimerOpen(true) // reopen the existing timer instead of alerting
    } else {
        setSelectedTodoTimer(timerId)
        setTimerOpen(true)
    }}

  const closeTimer = () => {
    setTimerOpen(false);
  }

  const intervalRef = useRef(null)
  
  useEffect(() => {
    if (timerStarted && !isPaused && timeLeft > 0) {
        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, 1000)
    } else if (timeLeft === 0 && timerStarted) {
        clearInterval(intervalRef.current)
        setTimerRunning(false)
        setTimerStarted(false)
        alert("Time's up! ⏰")
    }
    return () => clearInterval(intervalRef.current)
  }, [timerStarted, isPaused, timeLeft])

  // ── Todo functions ──

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") return null;

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    }

    updateCurrentList({ todos: [...currentList.todos, newTodo] })
    inputRef.current.value = "";
  }

  const deleteTodo = (todoId) => {
    updateCurrentList({
      todos: currentList.todos.filter((todo) => todo.id !== todoId)
    })
  }

  const toggle = (todoId) => {
    updateCurrentList({
      todos: currentList.todos.map((todo) =>
        todo.id === todoId ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    })
  }

  // ── Sticky Note functions ──

  const addNote = () => {
    const newStickyNote = {
      id: Date.now(),
      text: "",
    }
    updateCurrentList({
      stickyNotes: [...currentList.stickyNotes, newStickyNote]
    })
    openNote(newStickyNote.id)
  }

  const openNote = (noteId) => {
    setSelectedNote(noteId)
    setEditorOpen(true)
  }

  const closeNote = () => {
    setEditorOpen(false)
    setSelectedNote(null)
  }

  const deleteSticky = (noteId) => {
    updateCurrentList({
      stickyNotes: currentList.stickyNotes.filter((sticky) => sticky.id !== noteId)
    })
  }

  const updateNote = (noteId, text) => {
    updateCurrentList({
      stickyNotes: currentList.stickyNotes.map((sticky) =>
        sticky.id === noteId ? { ...sticky, text } : sticky
      )
    })
  }

  return (
    <div>
      {editorOpen ? (
        <StickyNoteEditor
          closeNote={closeNote}
          updateNote={updateNote}
          selectedNote={selectedNote}
          stickyNotes={currentList.stickyNotes}
        />
      ) : (
        <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col min-h-[550px] rounded-xl overflow-hidden">

          {/* Header with back button and list icon */}

          <div className="bg-[#E5E7EB] px-6 h-12 flex items-center">
            <button
                onClick={() => navigate('/lists')}
                className="flex items-center gap-1 bg-transparent border-none cursor-pointer w-fit"
                >
                    <img src={back} />
            </button>
          </div>

          <div className="p-7">

          <div className="flex items-center gap-2">
            {/* List icon with color */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: currentList.color || "#BA9BD9" }}
            >
              <FaListUl className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-semibold">{currentList.name}</h1>
          </div>

          <div className="flex items-center my-7 bg-gray-200 rounded-full">
            <input
              ref={inputRef}
              className="bg-transparent border-0 outline-none flex-1 h-12 pl-5 pr-2 placeholder:text-slate-400 text-sm"
              type="text"
              placeholder="Add your task"
            />
            <button
              onClick={add}
              className="border-none rounded-full bg-[#BA9BD9] px-6 h-12 text-white text-sm font-medium cursor-pointer">
              ADD
            </button>
          </div>

          <div>
            {currentList.todos.map((item, index) => (
              <TodoItems
                key={index}
                text={item.text}
                id={item.id}
                isComplete={item.isComplete}
                deleteTodo={deleteTodo}
                toggle={toggle}
                openTimer={openTimer}
                selectedTodoTimer={selectedTodoTimer}
                timerRunning={timerRunning}
              />
            ))}
          </div>

          <div className="flex items-center mt-7 mb-7 justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-semibold">Sticky Notes</h1>
            </div>
            <button
              onClick={addNote}
              className="text-5xl text-gray-500 bg-transparent border-none cursor-pointer hover:text-[#BA9BD9] items-center"
            >
              +
            </button>
          </div>

          <div>
            {currentList.stickyNotes.map((item, index) => (
              <StickyNoteItems
                key={index}
                text={item.text}
                id={item.id}
                openNote={openNote}
                deleteSticky={deleteSticky}
              />
            ))}
          </div>
          </div>
        </div>
      )}
      {timerOpen && ( <TimerPopup closeTimer={closeTimer} setTimerRunning={setTimerRunning} timerStarted={timerStarted} setTimerStarted={setTimerStarted} timeLeft={timeLeft} setTimeLeft={setTimeLeft} totalTime={totalTime} setTotalTime={setTotalTime} isPaused={isPaused} setIsPaused={setIsPaused}/>)}
    </div>
  )
}

export default Todo