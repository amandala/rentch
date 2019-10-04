import { createClient } from "contentful-management";
import { request } from "https";

var client = createClient({
  accessToken: process.env.REACT_APP_CONTENT_MANAGEMENT_API
});

const postTenantRequest = request => {
  client
    .getSpace(process.env.REACT_APP_CONTENTFUL_SPACE)
    .then(space => space.createEntry("notification", request))
    .then(entry => entry.publish())
    .then(entry => console.log("New Entry>>>", entry))
    .catch(console.error);
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
      recipients: {
        "en-US": [
          {
            sys: {
              type: "Link",
              linkType: "Entry",
              id: property.fields.tenant[0].sys.id
            }
          },
          {
            sys: {
              type: "Link",
              linkType: "Entry",
              id: property.fields.landlord.sys.id
            }
          },
          {
            sys: {
              type: "Link",
              linkType: "Entry",
              id: property.fields.manager.sys.id
            }
          }
        ]
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

  postTenantRequest(request);
};
