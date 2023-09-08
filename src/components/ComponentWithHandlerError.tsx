import React, { useEffect, useState } from "react";
import RemoteExporter from "./RemoteExporter";
import { useErrorBoundary } from "react-error-boundary";
import { Button } from "antd";

const _ComponentWithRenderErrored = () => {
  const { showBoundary } = useErrorBoundary();
  const handleClick = () => {
    try {
      // @ts-ignore
      // this will error. simulating an error on event handler
      JSON.parse({})
    } catch (error) {
      // shows error boundary
      showBoundary(error)
    }
  }

  return (
    <div>
      <Button onClick={handleClick}>
        Click this to trigger handler error
      </Button>
    </div>
  );
};

const ComponentWithRenderErrored = () => (
  <RemoteExporter>
    <_ComponentWithRenderErrored />
  </RemoteExporter>
);

export default ComponentWithRenderErrored;
