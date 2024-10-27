import React from "react";
import { getServerAuthSession } from "~/server/auth";
import Main from "../main/Main";
import SignOut from "../main/SignOut";
import TsumoLogList from "./components/TsumoLogList";
import WrapSessionProvider from "../components/WrapSessionProvider";
import { HydrateClient } from "~/trpc/server";
import HabitualWasteManagement from "./components/HabitualWasteManagement";

const page = async () => {
  const session = await getServerAuthSession();
  return (
    <main>
      {session ? (
        <div className="min-h-[calc(100vh-64px)]">
          <HydrateClient>
            <WrapSessionProvider>
              <div className="p- space-y-10 p-4">
                <HabitualWasteManagement />
                <TsumoLogList />
              </div>
            </WrapSessionProvider>
          </HydrateClient>
        </div>
      ) : (
        <SignOut />
      )}
    </main>
  );
};

export default page;
