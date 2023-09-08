import React, { useEffect, useState } from "react";
import RemoteExporter from "./RemoteExporter";
import { Button } from "antd";

const _ComponentWithRenderErrored = () => {
  const [shouldError, setShouldError] = useState(false);

  useEffect(() => {
    if (shouldError) {
      throw new Error("BOOOOM!");
    }
  }, [shouldError]);

  return (
    <div>
      <Button onClick={() => setShouldError(true)}>
        Click this to trigger render error
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
