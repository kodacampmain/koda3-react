import { Link } from "react-router";
/**
 * Digunakan untuk elemen list pada navbar
 * @param {Object} props
 * @param {string} props.to - Tujuan Navigasi dari Link
 * @param {string} props.listText - Teks dari Link
 */
function ListItem(props) {
  return (
    <li className="cursor-pointer select-none">
      <Link to={props.to}>{props.listText}</Link>
    </li>
  );
}

export default ListItem;
