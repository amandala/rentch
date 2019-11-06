import { createClient } from "contentful-management";
import { request } from "https";
import emailjs from "emailjs-com";

var client = createClient({
  accessToken: process.env.REACT_APP_CONTENT_MANAGEMENT_API
});

const postManagerResponse = (response, property, request) => {
  console.log("in POST", request);
  console.log("property", property);
  return Promise.resolve(
    client
      .getSpace(process.env.REACT_APP_CONTENTFUL_SPACE)
      .then(space => space.createEntry("notification", response))
      .then(entry => entry.publish())
      .then(entry => {
        const template_params = {
          reply_to: property.fields.manager.fields.email,
          to_name: property.fields.tenant[0].fields.name,
          to_email: property.fields.tenant[0].fields.email,
          property_name: property.fields.name,
          message: response.fields.message["en-US"],
          subject: response.fields.subject["en-US"]
        };

        const service_id = "default_service";
        const template_id = "managerResponse";
        const user_id = "user_MsiQ3UxI8JGshxx5VNpt5";
        emailjs.send(service_id, template_id, template_params, user_id);

        return entry;
      })
      .catch(e => {
        console.error(e);
        return { error: e };
      })
  );
};

export const buildManagerResponse = (values, property, notification) => {
  console.log("in BUILD", notification);
  const date = new Date();
  const response = {
    fields: {
      date: { "en-US": date.toLocaleString() },
      creator: {
        "en-US": {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: property.fields.manager.sys.id
          }
        }
      },
      propertyId: { "en-US": property.sys.id },
      requestId: { "en-US": notification.sys.id },
      subject: {
        "en-US": `Rentch has responded to your request`
      },
      message: {
        "en-US": values.response
      },
      archived: {
        "en-US": false
      }
    }
  };

  return postManagerResponse(response, property, notification);
};
