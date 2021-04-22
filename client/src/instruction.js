import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import './instruction.css';

export default function Instruction(props) {
  const [galleryItems, setGalleryItems] = useState({});
  useEffect(()=>{
    const getData = () => {
      axios
        .get(`http://localhost:2000/api/instructions`, {})
        .then((res) => {
          console.log(res);
          if(res.status == 200){
            setData(res.data);
          } else {
            console.log(res);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if(data.length == 0){
      getData();
    }
  });

  const [data, setData] = useState([]);

  const carouselImages = [
    // {img: '/images/a3rad.png', caption: 'ارشادات'},
    // {img: '/images/image.jpg', caption: 'ارشادات'},
    {img: '/images/Palestina2.jpg', caption: 'ارشادات'},
    // {img: '/images/instruction00.png', caption: 'ارشادات'},
    {img: '/images/instruction00.jpg', caption: 'ارشادات'},
    // {img: '/images/instruction123.png', caption: 'ارشادات'},
    {img: '/images/instruction123.jpg', caption: 'ارشادات'},
    {img: '/images/irshadat2.png', caption: 'ارشادات'},
    {img: '/images/irshadat3.jpg', caption: 'ارشادات'},
    {img: '/images/irshadat4.jpg', caption: 'ارشادات'},
    // {img: '/images/irshadat.png', caption: 'ارشادات'},
  ]

  // console.log(carouselImages);

  return (
    <main >
      {/* <!--Carousel Wrapper--> */}
      <div id="carousel-example-1z" class="carousel slide carousel-fade" data-ride="carousel">
          {/* <!--Indicators--> */}
          <ol className="carousel-indicators">
              {carouselImages.map((item, index)=>{
                return(<li data-target="#carousel-example-1z" data-slide-to="index" key={index}></li>)
              })}
          </ol>
          {/* <!--/.Indicators--> */}
          {/* <!--Slides--> */}
          <div className="carousel-inner" role="listbox">
              {carouselImages.map((item, index)=>{
                // console.log(item);
                return(
                  <div key={index} className={index == 0 ? 'carousel-item active' : 'carousel-item'} 
                    style={{background: `url(${item.img}) no-repeat cover;`}}
                  >
                    <img className="d-block w-100 carousel-image" alt={item.caption} 
                    src={item.img} />
                  </div>
                )
              })}
          </div>
          {/* <!--/.Slides--> */}
          {/* <!-- Controls--> */}
          <a class="carousel-control-prev" href="#carousel-example-1z" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carousel-example-1z" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
          </a>
          {/* <!--/.Controls --> */}
      </div>
      {/* <!--/.Carousel Wrapper--> */}
      <div className='instructions-text'>
        <h2>أرشادات هامة</h2>
        <ul>
          {data.map(x => (
            <li>{x.instruction_text}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
