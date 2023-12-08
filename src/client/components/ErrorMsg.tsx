import React from "react";

import { nextId } from "../services/util";

/**
 * ErrorMsgProps
 * Interface for the properties that need to make an error
 * @public
 * @typedef ErrorMsgProps
 */
export interface ErrorMsgProps {
  err: string;
  lead: string | null;
}

/**
 * ErrorMsg
 * A component to display errors, I made this to simplify code else where.
 *
 * @param {ErrorMsgProps} props
 * @public
 */
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
