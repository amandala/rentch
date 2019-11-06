import { createClient } from "contentful-management";
import { request } from "https";
import emailjs from "emailjs-com";

var client = createClient({
  accessToken: process.env.REACT_APP_CONTENT_MANAGEMENT_API
});

const postManagerResponse = (response, property, request) => {
  return Promise.resolve(
    client
      .getSpace(process.env.REACT_APP_CONTENTFUL_SPACE)
      .then(space => {
        return space
          .createEntry("notification", response)
          .then(newNotification => {
            space
              .getEntry(request.sys.id)
              .then(requestToUpdate => {
                requestToUpdate.fields.notifications = {
                  ["en-US"]: [
                    ...requestToUpdate.fields.notifications,
                    {
                      sys: {
                        type: "Link",
                        linkType: "Entry",
                        id: newNotification.sys.id
                      }
                    }
                  ]
                };
                requestToUpdate.fields.status["en-US"] = "repair";
                return requestToUpdate.update();
              })
              .then(requestToUpdate => requestToUpdate.publish())
              .catch(error => {
                console.log("Error updating request", error);
              });

            return newNotification;
          })
          .catch(error => console.log("Error creating entry", error));
      })
      .then(newNotification => newNotification.publish())
      .then(newNotification => {
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

        return newNotification;
      })
      .catch(e => {
        console.error(e);
        return { error: e };
      })
  );
};

export const buildManagerResponse = (values, property, request) => {
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
      requestId: { "en-US": request.sys.id },
      subject: {
        "en-US": `A repair has been scheduled for ${request.fields.property.fields.name}`
      },
      message: {
        "en-US": values.response
      },
      archived: {
        "en-US": false
      }
    }
  };

  return postManagerResponse(response, property, request);
};
