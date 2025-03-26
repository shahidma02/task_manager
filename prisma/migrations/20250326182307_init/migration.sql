-- AddForeignKey
ALTER TABLE "Assigned" ADD CONSTRAINT "Assigned_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
