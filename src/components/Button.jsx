import React from "react";

function Button({
  title = "",
  type = "submit",
  classname = ""
}) {
  return (
    <button type={type} className={`px-4 py-2 rounded-lg text-sm md:text-md ${classname}`}>
      {title}
    </button>
  );
}

export default Button;
