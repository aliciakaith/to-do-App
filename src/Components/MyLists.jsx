import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaListUl } from "react-icons/fa";
import back from "../assets/back.svg"

const LIST_COLORS = ["#BA9BD9", "#F28B82", "#4FC3F7", "#34A853", "#FBBC04"];

const MyLists = ({ lists, addList }) => {
  const navigate = useNavigate();
  const [showNewList, setShowNewList] = useState(false);
  const [listName, setListName] = useState("");
  const [selectedColor, setSelectedColor] = useState(LIST_COLORS[0]);

  const handleAdd = () => {
    if (listName.trim() === "") return;
    const newList = {
      id: Date.now(),
      name: listName.trim(),
      color: selectedColor,
      todos: [],
      stickyNotes: [],
    };
    addList(newList);
    setListName("");
    setSelectedColor(LIST_COLORS[0]);
    setShowNewList(false);
    navigate(`/list/${newList.id}`);
  };

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col min-h-[550px] rounded-xl overflow-hidden">

      {/* Top nav */}
      <div className="bg-[#E5E7EB] px-6 h-12 flex items-center">
          {showNewList ? <button
            onClick={() => setShowNewList(false)}
            className="flex items-center gap-1 bg-transparent border-none cursor-pointer w-fit"
          >
            <img src={back} />
          </button> : ""}
      </div>

      {showNewList ? (
        /* New List Screen */
        <div className="flex flex-col p-7 flex-1">

          <h1 className="text-3xl font-semibold mb-6">New List</h1>

          {/* Icon preview */}
          <div className="flex justify-center mb-6">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: selectedColor }}
            >
              <FaListUl className="text-white text-2xl" />
            </div>
          </div>

          {/* Name input + ADD button */}
          <div className="flex items-center bg-gray-100 rounded-full mb-4">
            <input
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              className="bg-transparent border-0 outline-none flex-1 h-12 pl-5 pr-2 placeholder:text-slate-400 text-sm"
              type="text"
              placeholder="List Name Here"
            />
            <button
              onClick={handleAdd}
              className="border-none rounded-full bg-[#BA9BD9] px-6 h-12 text-white text-sm font-medium cursor-pointer"
            >
              ADD
            </button>
          </div>

          {/* Color picker */}
          <div className="flex items-center gap-3 bg-gray-100 rounded-full px-5 py-3">
            {LIST_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className="w-8 h-8 rounded-full border-none cursor-pointer transition-transform hover:scale-110"
                style={{
                  backgroundColor: color,
                  outline: selectedColor === color ? `3px solid ${color}` : "none",
                  outlineOffset: "2px",
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        /* My Lists Screen */
        <div className="flex flex-col p-7 flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold">My Lists</h1>
            <button
              onClick={() => setShowNewList(true)}
              className="text-5xl text-gray-500 bg-transparent border-none cursor-pointer hover:text-[#BA9BD9] items-center"
            >
              +
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {lists.map((list) => (
              <button
                key={list.id}
                onClick={() => navigate(`/list/${list.id}`)}
                className="flex items-center gap-4 bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-2xl cursor-pointer border-none transition-all hover:shadow-md text-left"
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: list.color || "#BA9BD9" }}
                >
                  <FaListUl className="text-white text-sm" />
                </div>
                <span className="text-slate-700 font-medium">{list.name}</span>
                <span className="ml-auto text-gray-400">›</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLists;
