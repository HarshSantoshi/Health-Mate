import React from "react";
import "./Card.css";
import "react-circular-progressbar/dist/styles.css";
import { motion, LayoutGroup } from "framer-motion";

function Card(props) {
    const Png = props.png;
    return (
        <LayoutGroup>
            <motion.div
                className="CompactCard"
                style={{
                    background: props.color.backGround,
                    boxShadow: props.color.boxShadow,
                }}
            >
                <div className="radial">
                    <span>{props.title}</span>
                </div>
                <div className="detail">
                    <Png />
                    <span>{props.value}</span>
                    <span>Last 24 hours</span>
                </div>
            </motion.div>
        </LayoutGroup>
    )
}

export default Card
