import { createClient } from "contentful-management";
import { request } from "https";
import { sendRequestUpdateEmail } from "./sendRequestUpdateEmail";
import { stat } from "fs";

var client = createClient({
  accessToken: process.env.REACT_APP_CONTENT_MANAGEMENT_API
});

const postRequestUpdate = (response, property, request, status) => {
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

                if (requestToUpdate.fields.notifications) {
                  ids = requestToUpdate.fields.notifications[
                    "en-US"
                  ].map(notification => {
                    return notification.sys.id;
                  });
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
                sendRequestUpdateEmail(property, response, status);

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

const getSubject = (status, type, propertyName) => {
  switch (status) {
    case "fixed":
      return `${propertyName}: ${type} request - has been fixed`;
    case "followup":
      return `${propertyName}: ${type} request - requires follow-up`;
    case "repair-rentch":
      return `${propertyName}: ${type} request - will be handled by Rentch`;
    case "repair-owner":
      return `${propertyName}: ${type} request - will be handled by the property owner`;
  }
};

export const sendRequestUpdate = (
  values,
  property,
  request,
  status,
  creatorId
) => {
  const date = new Date();
  const response = {
    fields: {
      date: { "en-US": date.toLocaleString() },
      creator: {
        "en-US": {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: creatorId
          }
        }
      },
      propertyId: { "en-US": property.sys.id },
      requestId: { "en-US": request.sys.id },
      subject: {
        "en-US": getSubject(
          status,
          request.fields.type,
          request.fields.property.fields.name
        )
      },
      message: {
        "en-US": values.response ? values.response : "No message was provided"
      },
      archived: {
        "en-US": false
      }
    }
  };

  return postRequestUpdate(response, property, request, status);
};
