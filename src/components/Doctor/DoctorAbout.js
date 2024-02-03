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
const DoctorAbout = ({ doctor }) => {
    return (
        <div>
            <h3 style={{ fontSize: "20px", fontWeight: "600" }}>About of
                <Name>{doctor.doctorName}</Name>
            </h3>
            <Section>
                {doctor.about}
            </Section>
            <h3 style={{ fontSize: "20px", fontWeight: "600", marginTop: "40px" }}>
                Education
            </h3>
            <Section>
                {
                    doctor.education?.map((edu, idx) => {
                        return (
                            <div key={idx} style={{ display: "flex", justifyContent: "space-between" }}>
                                <div style={{ marginTop: "10px" }}>
                                    <p style={{ color: "blue", fontSize: "14px", lineHeight: "1px" }}>{edu.startdate} - {edu.enddate}</p>
                                    <p style={{ fontWeight: "500" }}>{edu.speciality}</p>
                                </div>
                                <div style={{ margin: "auto 0", fontSize: "15px" }}>
                                    {edu.institution}
                                </div>

                            </div>
                        )
                    })
                }
            </Section>
            <h3 style={{ fontSize: "20px", fontWeight: "600", marginTop: "40px" }}>
                Experience
            </h3>
            <Section>
                {
                    doctor.experience?.map((exp , idx)=>{
                        return (
                            <div key={idx} style={{
                                marginBottom: "10px", display: "inline-block",
                                minWidth: "200px",
                                padding: "5px", borderRadius: "10px", marginRight: "50px"
                            }}>
                                <div style={{ marginTop: "10px" }}>
                                    <div style={{ fontSize: "14px" }}>{exp.startdate} - {exp.enddate}</div>
                                    <div style={{ fontWeight: "500" }}>{exp.service}</div>
                                </div>
                                <div style={{ margin: "auto 0", fontSize: "15px" }}>
                                    {exp.hospital}
                                </div>
            
                            </div>
                        )
                    })
                }
            </Section>

        </div>
    )
}

export default DoctorAbout
