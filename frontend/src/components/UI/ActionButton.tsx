import { ButtonClickEvent } from "../Auth/types";

import "../../styles/ActionButton.scss";

export interface ActionButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  buttonText: string;
  buttonType?: string;
  clickAction: (e: ButtonClickEvent) => void | Promise<void>;
}

export const ActionButton = ({ buttonText, buttonType = "primary", clickAction, ...props }: ActionButtonProps) => {
  return (
    <button aria-label={buttonText} data-testid="action-btn" {...props} className={props.className ? `btn ${buttonType} ${props.className}` : `btn ${buttonType}`} onClick={clickAction}>
      {buttonText}
    </button>
  );
};
