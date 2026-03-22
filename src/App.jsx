import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from "react";
import Todo from './Components/Todo'
import MyLists from './Components/MyLists'

const App = () => {

  const [lists, setLists] = useState(
  localStorage.getItem("lists") ? 
  JSON.parse(localStorage.getItem("lists")) : 
  [{
    id: Date.now(),
    name: "My Tasks",
    color: "#BA9BD9",
    todos: [],
    stickyNotes: []
  }] )

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists))
  }, [lists])

  const addList = (newList) => {
    setLists((prev) => [...prev, newList])
  }

  return (
    <div className="bg-stone-900 grid py-4 min-h-screen place-items-center">
      <div className="w-full">
      <Routes>
        <Route path="/" element={<Todo lists={lists} setLists={setLists} />} />
        <Route path="/lists" element={<MyLists lists={lists} addList={addList} />} />
        <Route path="/list/:id" element={<Todo lists={lists} setLists={setLists} />} />
      </Routes>
      </div>
    </div>
  )
}


export default App



