import { initializeApp } from "firebase-admin/app";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import { failure, Result, success } from "@/common/types.js";
const app = initializeApp();

// decodedToken includes email, user_id, and other fields
export const verifyIdToken = async (
  idToken: string
): Promise<Result<DecodedIdToken>> => {
  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    return success(decodedToken);
  } catch (error) {
    console.error(error);
    return failure(JSON.stringify(error));
  }
};
