const getDetails = (status, creator, repairOwner) => {
  let details = "DETAILS";
  if (creator.fields.role === "tenant") {
    if (status === "new") {
      details =
        "The tenant has submitted a new repair request. You can choose to manage the repair yourself, or send Rentch! You can view details of the request including any photo attachments the tenant provided in the Rentch dashboard.";
    }
    if (status === "followup") {
      details =
        "The tenant has reported the repair was unsuccessful and requires follow-up. You can choose to do the follow-up repair yourself, or send Rentch to do the repair. Either way, you can let the tenant know your decision by logging into the Rentch dahsboard and selecting either 'I'll fix it' or 'Send Rentch'.";
    }
    if (status === "fixed") {
      details =
        "The request was marked as complete and has been moved to the archive. You can still view the details of the request in your Rentch dashboard.";
    }
  }
  if (creator.fields.role === "landlord") {
    if (repairOwner === "landlord") {
      details = `The property owner will handle the request. ${creator.fields.name} will be in contact with you shortly to coordinate.`;
    }
    if (repairOwner === "manager") {
      details =
        "Sit back and relax. Rentch is going to manage your request! We will be in touch soon to coordinate.";
    }
  }
  if (creator.fields.role === "manager") {
    if (status === "fixed") {
      details =
        "Rentch has marked the request as completed. If you are still experiencing issues, please visit the Rentch dashboard and make another request.";
    }
  }

  return details;
};

export default getDetails;
