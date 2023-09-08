import React from "react";
import RemoteExporter from "./RemoteExporter";

const _RemoteTwoTitle = () => {
  return <p>Hello from remote two!</p>;
};

const RemoteTwoTitle = () => (
  <RemoteExporter>
    <_RemoteTwoTitle />
  </RemoteExporter>
);

export default RemoteTwoTitle;
