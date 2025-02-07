export type Success<T> = {
  success: true;
  value: T;
};
export type Failure = {
  success: false;
  error: string;
};
export type Result<T> = Success<T> | Failure;

export function success<T>(value: T): Success<T> {
  return { success: true, value };
}

export function failure(error: string): Failure {
  return { success: false, error };
}
