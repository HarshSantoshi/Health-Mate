import React from 'react'
import styled from 'styled-components';
const Star = styled('i')`
  color: gold;
`;
const DoctorFeedback = () => {
    return (
        <div style={{ margin: "0 auto", maxWidth: "700px" }}>
            <h3>
                All Reviews (100)
            </h3>

            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", margin: "20px" }}>
                <div style={{ margin: "15px" }}>
                    <img style={{height : "40px" , width:"40px" , borderRadius:"50%"}} src='profile.png' alt='..' />
                </div>
                <div style={{ textAlign: "left", minWidth: "200px" }}>
                    <div style={{ fontWeight: "500" }}>Aditya Singh</div>

                    <div style={{ color: "blue", fontSize: "14px" }}>Jan 20 , 2024</div>

                    <div>Great Service 👌. Prompt Diagnosis of the disease</div>
                </div>
                <div>
                    <Star className="fa-solid fa-star" />
                    <Star className="fa-solid fa-star" />
                    <Star className="fa-solid fa-star" />
                    <Star className="fa-solid fa-star" />
                    <Star className="fa-solid fa-star" />
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", margin: "20px" }}>
                <div style={{ margin: "15px" }}>
                    <img style={{height : "40px" , width:"40px" , borderRadius:"50%"}} src='profile.png' alt='..' />
                </div>
                <div style={{ textAlign: "left", minWidth: "200px" }}>
                    <div style={{ fontWeight: "500" }}>Aditya Singh</div>

                    <div style={{ color: "blue", fontSize: "14px" }}>Jan 20 , 2024</div>

                    <div>Great Service 👌. Prompt Diagnosis of the disease</div>
                </div>
                <div>
                    <Star className="fa-solid fa-star" />
                    <Star className="fa-solid fa-star" />
                    <Star className="fa-solid fa-star" />
                    <Star className="fa-solid fa-star" />
                    <Star className="fa-solid fa-star" />
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", margin: "20px" }}>
            <div style={{ margin: "15px" }}>
                    <img style={{height : "40px" , width:"40px" , borderRadius:"50%"}} src='profile.png' alt='..' />
                </div>
                <div style={{ textAlign: "left", minWidth: "200px" }}>
                    <div style={{ fontWeight: "500" }}>Aditya Singh</div>

                    <div style={{ color: "blue", fontSize: "14px" }}>Jan 20 , 2024</div>

                    <div>Great Service 👌. Prompt Diagnosis of the disease</div>
                </div>
                <div>

                    <Star className="fa-solid fa-star" />
                    <Star className="fa-solid fa-star" />
                    <Star className="fa-solid fa-star" />
                    <Star className="fa-solid fa-star" />
                    <Star className="fa fa-star-o" />
                </div>
            </div>
            <div style={{ color: "blue", cursor: "pointer" }}>
                Show more...
            </div>
        </div>
    )
}

export default DoctorFeedback
