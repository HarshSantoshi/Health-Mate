import React from 'react'
import './About.css'
import Footer from '../Footer/Footer.js';

function About() {
    const cardsData = [
        {
            name: 'Harsh Santoshi',
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident ad illo assumenda quasi repellendus aliquam, quisquam dicta expedita odio minima delectus! Facilis inventore assumenda quidem soluta! Animi, fugit. Asperiores nulla earum blanditiis voluptate labore tenetur cum sit doloribus assumenda non.The lorem text the section that contains header with having open functionality. Lorem dolor sit amet consectetur adipisicing elit.',
            imageUrl: 'https://res.cloudinary.com/dgarsqfvl/image/upload/v1717068391/healthmate-images/Harsh_Passport_Size_photo_gc2h4j.jpg',
        },
        {
            name: 'Harsh',
            description: 'The lorem text the section that contains header with having open functionality. Lorem dolor sit amet consectetur adipisicing elit.',
            imageUrl: 'https://res.cloudinary.com/dgarsqfvl/image/upload/v1717068316/healthmate-images/Harsh_77_photo_rqnsdl.jpg',
        }
    ];
    return (
        <div>
        <div className='about'>
            <div className='app-about'>
                <h3 className="about-heading">About Our Website</h3>
                <p style={{ textAlign: "justify" , fontSize : "18px" }}>
                    Welcome to HealthMate, your comprehensive healthcare platform connecting patients with doctors seamlessly.

                    At HealthMate, we understand the importance of accessible and efficient healthcare services. Our platform serves as a one-stop solution for patients, offering a range of features to streamline their healthcare journey.

                    <div >
                    <strong>1) Book Appointments :</strong> HealthMate allows patients to conveniently schedule appointments with doctors of their choice. With just a few clicks, patients can book appointments for in-person consultations or online meetings, ensuring flexibility and convenience.
                    </div>

                    <div>
                    <strong>2) Online Consultations:</strong> Through our secure online platform, patients can have virtual consultations with doctors from the comfort of their homes. Our integrated video conferencing technology facilitates efficient communication between patients and doctors, enabling timely healthcare advice and support.
                    </div>

                    <div>
                    <strong>3) Live Chat:</strong> Need quick advice or have a query? HealthMate's live chat feature enables patients to engage in real-time conversations with doctors, allowing them to seek guidance on health-related issues anytime, anywhere.

                    </div>
                   <div>
                   <strong>4) Medicine Purchase:</strong> HealthMate goes beyond consultations by offering patients the convenience of purchasing prescribed medications directly from our platform. With access to a wide range of medicines at nominal prices, patients can easily fulfill their healthcare needs.
                   </div>

                    <div>
                    <strong>5) Doctor Dashboard:</strong> For healthcare professionals, HealthMate provides a dedicated dashboard to manage their profiles, appointments, and patient interactions efficiently. Doctors can stay organized and focused on delivering high-quality care to their patients.
                    </div>

                    At HealthMate, we are committed to bridging the gap between patients and doctors, empowering individuals to take control of their health with ease and confidence.

                    <div>
                    Join us in our mission to revolutionize healthcare delivery and experience the difference with HealthMate today.
                    </div>


                </p>
            </div>
            <div >
               <div className='about-heading'>
               About the Developers
               </div>
                <div className='app-about'>
                {cardsData.map((data, id) => {
                    return <div className="card-about" key={id}>
                        <div className="image-content">
                            <span className="overlay"></span>
                            <div className="card-image">
                                {data.imageUrl && <img src={data.imageUrl} alt={data.name} className="card-img" />}
                            </div>
                        </div>
                        <div className="card-content">
                            <h2 className="name">{data.name}</h2>
                            {/* <p className="description">{data.description}</p> */}
                            <div className="social">
                                <a href="https://www.linkedin.com/in/harsh-34b5161a0/" target='blank'><i className="fa-brands fa-linkedin-in"></i></a>
                                <a href="https://github.com/harsh809" target='blank'><i className="fa-brands fa-github"></i></a>
                            </div>
                        </div>
                    </div>
                })

                }
                </div>
            </div>
            
        </div>
        <Footer/>
        </div>
        
    )
}

export default About

