import React from 'react';
import {
  useParams,
  useNavigate,
  useLocation,
  Params,
  NavigateFunction,
  Location,
} from 'react-router-dom';

export interface RouterProps {
  params: Readonly<Params<string>>;
  navigate: NavigateFunction;
  location: Location;
}

export function withRouter(Component: React.ComponentType<any>) {
  function ComponentWithRouterProp(props: any) {
    let params = useParams();
    let navigate = useNavigate();
    let location = useLocation();

    return <Component {...props} router={{ params, navigate, location }} />;
  }

  return ComponentWithRouterProp;
}
