const eventTracking = (eventName, data) => {
  console.log(`${eventName}${data ? `: ${data}` : ""}`);
};

export default eventTracking;
