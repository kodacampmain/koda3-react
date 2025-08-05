import { useContext, useState } from "react";

import Seat from "../components/Seat";
import { counterContext } from "../contexts/counter/CounterCountex";

function Order() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatsDiv, setSelectedSeatsDiv] = useState([]);
  const { state, dispatch } = useContext(counterContext);
  function handleSubmit(event) {
    event.preventDefault();
    // const selected = [];
    // for (let i = 0; i < 9; i++) {
    //   if (event.target[`seat-${i}`].checked) {
    //     selected.push(`seat-${i}`);
    //   }
    // }
    // setSelectedSeats(selected);
    console.log(selectedSeats);
  }
  return (
    <div>
      <div className="bg-primary p-2.5">
        <p className="font-mysoul text-center text-3xl">{state.count}</p>
        <div className="flex justify-center">
          <button
            onClick={() => dispatch({ type: "INCREMENT" })}
            className="mx-0.75 cursor-pointer border-2 border-solid border-black p-1.25 select-none"
          >
            Increment
          </button>
          <button
            onClick={() => dispatch({ type: "DECREMENT" })}
            className="mx-0.75 cursor-pointer border-2 border-solid border-black p-1.25 select-none"
          >
            Decrement
          </button>
          <button
            onClick={() => dispatch({ type: "RESET" })}
            className="mx-0.75 cursor-pointer border-2 border-solid border-black p-1.25 select-none"
          >
            Reset
          </button>
          <button
            onClick={() => dispatch({ type: "RANDOM" })}
            className="mx-0.75 cursor-pointer border-2 border-solid border-black p-1.25 select-none"
          >
            Random
          </button>
        </div>
      </div>
      <div>Selected: {selectedSeats.sort()}</div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-3 grid-rows-3 gap-1"
      >
        {/* {(function () {
          const result = [];
          for (let i = 0; i < 9; i++) {
            result.push(
              <Seat
                key={i}
                id={i}
                name={`seat-${i}`}
                selectedSeats={selectedSeats}
                onChange={(e) => {
                  setSelectedSeats((selectedSeats) => {
                    if (selectedSeats.includes(e.target.name)) {
                      return selectedSeats.filter((seat) => seat !== e.target.name);
                    }
                    return [...selectedSeats, e.target.name];
                  });
                }}
              />
            );
          }
          return result;
        })()} */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((code, idx) => {
          return (
            <Seat
              key={idx}
              id={code}
              name={`seat-${code}`}
              selectedSeats={selectedSeats}
              onChange={(e) => {
                setSelectedSeats((selectedSeats) => {
                  if (selectedSeats.includes(e.target.name)) {
                    return selectedSeats.filter(
                      (seat) => seat !== e.target.name,
                    );
                  }
                  return [...selectedSeats, e.target.name];
                });
              }}
            />
          );
        })}
        <button>Submit</button>
      </form>
      <div>
        <h2>Seat with Div</h2>
        <div>Selected: {selectedSeatsDiv.sort()}</div>
        <div className="grid grid-cols-3 grid-rows-3 gap-1">
          {(function () {
            const result = [];
            for (let i = 0; i < 9; i++) {
              const seatCode = `seat-${i}`;
              result.push(
                <div
                  key={i}
                  onClick={() => {
                    setSelectedSeatsDiv((selectedSeatsDiv) => {
                      if (selectedSeatsDiv.includes(seatCode)) {
                        return selectedSeatsDiv.filter(
                          (seat) => seat !== seatCode,
                        );
                      }
                      return [...selectedSeatsDiv, seatCode];
                    });
                  }}
                  className={`h-25 ${
                    selectedSeatsDiv.includes(seatCode)
                      ? "bg-fuchsia-800"
                      : "bg-cyan-800"
                  } cursor-pointer rounded-2xl`}
                ></div>,
              );
            }
            return result;
          })()}
        </div>
      </div>
    </div>
  );
}

export default Order;
