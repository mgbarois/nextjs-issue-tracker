import React, { PropsWithChildren } from "react";

const FormFieldError = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return <p className="text-red-600">{children}</p>;
};

export default FormFieldError;
