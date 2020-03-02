import React from "react";
import { useAuth0 } from "../../../react-auth0-spa";
import Link from "../../../components/Link";

import { HeadingLarge } from "../../../components/Type";
import PropertyDetails from "../../../components/PropertyDetails";

import Notifications from "../Notifications";

import styles from "./index.module.scss";

const ManagerHome = ({ properties }) => {
  const { user } = useAuth0();
  properties.forEach(property => console.log(property));

  return (
    <div className={styles.Home}>
      <div className={styles.Greeting}>
        <HeadingLarge>Welcome, {user.nickname}</HeadingLarge>
      </div>
      <div className={styles.Dashboard}>
        <div className={styles.Properties}>
          {properties.map(property => (
            <Link href={`/property/${property.sys.id}`}>
              <PropertyDetails userRole="manager" property={property} />
            </Link>
          ))}
        </div>
        <div>
          <Notifications properties={properties} />
        </div>
      </div>
    </div>
  );
};

export default ManagerHome;
