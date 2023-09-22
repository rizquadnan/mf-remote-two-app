import { TUser, getCurrentUser } from "@/features/auth";
import { Button, Space } from "antd";
import React, { useState } from "react";
import RemoteExporter from "./RemoteExporter";

function RemoteTwoTestAuth() {
  const [authAPIRes, setAuthAPIRes] = useState<TUser>();
  const handleCallAuthAPI = async () => {
    try {
      const res = await getCurrentUser();
      setAuthAPIRes(res.data);
    } catch (error) {}
  };

  return (
    <>
      <Space direction="vertical">
        <Button onClick={handleCallAuthAPI}>Call Authenticated API</Button>
        {authAPIRes ? <div>{JSON.stringify(authAPIRes)}</div> : null}
      </Space>

      <Space direction="vertical">
        <Button>Call public API</Button>
      </Space>
    </>
  );
}

export default () => (
  <RemoteExporter>
    <RemoteTwoTestAuth />
  </RemoteExporter>
);
