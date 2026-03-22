import { useState, useEffect, useRef } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoPauseOutline, IoPlayOutline, IoRefreshOutline } from "react-icons/io5";
import back from "../assets/back.svg"

const TimerPopup = ({ closeTimer, setTimerRunning, timerStarted, setTimerStarted, timeLeft, setTimeLeft, totalTime, setTotalTime, isPaused, setIsPaused }) => {

  // Step 2 — user inputs for hours, minutes, seconds
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Step 5 — start the timer
  const handleStart = () => {
    const total = hours * 3600 + minutes * 60 + seconds;
    if (total === 0) return alert("Please set a time!");
    setTimeLeft(total);
    setTotalTime(total);
    setTimerStarted(true);
    setTimerRunning(true);
  };

  // Step 6 — reset the timer
  const handleReset = () => {
    setTimerStarted(false);
    setIsPaused(false);
    setTimeLeft(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setTimerRunning(false);
  };

  // Step 7 — format time for display (e.g. 90 seconds → 00:01:30)
  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // Step 8 — calculate progress for the circle (0 to 1)
  const progress = totalTime > 0 ? timeLeft / totalTime : 0;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    // Dark overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      
      {/* White card */}
      <div className="bg-white rounded-2xl w-11/12 max-w-sm overflow-hidden shadow-xl">

        {/* Top nav */}
        <div className="bg-[#E5E7EB] px-6 h-12 flex items-center">
          <button
            onClick={() => { closeTimer(); if (!timerStarted) setTimerRunning(false); }}
            className="flex items-center gap-1 bg-transparent border-none cursor-pointer w-fit"
          >
            <img src={back} />
          </button>
        </div>

        <div className="p-7">
          {!timerStarted ? (
            /* ── Set Timer Screen ── */
            <div>
              <h2 className="text-2xl font-semibold mb-6">Set a Timer</h2>

              {/* Time inputs */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="flex flex-col items-center">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-16 h-16 text-center text-2xl font-semibold bg-gray-100 rounded-xl outline-none border-none"
                  />
                  <span className="text-xs text-gray-400 mt-1">hours</span>
                </div>

                <span className="text-2xl font-bold text-[#BA9BD9] mb-4">:</span>

                <div className="flex flex-col items-center">
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) => setMinutes(Number(e.target.value))}
                    className="w-16 h-16 text-center text-2xl font-semibold bg-gray-100 rounded-xl outline-none border-none"
                  />
                  <span className="text-xs text-gray-400 mt-1">mins</span>
                </div>

                <span className="text-2xl font-bold text-[#BA9BD9] mb-4">:</span>

                <div className="flex flex-col items-center">
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={seconds}
                    onChange={(e) => setSeconds(Number(e.target.value))}
                    className="w-16 h-16 text-center text-2xl font-semibold bg-gray-100 rounded-xl outline-none border-none"
                  />
                  <span className="text-xs text-gray-400 mt-1">secs</span>
                </div>
              </div>

              {/* Cancel + Start buttons */}
              <div className="flex gap-3">
                <button
                  onClick={closeTimer}
                  className="flex-1 h-12 rounded-full bg-gray-200 text-gray-600 font-medium border-none cursor-pointer hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStart}
                  className="flex-1 h-12 rounded-full bg-[#BA9BD9] text-white font-medium border-none cursor-pointer hover:opacity-90"
                >
                  Start
                </button>
              </div>
            </div>
          ) : (
            /* ── Running Timer Screen ── */
            <div className="flex flex-col items-center">

              {/* Circular progress */}
              <div className="relative flex items-center justify-center mb-8">
                <svg width="200" height="200">
                  {/* Background circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="10"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke="#BA9BD9"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)"
                    style={{ transition: "stroke-dashoffset 1s linear" }}
                  />
                </svg>
                {/* Time display in center */}
                <span className="absolute text-3xl font-semibold text-gray-800">
                  {formatTime(timeLeft)}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-6">
                {/* Delete/reset */}
                <button
                  onClick={handleReset}
                  className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer bg-white hover:bg-gray-100"
                >
                  <FaRegTrashAlt className="text-gray-500" />
                </button>

                {/* Pause/Play */}
                <button
                  onClick={() => setIsPaused((prev) => !prev)}
                  className="w-14 h-14 rounded-full bg-[#BA9BD9] flex items-center justify-center cursor-pointer border-none hover:opacity-90"
                >
                  {isPaused
                    ? <IoPlayOutline className="text-white text-2xl" />
                    : <IoPauseOutline className="text-white text-2xl" />
                  }
                </button>

                {/* Restart */}
                <button
                  onClick={() => { setTimeLeft(totalTime); setIsPaused(false); }}
                  className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer bg-white hover:bg-gray-100"
                >
                  <IoRefreshOutline className="text-gray-500 text-xl" />
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimerPopup;

