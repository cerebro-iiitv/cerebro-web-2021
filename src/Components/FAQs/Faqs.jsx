import React from 'react';
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import "./Faqs.scss";

const Faqs = ()=>{
    return(
        <>
            <Header />
            <div className="faqs">
                <div className="faqs__title">
                    <span>FAQ -FREQUENTLY ASKED QUESTIONS</span>
                </div>
                <div className="faqs__body">
                    <div>
                        <div className="faqs__question">
                            <span>Who can register in the festival?</span>
                        </div>
                        <div className="faqs__answer">
                            <p>Anyone currently pursuing an undergraduate degree from any institution in india, 
                                across all streams is eligible to participate in Cerebro 2021
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="faqs__question">
                            <span>Are there any participation fees?</span>
                        </div>
                        <div className="faqs__answer">
                            <p>You can participate free of cost! There is absolutely no participation fees.
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="faqs__question">
                            <span>How do I register for events?</span>
                        </div>
                        <div className="faqs__answer">
                            <p>You can register in any event using the registration button on the events page. 
                                Team registrations will require a leader to generate a team code and members to join using this code.
                            </p>
                        </div>
                    </div>            
                    <div>
                        <div className="faqs__question">
                            <span>Do I need any documentary proof to register for events?</span>
                        </div>
                        <div className="faqs__answer">
                            <p>Yes. We will require a scanned copy of your ID card, along with the official institute/university email address issued to you. 
                                In case you do not have an institute/university email address, 
                                you will be required to send an email from any person having a valid institute/university 
                                email address to
                                <a href="mailto:cerebro@iiitv.ac.in" className="faqs__links"> cerebro@iiitv.ac.in </a>
                                confirming that you are a student of the institution.
                            </p>
                        </div>
                    </div>  
                    <div>
                        <div className="faqs__question">
                            <span>Why do I need to join the discord server?</span>
                        </div>
                        <div className="faqs__answer">
                            <p>All communication like match fixtures, submission forms and more will be communicated through discord server only and there are dedicated channels for queries between participants and organizers
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="faqs__question">
                            <span>How many events can I participate in?</span>
                        </div>
                        <div className="faqs__answer">
                            <p>You can participate in all events! 
                                We have not set any cap on the number of events you can participate in, and win too!
                            </p>
                        </div>
                    </div>     
                    <div>
                        <div className="faqs__question">
                            <span>Do we have a Campus Ambassador Program this year?</span>
                        </div>
                        <div className="faqs__answer">
                            <p>Unfortunately we do not have a campus ambassador program this year, 
                                but we will surely be having one next time!
                            </p>
                        </div>
                    </div>             
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Faqs;
