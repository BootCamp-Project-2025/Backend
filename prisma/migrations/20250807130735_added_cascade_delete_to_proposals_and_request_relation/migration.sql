-- DropForeignKey
ALTER TABLE "Proposal" DROP CONSTRAINT "Proposal_requestId_fkey";

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE CASCADE ON UPDATE CASCADE;
