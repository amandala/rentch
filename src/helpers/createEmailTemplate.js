import getPrettyRequestType from "./getPrettyRequestType";

const getEmailSubject = (property, type, recipient, repairOwner, status) => {
  const followup = `${property.fields.name}: The tenant still needs help`;
  const closed = `${property.fields.name}: The ${type} request has been closed`;
  const managerRepair = `${property.fields.name}:  The landlord has requested help from Rentch for the ${getPrettyRequestType(
    type
  ).toLowerCase()}`;
  const landlordRepair = `${property.fields.name}: The ${getPrettyRequestType(
    type
  ).toLowerCase()} will be handled by your landlord`;

  switch (status){
    case "followup":
      return followup;
    case "closed":
      return closed;
    case "repair":
      if(recipient.fields.role === "tenant"){
        if (repairOwner === "manager") {
          return managerRepair;
        }
        return landlordRepair;
      }
      else if(recipient.fields.role === "manager") {
        return managerRepair
      }
  }
}

const createEmailTemplate = (
  creator,
  recipient,
  property,
  notification,
  status,
  details,
  type,
  repairOwner
) => {
  return {
    reply_to: creator.fields.email,
    to_name: recipient.fields.name,
    to_email: recipient.fields.email,
    property_name: property.fields.name,
    message: notification.fields.message["en-US"],
    subject: getEmailSubject(property, type, recipient, repairOwner, status),
    status: status,
    details: details,
    creator_role: creator.fields.role
  };
};

export default createEmailTemplate;
