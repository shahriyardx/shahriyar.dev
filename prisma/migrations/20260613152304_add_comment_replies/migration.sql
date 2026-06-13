-- AlterTable
ALTER TABLE "comment" ADD COLUMN     "parentId" TEXT;

-- CreateIndex
CREATE INDEX "comment_parentId_idx" ON "comment"("parentId");

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
