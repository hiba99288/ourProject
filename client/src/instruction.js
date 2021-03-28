import React, {Component} from 'react';
import axios from 'axios'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import "./styles.css";
export default class Instruction extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      galleryItems: [],
    };
}
 getData (){
    axios.get(`http://localhost:2000/api/instructions`, {})
        .then(res => {
                const data = res.data
              const p = data.map(m => 
             <h3>    {m.Instruction_text} </h3> 
              )
              this.setState({
                galleryItems: p
              })
            }).catch((error) => {
                console.log(error)
            })
  }
  responsive = {
    0: { items: 1 },
    1024: { items: 2 },
  }
  componentDidMount() {
   this.getData()
}
  
  render() {
    return (
      <div style={{backgroundColor:"blue" ,height:"50px" ,color:"white"  }}>
        <AliceCarousel
        
        items={this.state.galleryItems}
        responsive={this.responsive}
        autoPlayInterval={1500}
        autoPlayDirection="ltr"
        autoPlay={true}
        infinite ={true}
        fadeOutAnimation={true}
        mouseTrackingEnabled={true}
        disableAutoPlayOnAction={true}
      />
      </div>
    )
  }
}
