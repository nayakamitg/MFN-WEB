import React, { useEffect, useState } from 'react';
import "../assets/comingSoon.css";
import toast from 'react-hot-toast';
import NavbarComp from './Navbar';

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Set the launch date (e.g., 30 days from now)
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      });

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send this to your backend
      console.log('Email submitted:', email);
      toast.success('Thank you for subscribing!');
      setEmail('');
    } else {
      toast.error('Please enter a valid email address');
    }
  };
  return (
    <>
     <NavbarComp />
   
    <div className="coming-soon-container">
        
      <div className="coming-soon-content">
        <h1>Coming Soon</h1>
        <p>We're working hard to bring you something amazing!</p>
        <div className="timer">
          <div className="timer-item">
            <span>{timeLeft.days}</span>
            <p>Days</p>
          </div>
          <div className="timer-item">
            <span>{timeLeft.hours}</span>
            <p>Hours</p>
          </div>
          <div className="timer-item">
            <span>{timeLeft.minutes}</span>
            <p>Minutes</p>
          </div>
          <div className="timer-item">
            <span>{timeLeft.seconds}</span>
            <p>Seconds</p>
          </div>
        </div>
        <div className="newsletter">
          <h3>Get Notified When We Launch</h3>
          <form onSubmit={handleSubmit} className="email-input">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Notify Me</button>
          </form>
        </div>
      </div>
    </div>
     </>
  );
};

export default ComingSoon;
