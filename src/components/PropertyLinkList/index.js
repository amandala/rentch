import React from "react";
import { Link } from "react-router-dom";
import PropertyDetails from "../PropertyDetails";

import styles from "./index.module.scss";

const PropertyLinkList = data => {
  const { properties } = data;
  return (
    <>
      {properties.map(property => (
        <Link
          className={styles.Link}
          key={property.sys.id}
          to={`/property/${property.sys.id}`}
        >
          <PropertyDetails userRole="manager" property={property} />
        </Link>
      ))}
    </>
  );
};

export default PropertyLinkList;
