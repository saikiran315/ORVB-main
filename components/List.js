import { React, useState } from "react";
import mechanics from "./mechanic.json";
import { GiAutoRepair } from "react-icons/gi";

function List(props) {
  const filteredData = mechanics["mechanics"].filter((el) => {
    if (props.input === "") {
      return el;
    } else {
      return (
        el.place.toLowerCase().includes(props.input) ||
        el.name.toLowerCase().includes(props.input)
      );
    }
  });
  return (
    <ul>
      {/* {filteredData.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))} */}
      <div className="p-4 md:p-12 text-center ">
        {filteredData.map((post, i) => (
          <div key={i} style={{ padding: 20, borderBottom: "1px solid #ccc" }}>
            {/* <GiAutoRepair size={20} /> */}
            <h2 className="text-xl font-bold p-6">{post.name}</h2>
            <p>{post.phone}</p>
            <p>{post.place}</p>
          </div>
        ))}
      </div>
    </ul>
  );
}

export default List;
