import emailjs from "emailjs-com";

export const sendRequestUpdateEmail = (property, response) => {
  const template_params = {
    reply_to: property.fields.manager.fields.email,
    to_name: property.fields.tenant[0].fields.name,
    to_email: property.fields.tenant[0].fields.email,
    property_name: property.fields.name,
    message: response.fields.message["en-US"],
    subject: response.fields.subject["en-US"]
  };

  const service_id = "default_service";
  const template_id = "managerResponse";
  const user_id = "user_MsiQ3UxI8JGshxx5VNpt5";
  emailjs.send(service_id, template_id, template_params, user_id);
};
