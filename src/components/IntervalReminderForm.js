import React, { useState } from 'react';

const ReminderForm = ({ addReminder, onClose }) => {
    const [reminderText, setReminderText] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedSound, setSelectedSound] = useState('default');
    const [isBrowserNotification, setIsBrowserNotification] = useState(false);
    const [repeatMinutes, setRepeatMinutes] = useState('');

    const handleRepeatChange = (e) => {
      setRepeatMinutes(e.target.value);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
     
      console.log(`Repeat every ${repeatMinutes} minutes`);
    };
    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };
    const handleSoundChange = (e) => {
        setSelectedSound(e.target.value);

    };
    const handleSubmit = (e) => {
        e.preventDefault();



        addReminder(reminderText)

        setReminderText('');


    };  
    const handleCheckboxChange = () => {
        setIsBrowserNotification(!isBrowserNotification);
        
      };

    return (
        <div className="column is-one-third">



            <div className="box">
                <div class="field">
                    <label class="label">Reminder</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Reminder Input" />
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
            <label className="label">Repeat Task Every X Minutes </label>
            <div className="control">
              <input
                className="input"
                type="number"
                min="1"
                placeholder="Enter minutes"
                value={repeatMinutes}
                onChange={handleRepeatChange}
                required
              />
            </div>
          </div>
          
        
  
                <div class="field">
                    <label class="label">Sound</label>
                    <div class="control">
                        <div class="select">
                            <select value={selectedSound} onChange={handleSoundChange}>
                                <option>Default</option>
                                <option>Doorbell</option>
                                <option>Buzz</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <label class="checkbox">
                            <input
                                type="checkbox"
                                checked={isBrowserNotification}
                                onChange={handleCheckboxChange}
                            />

                            <span style={{ marginLeft: '0.5em' }}>I want Browser Notifications</span>
                        </label>
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <button className="button is-primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReminderForm;
