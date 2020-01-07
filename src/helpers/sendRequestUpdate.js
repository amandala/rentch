import { createClient } from "contentful-management";
import { sendRequestUpdateEmail } from "./sendRequestUpdateEmail";

var client = createClient({
  accessToken: process.env.REACT_APP_CONTENT_MANAGEMENT_API
});

const postRequestUpdate = (
  response,
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
          .createEntry("notification", response)
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
                  response,
                  status,
                  creator,
                  repairOwner
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

const getSubject = (status, type, propertyName, repairOwner) => {
  switch (status) {
    case "fixed":
      return `${propertyName}: ${type} request - has been fixed`;
    case "followup":
      return `${propertyName}: ${type} request - requires follow-up`;
    case "repair":
      if (repairOwner === "manager") {
        return `${propertyName}: The landlord has requested your help with a ${type} repair"
        }`;
      }
      return `${propertyName}: ${type} request - will be handled by ${
        repairOwner === "manager" ? "Rentch" : "your landlord"
      }`;
    default:
      return `There is new activity on the ${type} request at ${propertyName}`;
  }
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
  const response = {
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
        "en-US": getSubject(
          status,
          request.fields.type,
          request.fields.property.fields.name,
          repairOwner
        )
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
    response,
    property,
    request,
    status,
    creator,
    repairOwner
  );
};
