import React, { useState } from "react";
import { z } from "zod";
import { trpc } from "../utils/trpc";

export const messageSchema = z.object({
  text: z
    .string({
      required_error: "Message is required",
    })
    .min(5)
    .max(250),
});

export default function CreateMessage() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const utils = trpc.useContext();
  const { mutateAsync } = trpc.message.create.useMutation({
    onSuccess: () => {
      setText("");
      utils.message.timeline.invalidate();
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      messageSchema.parse({ text });
    } catch (error) {
      setError("An error occurred on submission.");
      return;
    }
    mutateAsync({ text });
  }
  const disabled = text.length < 5 || text.length > 250;
  return (
    <>
      {error && JSON.stringify(error)}
      <form
        className="flex w-full flex-col justify-center p-4"
        onSubmit={handleSubmit}
      >
        <label className="text-xs text-gray-500">{disabled ? "Must have at least 5 characters" : ""}</label>
        <textarea
          className={`w-full rounded-lg bg-transparent p-4 font-logo text-lg focus:border-transparent focus:outline-none focus:ring-2 ${
            disabled ? "ring-gray-400" : "ring-primary"
          }`}
          onChange={(e) => setText(e.target.value)}
          placeholder="Secrets make friends..."
        />
        <div className="mx-auto">
          <button
            className={`my-4 w-32 rounded-lg py-2 px-4 font-logo font-bold text-black ${
              disabled ? "bg-gray-400" : "bg-primary"
            }`}
            type="submit"
            disabled={disabled}
            onClick={() => {
              if (disabled) {
                alert("Message must be between 5 and 250 characters.");
              }
            }}
          >
            Whispurr
          </button>
        </div>
      </form>
    </>
  );
}
