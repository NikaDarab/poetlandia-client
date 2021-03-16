import React from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
// import { ContextsProvider } from "../../contexts/LanguageContext";
export default function PrivateRoute({ component, ...props }) {
  const Component = component;
  return (
    // <ContextsProvider>
    <Route
      {...props}
      render={(componentProps) => (
        <UserContext.Consumer>
          {(userContext) =>
            !!userContext.user.id ? (
              <Component {...componentProps} />
            ) : (
              <Redirect
                to={{
                  pathname: userContext.user.idle ? "/login" : "/register",
                  state: { from: componentProps.location },
                }}
              />
            )
          }
        </UserContext.Consumer>
      )}
    />
    // </ContextsProvider>
  );
}
