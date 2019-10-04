import { createClient } from "contentful-management";
import { request } from "https";

var client = createClient({
  accessToken: process.env.REACT_APP_CONTENT_MANAGEMENT_API
});

// const sendNotification = (newRequest, property) => {
//   client
//     .getSpace(process.env.REACT_APP_CONTENTFUL_SPACE)
//     .then(space => space.getEntry(property.sys.id))
//     .then(property => {
//       property.fields.notifications = {
//         "en-US": [
//           {
//             sys: {
//               type: "Link",
//               linkType: "Entry",
//               id: newRequest.sys.id
//             }
//           }
//         ]
//       };
//       console.log(property);
//       return property.update();
//     })
//     .then(entry => {
//       console.log(`Entry ${entry.sys.id} updated.`);
//       return entry.publish();
//     })
//     .then(entry => console.log("NEW ENTRY", entry))
//     .catch(e => console.error(e));
// };

const postTenantRequest = (request, property) => {
  client
    .getSpace(process.env.REACT_APP_CONTENTFUL_SPACE)
    .then(space => space.createEntry("notification", request))
    .then(entry => entry.publish())
    .then(entry => {
      // TODO: Send success notification
      console.log("New Notification Created>>>", entry);
      // sendNotification(entry, property);
    })
    .catch(e => {
      // TODO: Send error notification
      console.error(e);
    });
};

export const buildRequest = (property, values) => {
  const date = new Date();
  const request = {
    fields: {
      date: { "en-US": date.toLocaleString() },
      type: { "en-US": ["request"] },
      creator: {
        "en-US": {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: property.fields.tenant[0].sys.id
          }
        }
      },
      property: {
        "en-US": {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: property.sys.id
          }
        }
      },
      subject: {
        "en-US": `New request: ${values.requestType}`
      },
      message: {
        "en-US": values.details
      },
      archived: {
        "en-US": false
      }
    }
  };

  postTenantRequest(request, property);
};
