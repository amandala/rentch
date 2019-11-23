import { createClient } from "contentful-management";
import { request } from "https";
import { sendRequestUpdateEmail } from "./sendRequestUpdateEmail";

var client = createClient({
  accessToken: process.env.REACT_APP_CONTENT_MANAGEMENT_API
});

const postTenantResponse = (response, property, request, status) => {
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
                let ids = [];
                if (requestToUpdate.fields.notifications["en-US"]) {
                  ids = requestToUpdate.fields.notifications["en-US"].map(
                    notification => {
                      return notification.sys.id;
                    }
                  );
                }

                const allNotifications = {
                  ["en-US"]: [
                    ...ids.map(id => {
                      return {
                        sys: {
                          type: "Link",
                          linkType: "Entry",
                          id: id
                        }
                      };
                    })
                  ]
                };

                allNotifications["en-US"].push({
                  sys: {
                    type: "Link",
                    linkType: "Entry",
                    id: newNotification.sys.id
                  }
                });

                requestToUpdate.fields.notifications = allNotifications;
                requestToUpdate.fields.status["en-US"] = status;
                return requestToUpdate.update();
              })
              .then(requestToUpdate => requestToUpdate.publish())
              .then(updatedRequest => {
                sendRequestUpdateEmail(property, response);
                return updatedRequest;
              })
              .catch(error => {
                console.log("Error updating request", error);
              });

            return newNotification.publish();
          })
          .catch(error => console.log("Error creating entry", error));
      })
      .then(newNotification => {
        return newNotification;
      })
      .catch(e => {
        console.error(e);
        return { error: e };
      })
  );
};

export const sendTenantResponse = (values, property, request, status) => {
  const date = new Date();
  const response = {
    fields: {
      date: { "en-US": date.toLocaleString() },
      creator: {
        "en-US": {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: property.fields.tenant[0].sys.id
          }
        }
      },
      propertyId: { "en-US": property.sys.id },
      requestId: { "en-US": request.sys.id },
      subject: {
        "en-US": `Update: ${request.fields.type} request at ${request.fields.property.fields.name} has been updated to ${status}`
      },
      message: {
        "en-US": values.response
      },
      archived: {
        "en-US": false
      }
    }
  };

  return postTenantResponse(response, property, request, status);
};
