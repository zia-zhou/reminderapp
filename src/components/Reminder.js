import React from 'react'
import 'bulma/css/bulma.min.css';
import {  useEffect, useRef } from 'react';
import addNotification from 'react-push-notification';
import doorbell from '../assets/doorbell-1.wav';
import harp from '../assets/dream-harp-01.mp3';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import silent from '../assets/silent.mp3';
export const Reminder = ({ reminder, deleteReminder, setEdit }) => {
  const timeoutIdRef = useRef(null);
  const soundMap = {
    'no sound': silent,
    doorbell: doorbell,
    harp: harp,
  };
  const selectedSound = soundMap[reminder.sound];
  const audio = new Audio(selectedSound);

  useEffect(() => {
    const [hours, minutes] = reminder.time.split(':');
    const reminderTime = new Date();
    reminderTime.setHours(Number(hours), Number(minutes), 0, 0);
    const now = new Date();
    const delay = reminderTime.getTime() - now.getTime();
  
    let id;
  
    if (delay > 0) {
      id = setTimeout(() => {
        console.log('Time has passed');
        if (reminder.browserNotification) {
          addNotification({
            title: 'Reminder',
            message: `Reminder to ${reminder.text}`,
            theme: 'darkblue',
            native: true,
          });
        }
        audio.play();
        setTimeout(() => {
          
          audio.pause();
          
          deleteReminder(reminder.id);
        }, 1000);
      }, delay);
    } else {
     
      setTimeout(() => {
       
        if (reminder.browserNotification) {
          addNotification({
            title: 'Reminder',
            message: `Reminder to ${reminder.text}`,
            theme: 'darkblue',
            native: true,
          });
        }
        audio.play();
        setTimeout(() => {
         
          audio.pause();
          
          deleteReminder(reminder.id);
        }, 1000);
      }, 3);
    }
  
    return () => {
      if (id !== null) {
        clearTimeout(id);
        console.log(`Reminder with ID ${reminder.id} will unmount`);
      }
    };
  }, [reminder.time, reminder.browserNotification, reminder.sound]);

 
  const convertToNonMilitaryTime = (militaryTime) => {
    const [hours, minutes] = militaryTime.split(':');
    let period = 'AM';
    let nonMilitaryHours = parseInt(hours, 10);
  
    if (nonMilitaryHours >= 12) {
      period = 'PM';
      if (nonMilitaryHours > 12) {
        nonMilitaryHours -= 12;
      }
    }
  
    return `${nonMilitaryHours}:${minutes} ${period}`;
  };

  const nonMilitaryTime = convertToNonMilitaryTime(reminder.time);

  const cleanUpReminder = () => {
    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
    }
    deleteReminder(reminder.id);
  };
   
  return (
    <div className="reminder-item box" style={{ marginBottom: '10px' }}>
    <div className="is-flex is-align-items-center">
      <div>
        <h3>{reminder.text}</h3>
        <h3>{nonMilitaryTime}</h3>
      </div>
      <div className="reminder__buttons ml-auto">
        <FaEdit onClick={() => setEdit(reminder)} className="mr-2" />
        <MdDelete onClick={() => cleanUpReminder()} />
      </div>
    </div>
  </div>
        
  )
}