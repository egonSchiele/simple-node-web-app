import firebasesdk from "../firebase-adminsdk.json" with { type: "json" };
const stringToEncode = firebasesdk.private_key;
const encodedString = btoa(stringToEncode);

console.log(encodedString);
