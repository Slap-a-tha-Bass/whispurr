import type { Message } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import UseScrollPosition from "../hooks/useScrollPosition";
import type { RouterInputs } from "../utils/trpc";
import { trpc } from "../utils/trpc";
import CreateMessage from "./createMessage";
import WhispurrMessage from "./message";

const LIMIT = 10;

export default function Timeline({
  classNames,
  where = {},
  hideCreateMessage,
}: {
  classNames?: string;
  where?: RouterInputs["message"]["timeline"]["where"];
  hideCreateMessage?: boolean;
}) {
  const { data, hasNextPage, fetchNextPage, isFetching } =
    trpc.message.timeline.useInfiniteQuery(
      {
        limit: LIMIT,
        where,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const scrollPosition = UseScrollPosition();
  useEffect(() => {
    if (scrollPosition > 90 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [scrollPosition, hasNextPage, isFetching, fetchNextPage]);

  const messages = data?.pages.flatMap((page) => page.messages) ?? [];
  const client = useQueryClient();
  return (
    <main className={`flex flex-col items-center justify-center ${classNames}`}>
      {!hideCreateMessage && <CreateMessage />}
      {messages.map(
        (
          message: Message & {
            author: { id: string; name: string | null; image: string | null };
          } & {
            _count: {
              likes: number;
            };
          } & {
            likes: {
              authorId: string;
            }[];
          }
        ) => (
          <WhispurrMessage
            key={message.id}
            message={message}
            client={client}
            input={{ where, limit: LIMIT }}
          />
        )
      )}
      {!hasNextPage && (
        <p className="text-center text-gray-300">No more messages</p>
      )}
    </main>
  );
}
