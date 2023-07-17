import React from "react";

export interface ErrorMsgProps {
  err: string;
  lead: string;
}

const ErrorMsg: React.FC<ErrorMsgProps> = (props: ErrorMsgProps) => {
  const _lead = props.lead ?? "Error:";

  return (
    <div className="error popup">
      {_lead}
      <textarea defaultValue={props.err}></textarea>
    </div>
  );
};
export default ErrorMsg;
