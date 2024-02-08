import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
    return(
        <div>
            <Header />
            <div className=" container col-md-5">
            <h3>สาาาาาวีดัดด</h3>
            <p className="title text-justify mt-4 md-4">xxxxxxxxxxxxxxxx </p>
            <h4 className="text-success">จาก KU Cafe</h4>
            </div>
            <Footer company = "KU" email = "tinnapob.c@ku.th"/>
            
                
        </div>
    )
}
export default About;