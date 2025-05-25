// lib/dataStore.js
let latestMessage = null;

export function setMessage(data) {
  latestMessage = data;
}

export function getMessage() {
  return latestMessage;
}
