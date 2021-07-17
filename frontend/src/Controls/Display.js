import React from "react";

import { useSelector } from "react-redux";

const Display = () => {
  let selection = useSelector((state) => state.AnswerReducer.answers);
  console.log("Selection****>", selection);

   const q = selection.map((item) => (
    <li key={item.id}>
      {item.Q}
      {"  "}
      {item.A}
    </li>
  ));
  const r = selection.some((ele) => ele.A === null);
  console.log("yes/no", r);
  //https://www.digitalocean.com/community/tutorials/7-ways-to-implement-conditional-rendering-in-react-applications
  return (
    <div>
      
      <ul>
        {(() => {
          if (!r) {
            return q;
          } else {
            return <p>Some or all answers are missing!</p>;
          }
        })()}
      </ul>
    </div>
  );
};
export default Display;
