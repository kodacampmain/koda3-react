/**
 *
 * @param {Object} props
 * @param {any} props.id
 * @param {string} props.name
 * @param {(e: Event) => void} props.onChange
 * @param {string[]} props.selectedSeats
 * @returns
 */
function Seat({ id, name, selectedSeats, onChange }) {
  return (
    <div className="h-25">
      <label
        htmlFor={id}
        className={`h-full block ${
          selectedSeats.includes(name) ? "bg-emerald-800" : "bg-amber-500"
        } rounded-2xl cursor-pointer`}
      ></label>
      <input type="checkbox" name={name} id={id} onChange={onChange} className="hidden" />
    </div>
  );
}

export default Seat;
