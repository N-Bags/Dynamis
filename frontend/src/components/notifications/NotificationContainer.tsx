import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import NotificationItem from './NotificationItem';

const NotificationContainer: React.FC = () => {
  const notifications = useSelector((state: RootState) => state.notifications.notifications);

  return (
    <div className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 z-50">
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

export default NotificationContainer; 