// Always export remote components with this component
// This component handles:
// 1. render error
// 2. event handler error
// 3. logging to remote app's sentry

import { Button } from "antd";
import React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

type TRemoteExporter = {
  children: React.ReactNode;
  fallbackComponent?: (props: FallbackProps) => React.ReactNode;
  onError?: () => void;
};
const RemoteExporter = (props: TRemoteExporter) => {
  const handleError = (e: Error, info: React.ErrorInfo) => {
    // log to this remote app's sentry not to host app's sentry
    console.log("logged error from remote-two");
    console.log("error: ", e);
    console.log("info: ", info);
  };

  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => {
        if (props.fallbackComponent) {
          return props.fallbackComponent({ error, resetErrorBoundary });
        } else {
          return (
            <div>
              {error instanceof Error ? (
                <div>
                  <p>Error name: {error.name}</p>
                  <p>Error message: {error.message}</p>
                </div>
              ) : null}
              <Button onClick={resetErrorBoundary}>Reset Component</Button>
            </div>
          );
        }
      }}
      onError={props.onError ?? handleError}
    >
      {props.children}
    </ErrorBoundary>
  );
};

export default RemoteExporter;
