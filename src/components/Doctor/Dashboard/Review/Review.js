import React from 'react'
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, LayoutGroup } from "framer-motion";
import styled from 'styled-components';
const Star = styled('i')`
  color: gold;
`;

function Review() {
    return (
        <div>
            <LayoutGroup>
                <motion.div
                    className="CompactCard reviewcard"
                    style={{
                        background: "lightblue",
                        boxShadow: "0px 10px 20px 0px lightgrey",
                    }}
                >
                    <div className="radialBar">
                        <CircularProgressbar
                            value="85"
                            text='4.5'
                        />
                        <span>Excellent</span>
                    </div>
                    <div className="detail">
                        <span>
                            <Star className="fa-solid fa-star" />
                            <Star className="fa-solid fa-star" />
                            <Star className="fa-solid fa-star" />
                            <Star className="fa-solid fa-star" />
                            <Star className="fa fa-star-o" />
                        </span>
                        <span>Rating</span>
                    </div>
                </motion.div>
            </LayoutGroup>
        </div>
    )
}

export default Review
