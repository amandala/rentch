import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

const useRedirectOnInvalidState = () => {
  let history = useHistory();

  const { isAuthenticated, loading } = useAuth0();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      history.push("/login");
    }
  }, [isAuthenticated, history, loading]);
};

export default useRedirectOnInvalidState;
