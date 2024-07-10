/* eslint-disable react/prop-types */

export default function Button({ type, handleClick, content }) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className="bg-slate-700 text-white px-4 rounded-md"
      onClick={handleClick}
    >
      {content}
    </button>
  );
}
