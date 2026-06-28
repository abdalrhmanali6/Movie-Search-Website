import { useNavigate } from "react-router-dom";
import StateMessage from "../components/StateMessage";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <StateMessage
      variant="not-found"
      title="Page not found"
      message="This cinema hall does not exist, or the link may have changed."
      actionLabel="Back Home"
      onAction={() => navigate("/")}
      className="min-h-[70vh]"
    />
  );
};

export default NotFound;
