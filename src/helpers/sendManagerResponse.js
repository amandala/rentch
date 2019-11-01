import { createClient } from "contentful-management";
import { request } from "https";
import emailjs from "emailjs-com";

var client = createClient({
  accessToken: process.env.REACT_APP_CONTENT_MANAGEMENT_API
});

const postManagerResponse = (response, property, notification) => {
  return Promise.resolve(
    client
      .getSpace(process.env.REACT_APP_CONTENTFUL_SPACE)
      .then(space => space.createEntry("notification", response))
      .then(entry => entry.publish())
      .then(entry => {
        const template_params = {
          reply_to: property.fields.manager.fields.email,
          to_name: notification.fields.creator.fields.name,
          to_email: notification.fields.creator.fields.email,
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
  const date = new Date();
  const request = {
    fields: {
      date: { "en-US": date.toLocaleString() },
      type: { "en-US": ["response"] },
      creator: {
        "en-US": {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: property.fields.manager.sys.id
          }
        }
      },
      parentNotification: {
        "en-US": {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: notification.sys.id
          }
        }
      },
      propertyId: { "en-US": property.sys.id },
      subject: {
        "en-US": `Rentch has responded to your request`
      },
      message: {
        "en-US": values.response
      },
      archived: {
        "en-US": false
      },
      requestAcknowledged: { "en-US": true }
    }
  };

  return postManagerResponse(request, property, notification);
};
