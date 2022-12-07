import { z } from "zod";
import { messageSchema } from "../../../components/createMessage";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const messageRouter = router({
  create: protectedProcedure.input(messageSchema).mutation(({ ctx, input }) => {
    const { prisma } = ctx;
    const { text } = input;
    const userId = ctx.session.user.id;
    return prisma.message.create({
      data: {
        text,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }),
  timeline: publicProcedure
    .input(
      z.object({
        where: z
          .object({
            author: z.object({
              name: z.string().optional(),
            }).optional(),
          })
          .optional()
          .optional(),
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { cursor, limit, where } = input;
      const messages = await prisma.message.findMany({
        take: limit + 1,
        where,
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          likes: {
            where: {
              authorId: ctx.session?.user?.id,
            },
            select: {
              authorId: true,
            },
          },
          author: {
            select: {
              name: true,
              image: true,
              id: true,
            },
          },
          _count: {
            select: {
              likes: true,
            },
          },
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (messages.length > limit) {
        const nextItem = messages.pop() as typeof messages[number];
        nextCursor = nextItem.id;
      }

      return {
        messages,
        nextCursor,
      };
    }),
  like: protectedProcedure
    .input(
      z.object({
        messageId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session.user.id;
      const { prisma } = ctx;

      return prisma.like.create({
        data: {
          message: {
            connect: {
              id: input.messageId,
            },
          },
          author: {
            connect: {
              id: authorId,
            },
          },
        },
      });
    }),
  unlike: protectedProcedure
    .input(
      z.object({
        messageId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session.user.id;
      const { prisma } = ctx;

      return prisma.like.delete({
        where: {
          messageId_authorId: {
            messageId: input.messageId,
            authorId,
          },
        },
      });
    }),
});
