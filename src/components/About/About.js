import React from 'react'
import './About.css'

function About() {
    const cardsData = [
        {
            name: 'David Dell',
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident ad illo assumenda quasi repellendus aliquam, quisquam dicta expedita odio minima delectus! Facilis inventore assumenda quidem soluta! Animi, fugit. Asperiores nulla earum blanditiis voluptate labore tenetur cum sit doloribus assumenda non.The lorem text the section that contains header with having open functionality. Lorem dolor sit amet consectetur adipisicing elit.',
            imageUrl: 'logo.png',
        },
        {
            name: 'David Dell',
            description: 'The lorem text the section that contains header with having open functionality. Lorem dolor sit amet consectetur adipisicing elit.',
            imageUrl: 'logo.png',
        }
    ];
    return (
        <div className='about'>
            <div className='app-about'>
                <h3 className="heading">About</h3>
                <p style={{textAlign:"justify"}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit perspiciatis non, ratione dolorum aspernatur fuga doloribus voluptates necessitatibus quis! Quidem iusto minus ducimus vitae molestiae corrupti, ex, nam tempore obcaecati rem dolore, voluptas officiis assumenda consequuntur? Ipsa nam voluptatibus maiores fugiat ea laudantium odio fuga quis veritatis assumenda culpa animi accusantium magnam asperiores, facilis nemo ullam velit quibusdam cum? Culpa, adipisci! Itaque cumque, eos fugit, provident modi totam saepe, voluptas voluptatem dicta maiores autem? Aspernatur vel consequatur ipsam quis nulla dolor ab corrupti quas deleniti voluptate architecto dolorem eius eos exercitationem, beatae ipsum tenetur distinctio iure voluptas, laudantium optio mollitia tempora facilis. Repellat ab temporibus maiores unde architecto pariatur modi est, sint, consequatur totam iure facilis libero non adipisci repudiandae exercitationem quisquam minus laboriosam dolorum itaque commodi dicta possimus! Illo quas dolorum earum perspiciatis nulla nemo qui nam explicabo accusamus natus atque repudiandae neque, minima vitae dolor quo consequatur placeat ut debitis laudantium assumenda repellendus distinctio ducimus praesentium? Corporis nostrum repellat in blanditiis exercitationem earum libero eaque molestiae aperiam quaerat architecto quas hic ut quia, doloremque modi illo fuga explicabo temporibus officia dolores magnam ab aspernatur dolor? Ad dignissimos atque necessitatibus, magni explicabo incidunt ab, sunt fuga velit, rem optio?</p>
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
                            <p className="description">{data.description}</p>
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
    )
}

export default About

