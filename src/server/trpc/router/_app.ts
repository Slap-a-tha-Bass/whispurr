import { router } from "../trpc";
import { authRouter } from "./auth";
import { messageRouter } from "./message";

export const appRouter = router({
  message: messageRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
