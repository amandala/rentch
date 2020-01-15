import { createClient } from "contentful-management";
import { sendRequestUpdateEmail } from "./sendRequestUpdateEmail";

var client = createClient({
  accessToken: process.env.REACT_APP_CONTENT_MANAGEMENT_API
});

const postRequestUpdate = (
  notification,
  property,
  request,
  status,
  creator,
  repairOwner
) => {
  return Promise.resolve(
    client
      .getSpace(process.env.REACT_APP_CONTENTFUL_SPACE)
      .then(space => {
        return space
          .createEntry("notification", notification)
          .then(newNotification => {
            space
              .getEntry(request.sys.id)
              .then(requestToUpdate => {
                let ids = [];

                if (requestToUpdate.fields.notifications) {
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

                if (repairOwner === "manager") {
                  requestToUpdate.fields.repairOwner = {
                    "en-US": "manager"
                  };
                }

                if (repairOwner === "landlord") {
                  requestToUpdate.fields.repairOwner = {
                    "en-US": "landlord"
                  };
                }

                requestToUpdate.fields.notifications = allNotifications;
                requestToUpdate.fields.status["en-US"] = status;

                return requestToUpdate.update();
              })
              .then(requestToUpdate => requestToUpdate.publish())
              .then(updatedRequest => {
                sendRequestUpdateEmail(
                  property,
                  notification,
                  status,
                  creator,
                  repairOwner, request.fields.type
                );

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

export const sendRequestUpdate = (
  message,
  property,
  request,
  status,
  creator,
  repairOwner
) => {
  const date = new Date();
  const notification = {
    fields: {
      date: { "en-US": date.toLocaleString() },
      creator: {
        "en-US": {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: creator.sys.id
          }
        }
      },
      propertyId: { "en-US": property.sys.id },
      requestId: { "en-US": request.sys.id },
      subject: {
        "en-US": `Status updated to ${status} by ${creator.fields.name}`
      },
      message: {
        "en-US": message ? message : "No message was provided"
      },
      archived: {
        "en-US": false
      }
    }
  };

  return postRequestUpdate(
    notification,
    property,
    request,
    status,
    creator,
    repairOwner
  );
};
