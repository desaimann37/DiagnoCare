import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material';
import './banner.css'
import bannerbg from "../../assets/banner-bg4.png"
const data = [
    {
        img: bannerbg,
        title: 'First Slide',
        description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
      },
      {
        img: bannerbg,
        title: 'Second Slide',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        img: bannerbg,
        title: 'Third Slide',
        description: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
      },
]

const Banner = () => {
  return (
    <Carousel
    className='carousel'
    autoPlay = {true}
    animation='slide'
    indicators={false}
    navButtonsAlwaysVisible={true}
    cycleNavigation={true}
    navButtonsProps={{
        style:{
            backgroundColor:"#fff",
            color:"#494949",
            borderRadius:0,
            marginTop:-22,
            height:"100px"
        }
    }}  
    >
        {
            data.map((item,index)=>{
                return(

                    <>
                        <Paper key={index}>
            <div style={{ position: 'relative' }}>
              <img src={item.img} alt={item.title} className='banner_img' />
              <div className='item_container'>
                <h2 className='item_title'>{item.title}</h2>
                <p className='item_desc'>{item.description}</p><br/>
                <button type="submit" className="btn btn-primary item_button">
                  Register
                </button>
              </div>
            </div>
          </Paper>
                        {/* <img src={item.img} alt="" className='banner_img'/> */}
                    </>
                )
            })
        }
    </Carousel>
  )
}

export default Banner