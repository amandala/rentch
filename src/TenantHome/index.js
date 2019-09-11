import React from "react";

import { useStateValue } from "../StateProvider";

import Property from "./Property";
import { HeadingMedium } from "../Heading";

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
        <div>
          <span>{date}</span>
          <span>{type}</span>
          <span>{subject}</span>
        </div>
      );
    });
  };

  return (
    <div>
      {filteredNotifications.length > 0 ? (
        <div>
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
