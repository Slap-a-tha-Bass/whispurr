import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import type { RouterInputs, RouterOutputs } from "../utils/trpc";
import { trpc } from "../utils/trpc";
import ThumbsUp from "../icons/thumbs-up";
import ThumbsUpFilled from "../icons/thumbs-up-filled";
import type { InfiniteData, QueryClient } from "@tanstack/react-query";
import Link from "next/link";
import ForwardIcon from "../icons/forward";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "1m",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1M",
    MM: "%dM",
    y: "1y",
    yy: "%dy",
  },
});
export default function WhispurrMessage({
  message,
  client,
  input,
}: {
  message: RouterOutputs["message"]["timeline"]["messages"][number];
  client: QueryClient;
  input: RouterInputs["message"]["timeline"];
}) {
  const { author } = message;

  const likeMutation = trpc.message.like.useMutation({
    onSuccess: (data, variables) => {
      updateCache({
        client,
        data,
        variables,
        action: "like",
        input,
      });
    },
  }).mutateAsync;
  const unlikeMutation = trpc.message.unlike.useMutation({
    onSuccess: (data, variables) => {
      updateCache({
        client,
        data,
        variables,
        action: "unlike",
        input,
      });
    },
  }).mutateAsync;

  function updateCache({
    client,
    variables,
    data,
    action,
    input,
  }: {
    client: QueryClient;
    variables: {
      messageId: string;
    };
    data: {
      authorId: string;
    };
    action: "like" | "unlike";
    input: RouterInputs["message"]["timeline"];
  }) {
    client.setQueryData(
      [
        ["message", "timeline"],
        {
          input,
          type: "infinite",
        },
      ],
      (oldData) => {
        const newData = oldData as InfiniteData<
          RouterOutputs["message"]["timeline"]
        >;
        const value = action === "like" ? 1 : -1;
        const newMessages = newData.pages.map((page) => {
          return {
            messages: page.messages.map((message) => {
              if (message.id === variables.messageId) {
                return {
                  ...message,
                  likes: action === "like" ? [data.authorId] : [],
                  _count: {
                    likes: message._count.likes + value,
                  },
                };
              }
              return message;
            }),
          };
        });
        return {
          ...newData,
          pages: newMessages,
        };
      }
    );
  }
  return (
    <div className="mb-2 w-full border-b border-primary">
      <Link href={`/${message.author.name || null}`}>
        <div className="flex p-1 sm:p-4">
          {author.image && (
            <Image
              src={author.image}
              alt={`${author.name}'s profile picture`}
              height={50}
              width={50}
              className="rounded-full ring-2 ring-primary"
            />
          )}
          <div className="ml-4">
            <div className="flex items-center">
              <p className="text-bold">{author.name} </p>
              <p className="ml-2 text-xs text-gray-300">
                {dayjs(message.createdAt).fromNow()}
              </p>
            </div>
          </div>
        </div>
      </Link>

      <p className="ml-2 mt-4 sm:ml-8 sm:mt-4 flex items-start font-logo">
        <ForwardIcon /> {message.text}
      </p>

      <div className="flex items-center justify-end px-8 py-2">
        <button
          onClick={() => {
            if (message.likes.length > 0) {
              unlikeMutation({ messageId: message.id });
              return;
            }
            likeMutation({ messageId: message.id });
          }}
          className="mb-2 rounded-full bg-gray-700 p-1 text-primary"
        >
          {message.likes.length > 0 ? <ThumbsUpFilled /> : <ThumbsUp />}
        </button>
        <p className="ml-2 mb-2 text-sm text-gray-300">
          {message._count.likes || null}
        </p>
      </div>
    </div>
  );
}
