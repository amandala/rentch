import React from "react";
import { Redirect } from "react-router-dom";

import { useStateValue } from "../StateProvider";

import { Button } from "../Button";
import Property from "./Property";
import { HeadingMedium, HeadingLarge } from "../Heading";

import "./index.scss";

const ManagerHome = ({ properties }) => {
  const [{ userData }, dispatch] = useStateValue();

  const renderNotifications = properties => {
    const notifications = properties
      .flatMap(property => property.fields.notifications)
      .filter(notification => notification !== undefined);

    console.log(notifications);

    if (notifications.length) {
      return (
        <div className="Notifications">
          <HeadingMedium>You have new notifications</HeadingMedium>
          {notifications.map(notification => {
            const { date, type, subject } = notification.fields;
            return (
              <div className="Notification">
                <span>{date}</span>
                <span>{type}</span>
                <span>{subject}</span>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="ManagerHome">
      <div className="ManagerGreeting">
        <HeadingLarge>Welcome, {userData.givenName}</HeadingLarge>
      </div>

      {renderNotifications(properties)}

      <div>
        {properties.map(property => (
          <Property property={property} />
        ))}
      </div>
    </div>
  );
};

export default ManagerHome;
