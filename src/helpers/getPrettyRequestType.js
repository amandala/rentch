const getPrettyRequestType = type => {
  switch (type) {
    case "plumbing":
      return "Plumbing repair request";
    case "appliance":
      return "Appliance repair request";
    case "heat":
      return "Heating repair request";
    case "lease":
      return "Lease negotiation request";
    default:
      return "General request";
  }
};

export default getPrettyRequestType;
