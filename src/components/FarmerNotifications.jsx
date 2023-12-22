import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

const NotificationReceiver = () => {
  const [notifications, setNotifications] = useState([]);
  const farmerId = localStorage.getItem('user._id'); // Assuming 'user._id' is stored in local storage

  useEffect(() => {
    const pusher = new Pusher('e62190959c311715130f', {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe('my-channel'); // Replace with your actual channel name

    channel.bind('my-event', (data) => { // Replace with your actual event name
      console.log('Received notification:', data);
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });

    return () => {
      pusher.unsubscribe('my-channel'); // Replace with your actual channel name
    };
  }, []);

  return (
    <div>
      <h2>Notification Receiver</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationReceiver;
