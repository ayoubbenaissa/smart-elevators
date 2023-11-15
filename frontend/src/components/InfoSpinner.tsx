import spinner from "../assets/icon-spinner.png";
import "../styles/Spinner.scss";

export const InfoSpinner = ({ infoText }: { infoText: string }) => {
  return (
    <div className="spinner-page">
      <div className="spinner-page_content">
        <h2>{infoText}</h2>
        <img src={spinner} className="spinner" alt="spinner" />
      </div>
    </div>
  );
};
