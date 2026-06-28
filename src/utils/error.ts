type ServerError = {
  status_message?: string;
  message?: string;
  status_code?: number;
};

export const getErrorMessage = (error: unknown) => {
  if (!error) return "Something went wrong. Please try again.";

  if (typeof error === "string") return error;

  if (error instanceof Error) return error.message;

  if (typeof error === "object") {
    const serverError = error as ServerError;
    return (
      serverError.status_message ??
      serverError.message ??
      "The server could not complete this request."
    );
  }

  return "Something went wrong. Please try again.";
};
