-- CreateTable
CREATE TABLE "cart" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart-product" (
    "id" TEXT NOT NULL,
    "cart" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(500) NOT NULL,
    "token" VARCHAR(1000),
    "profile" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password-reset" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "user" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile.name_unique" ON "profile"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user.email_unique" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user.token_unique" ON "user"("token");

-- CreateIndex
CREATE UNIQUE INDEX "passwordResetKey" ON "user"("id", "name", "email");

-- CreateIndex
CREATE UNIQUE INDEX "password-reset.user_unique" ON "password-reset"("user");

-- AddForeignKey
ALTER TABLE "password-reset" ADD FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart-product" ADD FOREIGN KEY ("cart") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart-product" ADD FOREIGN KEY ("product") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD FOREIGN KEY ("category") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD FOREIGN KEY ("profile") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
