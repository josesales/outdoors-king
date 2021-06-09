/*
  Warnings:

  - You are about to drop the `item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cart-item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_category_fkey";

-- DropForeignKey
ALTER TABLE "cart-item" DROP CONSTRAINT "cart-item_cart_fkey";

-- DropForeignKey
ALTER TABLE "cart-item" DROP CONSTRAINT "cart-item_item_fkey";

-- DropTable
DROP TABLE "item";

-- DropTable
DROP TABLE "cart-item";

-- CreateTable
CREATE TABLE "cart-product" (
    "id" SERIAL NOT NULL,
    "cart" INTEGER NOT NULL,
    "product" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "category" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product" ADD FOREIGN KEY ("category") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart-product" ADD FOREIGN KEY ("cart") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart-product" ADD FOREIGN KEY ("product") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
