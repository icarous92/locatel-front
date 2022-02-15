import { useEffect } from 'react';
import {useNavigate} from "react-router-dom";

export const AuthWrapper = props => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage['token'] && !localStorage['user']) navigate("/");
  }, [props.path, navigate]);

  return <>{props.children}</>;
};
