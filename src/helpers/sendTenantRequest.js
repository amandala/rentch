import { createClient } from "contentful-management";
import { request } from "https";
import emailjs from "emailjs-com";

var client = createClient({
  accessToken: process.env.REACT_APP_CONTENT_MANAGEMENT_API
});

const postTenantRequest = (request, property) => {
  return Promise.resolve(
    client
      .getSpace(process.env.REACT_APP_CONTENTFUL_SPACE)
      .then(space => space.createEntry("request", request))
      .then(entry => entry.publish())
      .then(entry => {
        const template_params = {
          reply_to: property.fields.tenant[0].fields.email,
          to_name: property.fields.manager.fields.name,
          to_email: property.fields.manager.fields.email,
          tenant_name: property.fields.tenant[0].fields.name["en-US"],
          property_name: property.fields.name,
          message: request.fields.message["en-US"],
          subject: `New ${request.fields.type["en-US"]} request at ${property.fields.name["en-US"]}`
        };

        const service_id = "default_service";
        const template_id = "tenantRequest";
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

export const buildTenantRequest = (property, values) => {
  const date = new Date();
  const request = {
    fields: {
      timestamp: { "en-US": date.getTime() },
      type: { "en-US": values.requestType },
      propertyId: { "en-US": property.sys.id },
      property: {
        "en-US": {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: property.sys.id
          }
        }
      },
      status: { "en-US": "new" },
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
