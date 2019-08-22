import React from "react";
import { getPropertyGreeting } from "../helpers/user";

const Property = ({ property }) => {
  const getImgUrl = photo => photo.fields.file.url.split("//")[1];

  return (
    <div>
      <h2>
        {getPropertyGreeting(property)} {property.fields.name}
      </h2>
      {property.fields.photos.map(photo => (
        <img
          style={{ width: "333px", height: "auto" }}
          src={`https:${photo.fields.file.url}`}
        />
      ))}
    </div>
  );
};

export default Property;
