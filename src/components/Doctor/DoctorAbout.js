import React from 'react'
import styled from 'styled-components'
const Name = styled('span')`
color:blue;
margin-left : 10px;
`
const Section = styled('div')`
max-Width : 550px;
margin: 0 auto ;
text-align : justify;
`
const DoctorAbout = () => {
  return (
    <div>
      <h3 style={{fontSize:"20px" , fontWeight:"600"}}>About of 
      <Name>Harsh Santoshi </Name>
      </h3>
      <Section>
        Lrem ipson fas gjhe ae w aboutafe
        aefgg
        aefgsge
        ganfe wegh lqhf e qj fl ew
        Lrem 
        aefgsge
        ganfe wegh lqhf e qj fl ew
        Lre
        ipson fas gjhe ae w aboutafe
        aef
        aefgsge
        ganfe wegh lqhf e qj fl ew
        Lregg
        aefgsge
        ganfe wegh lqhf e qj fl ew
        Lrem ipson fas gjhe ae w aboutafe
        aefgg
        aefgsge
        ganfe wegh lqhf e qj fl ew
        Lrem ipson fas gjhe ae w aboutafe
        aefgg
        aefgsge
        ganfe wegh lqhf e qj fl ew
        Lrem ipson fas gjhe ae w aboutafe
      </Section>
      <h3 style={{fontSize:"20px" , fontWeight:"600" , marginTop:"40px"}}>
        Education
      </h3>
      <Section>
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style={{marginTop:"10px"}}>
                <p style={{color : "blue" , fontSize:"14px", lineHeight:"1px"}}>Jan 2012 - Mar 2016</p>
                <p style={{fontWeight:"500"}}>MBBS (MD)</p>
            </div>
            <div style={{margin:"auto 0" , fontSize:"15px"}}>
                Apollo Hospital , New Delhi
            </div>

        </div>
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style={{marginTop:"10px"}}>
                <p style={{color : "blue" , fontSize:"14px", lineHeight:"1px"}}>Jan 2012 - Mar 2016</p>
                <p style={{fontWeight:"500"}}>MBBS (MD)</p>
            </div>
            <div style={{margin:"auto 0" , fontSize:"15px"}}>
                Apollo Hospital , New Delhi
            </div>

        </div>
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style={{marginTop:"10px"}}>
                <p style={{color : "blue" , fontSize:"14px", lineHeight:"1px"}}>Jan 2012 - Mar 2016</p>
                <p style={{fontWeight:"500"}}>MBBS (MD)</p>
            </div>
            <div style={{margin:"auto 0" , fontSize:"15px"}}>
                Apollo Hospital , New Delhi
            </div>

        </div>
      </Section>
      <h3 style={{fontSize:"20px" , fontWeight:"600" , marginTop:"40px"}}>
        Experience
      </h3>
      <Section>
        <div style={{marginBottom:"10px" , backgroundColor:"#ef7b29" , display:"inline-block" ,
        minWidth:"200px" ,
        padding:"5px" , borderRadius:"10px" , color : "white" , marginRight:"50px"}}>
            <div style={{marginTop:"10px"}}>
                <div style={{color : "yellow" , fontSize:"14px"}}>Jan 2012 - Mar 2016</div>
                <div style={{fontWeight:"500"}}>MBBS (MD)</div>
            </div>
            <div style={{margin:"auto 0" , fontSize:"15px"}}>
                Apollo Hospital , New Delhi
            </div>

        </div>
        <div style={{marginBottom:"10px" , backgroundColor:"#ef7b29" , display:"inline-block" ,
        minWidth:"200px" ,
        padding:"5px" , borderRadius:"10px" , color : "white" , marginRight:"50px"}}>
            <div style={{marginTop:"10px"}}>
                <div style={{color : "yellow" , fontSize:"14px"}}>Jan 2012 - Mar 2016</div>
                <div style={{fontWeight:"500"}}>MBBS (MD)</div>
            </div>
            <div style={{margin:"auto 0" , fontSize:"15px"}}>
                Apollo Hospital , New Delhi
            </div>

        </div>
        <div style={{marginBottom:"10px" , backgroundColor:"#ef7b29" , display:"inline-block" ,
        minWidth:"200px" ,
        padding:"5px" , borderRadius:"10px" , color : "white" , marginRight:"50px"}}>
            <div style={{marginTop:"10px"}}>
                <div style={{color : "yellow" , fontSize:"14px"}}>Jan 2012 - Mar 2016</div>
                <div style={{fontWeight:"500"}}>MBBS (MD)</div>
            </div>
            <div style={{margin:"auto 0" , fontSize:"15px"}}>
                Apollo Hospital , New Delhi
            </div>

        </div>
      </Section>
      
    </div>
  )
}

export default DoctorAbout
