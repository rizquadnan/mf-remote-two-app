import { TUser, getCurrentUser } from "@/features/auth";
import { Button, Space } from "antd";
import React, { useState } from "react";
import RemoteExporter from "./RemoteExporter";
import { hello } from "@/features/hello";
import { THelloResponse } from "@/features/hello/type";

function RemoteTwoTestAuth() {
  const [authAPIRes, setAuthAPIRes] = useState<TUser>();
  const [publicAPIRes, setPublicAPIRes] = useState<THelloResponse>();
  const handleCallAuthAPI = async () => {
    try {
      const res = await getCurrentUser();
      setAuthAPIRes(res.data);
    } catch (error) {
      alert("Failed to get current user");
    }
  };

  const handleCallPublicAPI = async () => {
    try {
      const res = await hello();
      setPublicAPIRes(res.data);
    } catch (error) {
      alert("Failed to call public api");
    }
  };

  return (
    <Space direction="vertical">
      <Space direction="vertical">
        <Button onClick={handleCallAuthAPI}>Call Authenticated API</Button>
        {authAPIRes ? <pre>{JSON.stringify(authAPIRes)}</pre> : null}
      </Space>

      <Space direction="vertical">
        <Button onClick={handleCallPublicAPI}>Call public API</Button>
        {publicAPIRes ? <pre>{JSON.stringify(publicAPIRes)}</pre> : null}
      </Space>
    </Space>
  );
}

export default () => (
  <RemoteExporter>
    <RemoteTwoTestAuth />
  </RemoteExporter>
);
