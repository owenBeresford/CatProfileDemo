import React from "react";

import { nextId } from "../services/util";

export interface ErrorMsgProps {
  err: string;
  lead: string | null;
}

const ErrorMsg: React.FC<ErrorMsgProps> = (props: ErrorMsgProps) => {
  const _lead = props.lead ? props.lead : "Error:";

  return (
    <div className="error popup" data-testid={nextId()}>
      {_lead}
      <textarea readOnly defaultValue={props.err}></textarea>
    </div>
  );
};

export default ErrorMsg;
