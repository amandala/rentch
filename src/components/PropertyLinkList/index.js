import React from "react";
import Link from "../Link";
import PropertyDetails from "../PropertyDetails";

const PropertyLinkList = data => {
  const { properties } = data;
  return (
    <>
      {properties.map(property => (
        <Link key={property.sys.id} href={`/property/${property.sys.id}`}>
          <PropertyDetails userRole="manager" property={property} />
        </Link>
      ))}
    </>
  );
};

export default PropertyLinkList;
