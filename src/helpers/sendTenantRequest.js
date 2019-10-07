import { createClient } from "contentful-management";
import { request } from "https";

var client = createClient({
  accessToken: process.env.REACT_APP_CONTENT_MANAGEMENT_API
});

const postTenantRequest = (request, property) => {
  return Promise.resolve(
    client
      .getSpace(process.env.REACT_APP_CONTENTFUL_SPACE)
      .then(space => space.createEntry("notification", request))
      .then(entry => entry.publish())
      .then(entry => {
        return entry;
      })
      .catch(e => {
        console.error(e);
        return { error: e };
      })
  );
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
      propertyId: { "en-US": property.sys.id },
      subject: {
        "en-US": `New ${values.requestType} request`
      },
      message: {
        "en-US": values.details
      },
      archived: {
        "en-US": false
      }
    }
  };

  return postTenantRequest(request, property);
};
