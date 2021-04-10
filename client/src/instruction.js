import React, { Component, useEffect, useState } from "react";
import axios from "axios";

export default function Instruction(props) {
  const [galleryItems, setGalleryItems] = useState({});
  useEffect(()=>{
    const getData = () => {
      axios
        .get(`http://localhost:2000/api/instructions`, {})
        .then((res) => {
          const data = res.data;
          const p = data.map((m) => <h3> {m.Instruction_text} </h3>);
          setGalleryItems({
            galleryItems: p,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getData();
  });

  return (
    <div >

    </div>
  );
}
