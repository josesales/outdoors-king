-- AlterTable
CREATE SEQUENCE "cart_id_seq";
ALTER TABLE "cart" ALTER COLUMN "id" SET DEFAULT nextval('cart_id_seq');
ALTER SEQUENCE "cart_id_seq" OWNED BY "cart"."id";

-- AlterTable
CREATE SEQUENCE "cart-item_id_seq";
ALTER TABLE "cart-item" ALTER COLUMN "id" SET DEFAULT nextval('cart-item_id_seq');
ALTER SEQUENCE "cart-item_id_seq" OWNED BY "cart-item"."id";

-- AlterTable
CREATE SEQUENCE "item_id_seq";
ALTER TABLE "item" ALTER COLUMN "id" SET DEFAULT nextval('item_id_seq');
ALTER SEQUENCE "item_id_seq" OWNED BY "item"."id";

-- AlterTable
CREATE SEQUENCE "password-reset_id_seq";
ALTER TABLE "password-reset" ALTER COLUMN "id" SET DEFAULT nextval('password-reset_id_seq');
ALTER SEQUENCE "password-reset_id_seq" OWNED BY "password-reset"."id";
