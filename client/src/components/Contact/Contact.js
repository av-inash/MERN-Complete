import React from 'react'
// import "../css.module.css"
// import styles from './Contact.module.css';
import './Contact.scss'

const Contact = () => {
    return (
        <>
            {/* <div className={styles.componentContainer}> */}
            <div class="top-row">
                <div class="box">
                    <h2>Phone</h2>
                    <p>+919636202167</p>
                </div>
                <div class="box">
                    <h2>Email</h2>
                    <p>avinash.techwhiz@gmail.com</p>
                </div>
                <div class="box">
                    <h2>Address</h2>
                    <p>Banglore,Karnata</p>
                </div>
            </div>
            <div class="get-in-touch">
                <h2>Get In Touch</h2>
                <div class="input-row">
                    <input type="text" class="custom-input" placeholder="Name" />
                    <input type="email"class="custom-input" placeholder="Email" />
                    <input type="tel"class="custom-input" placeholder="Phone" />
                </div>
                <textarea placeholder="Message"></textarea>
                <button>Send Message</button>
            </div>
            


                    </>

                    )
}

export default Contact