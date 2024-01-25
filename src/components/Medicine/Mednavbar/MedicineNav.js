import React from 'react'
import './MedicineNav.css'

function MedicineNav() {
    return (
        <nav className="navigation">
            <ul className='d-flex'>
                <li><a  href="/">Diabetes</a></li>
                <li><a href="/">Cardiac Care</a></li>
                <li><a href="/">Stomach Care</a></li>
                <li><a href="/">Ayurvedic</a></li>
                <li><a href="/">Homeopathy</a></li>
                <li><a href="/">Fitness</a></li>
                <li><a href="/">Surgicals</a></li>
                <li><a href="/">Treatments</a></li>
                <li><a href="/">Skin Care</a></li>
                <li><a href="/">Personal Care</a></li>
            </ul>
        </nav>
    )
}

export default MedicineNav
