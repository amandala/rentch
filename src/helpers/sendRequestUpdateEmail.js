import emailjs from "emailjs-com";

const getDetails = (status, creator, repairOwner) => {
  if (creator.fields.role === "tenant") {
    if (status === "followup") {
      return "The tenant has reported the repair was unsuccessful and requires follow-up. You can choose to do the follow-up repair yourself, or send Rentch to do the repair. Either way, you can let the tenant know your decision by logging into the Rentch dahsboard and selecting either 'I'll fix it' or 'Send Rentch'.";
    }
    if (status === "fixed") {
      return "The request was marked as complete and has been moved to the archive. You can still view the details of the request in your Rentch dashboard.";
    }
  }
  if (creator.fields.role === "landlord") {
    if (repairOwner === "landlord") {
      return `The property owner will handle the required request. ${creator
        .fields.name} will be in contact with you shortly to coordinate.`;
    }
    if (repairOwner === "manager") {
      return "Sit back and relax. Rentch is going to manage your request! We will be in touch soon to coordinate.";
    }
  }
  if (creator.fields.role === "manager") {
    if (status === "fixed") {
      return "Rentch has marked the request as completed. If you are still experiencing issues, please visit the Rentch dashboard and make another request.";
    }
  }
};

export const sendRequestUpdateEmail = (
  property,
  response,
  status,
  creator,
  repairOwner
) => {
  // if creator is MANAGER and
  // send to tenant
  // send to landlord
  // if creator is LANDLORD
  // if status is repair-owner
  // send to tenant
  // if status is repair-rentch
  // send to tenant
  // send to manager
  // if creator is TENANT
  // if status is followup
  // if repairOwner is landlord
  // send to landlord
  // if repairOwner is manager
  // send to manager
  // if status is fixed
  // if repairOwner is landlord
  // send to landlord
  // if repairOwner is manager
  // send to manager
  // send to landlord

  const template_params = {
    reply_to: creator.fields.email,
    to_name: property.fields.tenant[0].fields.name,
    to_email: property.fields.tenant[0].fields.email,
    property_name: property.fields.name,
    message: response.fields.message["en-US"],
    subject: response.fields.subject["en-US"],
    status: status,
    details: getDetails(status, creator),
    creator_role: creator.fields.role
  };

  const service_id = "default_service";
  const template_id = "managerResponse";
  const user_id = "user_MsiQ3UxI8JGshxx5VNpt5";
  emailjs.send(service_id, template_id, template_params, user_id);
};
