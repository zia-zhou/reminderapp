import React, { useEffect, useState } from "react";
import { Reminder } from "./Reminder";
import ReminderForm from "./ReminderForm";
import { v4 as uuidv4 } from "uuid";
import  ReminderEdit  from "./ReminderEdit";
import { createPortal } from "react-dom";
function ReminderWrapper()  {
  

  const [showForm, setShowForm] = useState(false);

  const[showEditingForm, setShowEditForm] = useState(false)
  
  const[selectedReminder, setSelectedReminder] = useState(null)
  
  const [reminders, setReminders] = useState(() => {
    const localValue = localStorage.getItem("items")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(reminders))
  }, [reminders])

   const setEdit = (reminder) => {
      setShowEditForm(true)
      setSelectedReminder(reminder)
      
   }
   
  const addReminders = (text,time,sound,browserNotification) => {
    setReminders([
      ...reminders,
      { id: uuidv4(), text: text, time:time, sound:sound, browserNotification:browserNotification },
    ]);

    
  }

  const deleteAll = () =>{
    setReminders([])
  }

  const deleteReminders = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  }

  const editReminders = (id, updatedReminder) => {
    console.log('reminder activated', id, updatedReminder.id, updatedReminder);
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id ? { ...reminder, ...updatedReminder } : reminder
      )
    );
  };
  

  
  
  const centeredStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  };

  return (
    <div className="reminderWrapper">
     <div className="has-text-centered mt-4">
      <h1 className="is-size-2">Reminders</h1>
     
    </div>
    <div className="has-text-centered mt-4">
      <button className="button is-info is-light mr-4" onClick={() => deleteAll()}>
        Delete All
      </button>
      <button className="button ml-3 is-info is-light" onClick={() => setShowForm(true)}>
        Add Reminder
      </button>
    </div>
      
     
      {showForm && createPortal(
         <div style={centeredStyle}> 
         <ReminderForm onClose={() => setShowForm(false)} addReminder={addReminders}  />,
      
         </div>,
           document.body
        
      )}
      {showEditingForm && createPortal(
          <div style={centeredStyle}> 
        <ReminderEdit onClose={() => setShowEditForm(false)} editReminder = {editReminders}selectedReminder = {selectedReminder} />,
        </div>,
           document.body
      )}


<div style={{ maxWidth: '600px', margin: '50px auto', maxHeight: '100px'}}>
{reminders.map((reminder) => (
      <Reminder key={reminder.id} reminder={reminder} deleteReminder={deleteReminders} setEdit = {setEdit}  />
    ))}
</div>


      
    
</div>

  );
};

export default ReminderWrapper