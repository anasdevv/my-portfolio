import React, { useState } from 'react';
import Typical from 'react-typical';
import axios from 'axios';
import { toast } from 'react-toastify';

import imgBack from '../../../src/images/mailz.jpeg';
import load1 from '../../../src/images/load2.gif';
import ScreenHeading from '../../utils/ScreenHeading/ScreenHeading';
import ScrollService from '../../utils/ScrollService';
import Animations from '../../utils/Animation';
import './ContactMe.css';

const api = axios.create({
  baseURL: 'http://localhost:8000', // your frontend URL
  proxy: {
    host: 'localhost',
    port: 8000, // your backend port
  },
});
export default function ContactMe(props) {
  let fadeInScreenHandler = (screen) => {
    if (screen.fadeInScreen !== props.id) return;
    Animations.animations.fadeInScreen(props.id);
  };

  const fadeInSubscription =
    ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [banner, setBanner] = useState('');
  const [bool, setBool] = useState(false);
  const clearBanner = () => {
    setError(null);
    setBanner('');
  };
  const handleName = (e) => {
    clearBanner();
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    clearBanner();
    setEmail(e.target.value);
  };
  const handleMessage = (e) => {
    clearBanner();
    setMessage(e.target.value);
  };
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      clearBanner();
      let data = {
        name,
        email,
        message,
      };
      setBool(true);
      const res = await api.post(`/contact`, data);
      if (name.length === 0 || email.length === 0 || message.length === 0) {
        setBanner(res.data.msg);
        toast.error(res.data.msg);
        setBool(false);
      } else if (res.status === 200) {
        setBanner(res.data.msg);
        toast.success(res.data.msg);
        setBool(false);

        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      setBool(false);
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="main-container " id={props.id || ''}>
      <ScreenHeading subHeading={'Lets Keep In Touch'} title={'Contact Me'} />
      <div className="central-form">
        <div className="col">
          <h2 className="title">
            <Typical loop={Infinity} steps={['Get In Touch 📧', 1000]} />
          </h2>{' '}
          <a href="https://www.facebook.com/anas.m.3517?mibextid=ZbWKwL">
            <i className="fa fa-facebook-square" />
          </a>
          <a href="https://github.com/anasdevv">
            <i class="fa fa-github" aria-hidden="true"></i>
          </a>
          <a href="https://instagram.com/annassss._?igshid=ZDdkNTZiNTM=">
            <i className="fa fa-instagram"></i>
          </a>
          <a href="https://twitter.com/anas1_dev?t=9rVgnrJPWNkD7OtvCZpKSw&s=09">
            <i className="fa fa-twitter"></i>
          </a>
        </div>
        <div className="back-form">
          <div className="img-back">
            <h4>Send Your Email Here!</h4>
            <img src={imgBack} alt=" not found" />
          </div>
          <form onSubmit={submitForm}>
            {banner !== '' && <p>{banner}</p>}
            {error && <p>{'some thing went wrong'}</p>}
            <label htmlFor="name">Name</label>
            <input
              type="text"
              onClick={clearBanner}
              onChange={handleName}
              value={name}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              onClick={clearBanner}
              onChange={handleEmail}
              value={email}
            />

            <label htmlFor="message">Message</label>
            <textarea
              type="text"
              onClick={clearBanner}
              onChange={handleMessage}
              value={message}
            />

            <div className="send-btn">
              <button type="submit">
                send
                <i className="fa fa-paper-plane" />
                {bool ? (
                  <b className="load">
                    <img src={load1} alt=" not responding" />
                  </b>
                ) : (
                  ''
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
