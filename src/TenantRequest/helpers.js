export const createRequest = (property, values) => {
  const date = new Date();
  var id = date.getTime();

  const request = {
    fields: {
      id: id,
      date: date.toLocaleString(),
      type: "request",
      creator: {
        "en-US": {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: property.fields.tenant[0].sys.id
          }
        }
      },
      recipients: [
        {
          "en-US": {
            sys: {
              type: "Link",
              linkType: "Entry",
              id: property.fields.tenant[0].sys.id
            }
          }
        },
        {
          "en-US": {
            sys: {
              type: "Link",
              linkType: "Entry",
              id: property.fields.landlord.sys.id
            }
          }
        },
        {
          "en-US": {
            sys: {
              type: "Link",
              linkType: "Entry",
              id: property.fields.manager.sys.id
            }
          }
        }
      ],
      subject: `New request: ${values.requestType}`,
      message: values.details,
      archived: false
    }
  };

  return request;
};
