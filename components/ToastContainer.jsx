import React, { useEffect, useState } from 'react';
import TimeOutToast from './TimeOutToast';

//This component is a container for the logout toast. It performs two functions:
//1. Monitors user activity and sets the toast to appear after a given time
//2. Renders the inactivity toast after a set period, regardless of user activity
export default function ToastContainer({ user }) {
  const [expireTime, setExpireTime] = useState(0);
  const [hardLogout, setHardLogout] = useState(43200); // Update to set hard logout time 43200 = 12 hours
  const [showToast, setShowToast] = useState(false);

  const timeHandler = (time) => {
    setExpireTime(time);
  };

  const toastHandler = (displayToast) => {
    setShowToast(displayToast);
  };

  // Countdown timer for hard time-out period
  useEffect(() => {
    if (user?.updated_at) {
      const countdown = setInterval(() => {
        setHardLogout((prevTime) => prevTime - 1);
      }, 1000);

      if (user && hardLogout === 0) {
        setShowToast(true);
      }

      return () => {
        clearInterval(countdown);
      };
    }
  }, [hardLogout]);

  // Calculates logout expiration time based on user's last update
  useEffect(() => {
    if (user?.updated_at) {
      function getExpireTime(time) {
        const loginTime = new Date(user?.updated_at).getTime();
        const expireResult = loginTime + time;
        return expireResult;
      }
      setExpireTime(getExpireTime(3600000)); //Change this number to extend user inactivity lifetime before logout -  3600000 = 1 hour
    }
  }, [user]);

  // Update expireTime UseState variable to extend expiration time based on user inactivity
  useEffect(() => {
    function updateExpireTime() {
      setExpireTime(Date.now() + 3600000); //Change this number to extend user inactivity lifetime before logout -  3600000 = 1 hour
    }

    updateExpireTime();

    // Event listeners to control conditions under which expireTime UseState varibale updates
    window.addEventListener('click', updateExpireTime);
    window.addEventListener('keypress', updateExpireTime);
    window.addEventListener('scroll', updateExpireTime);
    window.addEventListener('mousemove', updateExpireTime);

    return () => {
      window.removeEventListener('click', updateExpireTime);
      window.removeEventListener('keypress', updateExpireTime);
      window.removeEventListener('scroll', updateExpireTime);
      window.removeEventListener('mousemove', updateExpireTime);
    };
  }, []);

  // Compare Usestate expireTime variable with current time, to determine user inactivity
  useEffect(() => {
    function checkForInactivity() {
      if (user && expireTime < Date.now()) {
        setShowToast(true);
      }
    }

    const interval = setInterval(() => {
      checkForInactivity();
    }, 5000);

    return () => clearInterval(interval);
  }, [expireTime]);

  return (
    <>
      {showToast && (
        <div className="w-full flex absolute">
          <TimeOutToast toastHandler={toastHandler} timeHandler={timeHandler} />
        </div>
      )}
    </>
  );
}
