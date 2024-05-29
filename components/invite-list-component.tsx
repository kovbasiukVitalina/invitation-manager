"use client";

import LoadingComponent from "@/app/loading";
import { InviteProps } from "@/type";
import { useEffect, useState } from "react";
import InviteItemComponent from "./invite-item-component";

const InviteListComponent = () => {
  const [invites, setInvites] = useState<InviteProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getInvites() {
      const res = await fetch("/api/invites", { cache: "no-store" });
      const data = await res.json();
      setInvites(data);
      setLoading(false);
    }
    getInvites();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <ul className="mt-8">
          {invites.map((invite) => (
            <li key={invite.id}>
              <InviteItemComponent {...invite} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default InviteListComponent;
