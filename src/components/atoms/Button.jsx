/**
 *  @element Custom Button Element
 *  @param {Object} props
 *  @param {string} props.type
 *  @param {(event:Event) => void} props.onClickHandler
 *  @param {HTMLElement|string} props.children
 */
function Button({ type, onClickHandler, children }) {
  //   const { type, onClickHandler, children } = props;
  return (
    <button type={type} onClick={onClickHandler}>
      {children}
    </button>
  );
}

// (function () {
//   return <Button type={12} />;
// });

export default Button;
