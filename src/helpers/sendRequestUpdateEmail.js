import emailjs from "emailjs-com";

import getEmailDetails from "./getEmailDetails";
import createEmailTemplate from "./createEmailTemplate";

export const sendRequestUpdateEmail = (
  property,
  notification,
  status,
  creator,
  repairOwner,type
) => {
  const service_id = "default_service";
  const template_id = "managerResponse";
  const user_id = "user_MsiQ3UxI8JGshxx5VNpt5";

  const details = getEmailDetails(status, creator, repairOwner);

  const tenantEmail = createEmailTemplate(
    creator,
    property.fields.tenant[0],
    property,
    notification,
    status,
    details,
    type, 
    repairOwner
  );

  const managerEmail = createEmailTemplate(
    creator,
    property.fields.manager,
    property,
    notification,
    status,
    details,
    type,
    repairOwner
  );

  const landlordEmail = createEmailTemplate(
    creator,
    property.fields.landlord,
    property,
    notification,
    status,
    details,
    type,
    repairOwner
  );

  if (creator.fields.role === "manager") {
    emailjs.send(service_id, template_id, tenantEmail, user_id);
    emailjs.send(service_id, template_id, landlordEmail, user_id);
  } else if (creator.fields.role === "landlord") {
    if (repairOwner === "landlord") {
      emailjs.send(service_id, template_id, tenantEmail, user_id);
    }
    if (repairOwner === "manager") {
      emailjs.send(service_id, template_id, tenantEmail, user_id);
      emailjs.send(
        service_id,
        template_id,
        {
          ...managerEmail,
          details:
            "Rentch is now in charge of the request. Please contact the tenant to coordinate."
        },
        user_id
      );
    }
  } else if (creator.fields.role === "tenant") {
    if (status === "followup" || status === "fixed") {
      if (repairOwner === "landlord") {
        emailjs.send(service_id, template_id, landlordEmail, user_id);
      }
      if (repairOwner === "manager") {
        emailjs.send(
          service_id,
          template_id,
          {
            ...managerEmail,
            details:
              "The tenant has reported the repair was unsuccessful and requires follow-up."
          },
          user_id
        );

        if (status === "fixed") {
          emailjs.send(service_id, template_id, landlordEmail, user_id);
        }
      }
    }
  }
};
