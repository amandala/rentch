import React from "react";

import { useStateValue } from "../StateProvider";

import Property from "./Property";
import { HeadingMedium } from "../Heading";

import "./index.scss";

const TenantHome = ({ property }) => {
  const [{ userData }, dispatch] = useStateValue();

  console.log(property);
  const allNotifications = property.fields.notifications;
  const filteredNotifications = allNotifications.filter(
    notification => notification.fields.creator.fields.email !== userData.email
  );

  const renderNotifications = () => {
    return filteredNotifications.map(notification => {
      console.log(notification);
      const { date, type, subject } = notification.fields;

      return (
        <div className="Notification">
          <span>{date}</span>
          <span>{type}</span>
          <span>{subject}</span>
        </div>
      );
    });
  };

  return (
    <div className="TenantHome">
      {filteredNotifications.length > 0 ? (
        <div className="Notifications">
          <HeadingMedium>You have new notifications</HeadingMedium>
          {renderNotifications()}
        </div>
      ) : null}
      <div>
        <Property property={property} />
      </div>
    </div>
  );
};

export default TenantHome;
