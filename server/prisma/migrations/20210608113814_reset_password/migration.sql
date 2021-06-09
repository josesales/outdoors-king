-- CreateTable
CREATE TABLE "password-reset" (
    "id" INTEGER NOT NULL,
    "code" INTEGER NOT NULL,
    "user" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "password-reset" ADD FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
