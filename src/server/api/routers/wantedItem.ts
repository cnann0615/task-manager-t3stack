import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

// Procedureの定義//////////////////////////////////////////////

export const wantedItemRouter = createTRPCRouter({
  // 欲しい物を取得
  read: protectedProcedure.query(({ ctx }) => {
    return db.wantedItem.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),

  // 欲しい物を追加
  create: protectedProcedure
    .input(z.object({ name: z.string(), price: z.number(), url: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return db.wantedItem.create({
        data: {
          userId: ctx.session.user.id,
          name: input.name,
          price: input.price,
          url: input.url,
        },
      });
    }),

  // 欲しい物の更新
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        price: z.number(),
        url: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return db.wantedItem.update({
        where: { id: input.id },
        data: {
          name: input.name,
          price: input.price,
          url: input.url,
        },
      });
    }),

  // 欲しい物の削除
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return db.wantedItem.delete({
        where: { id: input.id },
      });
    }),
});
