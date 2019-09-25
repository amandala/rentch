import React from "react";
import { Redirect } from "react-router-dom";

import { useStateValue } from "../StateProvider";

import { Button } from "../Button";
import Property from "./Property";
import { HeadingMedium, HeadingLarge } from "../Heading";

import "./index.scss";

const TenantHome = ({ property }) => {
  const [{ userData }, dispatch] = useStateValue();
  const [navigateToRequestForm, setNavigateToRequestForm] = React.useState();

  if (navigateToRequestForm) {
    return <Redirect to="/request" />;
  }

  const allNotifications = property.fields.notifications;
  const filteredNotifications = allNotifications.filter(
    notification => notification.fields.creator.fields.email !== userData.email
  );

  const renderNotifications = () => {
    return filteredNotifications.map(notification => {
      const { date, type, subject } = notification.fields;

      return (
        <div className="Notification" key={date}>
          <span>{date}</span>
          <span>{type}</span>
          <span>{subject}</span>
        </div>
      );
    });
  };

  return (
    <div className="TenantHome">
      <div className="TenantGreeting">
        <HeadingLarge>Welcome, {userData.givenName}</HeadingLarge>
        <Button onClick={() => setNavigateToRequestForm(true)}>Get Help</Button>
      </div>
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
