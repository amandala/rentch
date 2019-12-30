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

const createEmailTemplate = (
  creator,
  recipient,
  property,
  response,
  status,
  details
) => {
  return {
    reply_to: creator.fields.email,
    to_name: recipient.fields.name,
    to_email: recipient.fields.email,
    property_name: property.fields.name,
    message: response.fields.message["en-US"],
    subject: response.fields.subject["en-US"],
    status: status,
    details: details,
    creator_role: creator.fields.role
  };
};

export const sendRequestUpdateEmail = (
  property,
  response,
  status,
  creator,
  repairOwner
) => {
  const details = getDetails(status, creator);

  const tenantEmail = createEmailTemplate(
    creator,
    property.fields.tenant[0],
    property,
    response,
    status,
    details
  );

  const managerEmail = createEmailTemplate(
    creator,
    property.fields.manager,
    property,
    response,
    status,
    details
  );

  const landlordEmail = createEmailTemplate(
    creator,
    property.fields.landlord,
    property,
    response,
    status,
    details
  );

  const service_id = "default_service";
  const template_id = "managerResponse";
  const user_id = "user_MsiQ3UxI8JGshxx5VNpt5";

  if (creator.fields.role === "manager") {
    emailjs.send(service_id, template_id, tenantEmail, user_id);
    emailjs.send(service_id, template_id, landlordEmail, user_id);
  } else if (creator.fields.role === "landlord") {
    if (status === "repair-owner") {
      emailjs.send(service_id, template_id, tenantEmail, user_id);
    }
    if (status === "repair-rentch") {
      emailjs.send(service_id, template_id, tenantEmail, user_id);
      emailjs.send(service_id, template_id, managerEmail, user_id);
    }
  } else if (creator.fields.role === "tenant") {
    if (status === "followup" || status === "fixed") {
      if (repairOwner === "landlord") {
        emailjs.send(service_id, template_id, landlordEmail, user_id);
      }
      if (repairOwner === "manager") {
        emailjs.send(service_id, template_id, managerEmail, user_id);

        if (status === "fixed") {
          emailjs.send(service_id, template_id, landlordEmail, user_id);
        }
      }
    }
  }
};
