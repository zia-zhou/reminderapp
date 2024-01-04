import React, { useState } from 'react';

const ReminderEdit = ({editReminder, onClose, selectedReminder }) => {
    const [reminderText, setReminderText] = useState(selectedReminder.text);
    const [selectedTime, setSelectedTime] = useState(selectedReminder.time);
    const [selectedSound, setSelectedSound] = useState(selectedReminder.sound);
    const [isBrowserNotification, setIsBrowserNotification] = useState(selectedReminder.browserNotification);
    

    const handleTextChange = (e) => { 
        setReminderText(e.target.value)
    }

  
    
    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };
    const handleSoundChange = (e) => {
        setSelectedSound(e.target.value);

    };
    const handleSubmit = (e) => {
        e.preventDefault();


        const reminder = {
            id: selectedReminder.id, 
            text: reminderText,
            time: selectedTime,
            sound: selectedSound,
            browserNotification: isBrowserNotification,
          };
        editReminder(reminder.id, reminder)

        setReminderText('');
        setIsBrowserNotification(false);
        setSelectedSound('default');
        setSelectedTime('');
        onClose();

    };  
    const handleCheckboxChange = () => {
        setIsBrowserNotification(!isBrowserNotification);
        
      };

      

    return (
        <div className="column is-one-third">



            <div className="box">
                <div className="field">
                    <label className="label">Reminder</label>
                    <div className="control">
                        <input className="input" type="text" value={reminderText} onChange = {handleTextChange}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">
                        Time:
                        <div className="control">
                            <input
                                className="input"
                                type="time"
                                value={selectedTime}
                                onChange={handleTimeChange}
                                pattern="[0-9]{2}:[0-9]{2}"
                                
                                required
                            />
                        </div>
                    </label>
                </div>
                
        
          
        
  
                <div className="field">
                    <label className="label">Sound</label>
                    <div className="control">
                        <div className="select">
                            <select value={selectedSound} onChange={handleSoundChange}>
                               
                                <option>doorbell</option>
                                <option>harp</option>
                                <option>no sound</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="checkbox">
                            <input
                                type="checkbox"
                                checked={isBrowserNotification}
                                onChange={handleCheckboxChange}
                            />

                            <span style={{ marginLeft: '0.5em' }}>I want Browser Notifications</span>
                        </label>
                    </div>
                </div>

                <div class="field is-grouped">
              
              <div className="control">
                  <button className="button is-primary" type="submit" onClick={handleSubmit}>
                      Submit
                  </button>
              </div>
        
          
              <div className="control">
                  <button className="button is-link is-light" type="submit" onClick={onClose}>
                      Cancel
                  </button>
              </div>
          
          </div>

            </div>
        </div>
    );
};

export default ReminderEdit;
