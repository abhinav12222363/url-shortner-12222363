// Custom logging middleware
export function logEvent(eventName, data) {
  const log = {
    event: eventName,
    data: data,
    timestamp: new Date().toISOString(),
  };

  // Save logs in localStorage
  let logs = JSON.parse(localStorage.getItem("logs") || "[]");
  logs.push(log);
  localStorage.setItem("logs", JSON.stringify(logs));
}
