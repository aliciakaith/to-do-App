import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListUl } from 'react-icons/fa'
import { FaAlignLeft } from 'react-icons/fa'
import back from "../assets/back.svg"


const StickyNoteEditor = ({closeNote, updateNote, selectedNote, stickyNotes}) => {

  const currentNote = stickyNotes.find((note) => note.id === selectedNote)
  if (!currentNote) return null

  return (

    <div className="flex flex-col min-h-[550px] bg-white rounded-xl overflow-hidden w-11/12 max-w-md place-self-center">
      
      {/* Top nav */}

      <div className="bg-[#E5E7EB] px-6 h-12 flex items-center">
        <button
          onClick={closeNote}
          className="flex items-center gap-1 bg-transparent border-none cursor-pointer w-fit"
        >
          <img src={back} />
        </button>
      </div>

      {/* Textarea */}
      <textarea
        className="flex-1 bg-white p-5 text-gray-800 text-base outline-none resize-none placeholder:text-gray-400 min-h-[400px]"
        placeholder="Take a note..."
        value={currentNote.text}
        onChange={(e) => updateNote(selectedNote, e.target.value)}
      />

      {/* Toolbar */}
      <div className="flex items-center gap-5 px-5 py-3 border-t border-gray-200">
        <FaBold className="text-gray-600 cursor-pointer hover:text-[#BA9BD9]" />
        <FaItalic className="text-gray-600 cursor-pointer hover:text-[#BA9BD9]" />
        <FaUnderline className="text-gray-600 cursor-pointer hover:text-[#BA9BD9]" />
        <FaStrikethrough className="text-gray-600 cursor-pointer hover:text-[#BA9BD9]" />
        <FaAlignLeft className="text-gray-600 cursor-pointer hover:text-[#BA9BD9]" />
        <FaListUl className="text-gray-600 cursor-pointer hover:text-[#BA9BD9]" />
      </div>

    </div>
  )
}

export default StickyNoteEditor