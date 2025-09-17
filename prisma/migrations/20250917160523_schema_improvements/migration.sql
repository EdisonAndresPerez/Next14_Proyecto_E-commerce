/*
  Warnings:

  - You are about to drop the column `addressId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `addresses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `addresses` DROP FOREIGN KEY `addresses_userId_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `user_addresses` DROP FOREIGN KEY `user_addresses_userId_fkey`;

-- DropIndex
DROP INDEX `orders_addressId_fkey` ON `orders`;

-- DropIndex
DROP INDEX `user_addresses_userId_key` ON `user_addresses`;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `addressId`,
    ADD COLUMN `userAddressId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `category` ENUM('ps5', 'ps2', 'ps1', 'xbox', 'nintendo', 'pc', 'retro') NOT NULL,
    MODIFY `platform` ENUM('ps5', 'ps4', 'ps3', 'ps2', 'ps1', 'xbox_series_x', 'xbox_series_s', 'xbox_one', 'xbox_360', 'nintendo_switch', 'nintendo_3ds', 'pc', 'steam', 'epic_games') NOT NULL;

-- AlterTable
ALTER TABLE `user_addresses` ADD COLUMN `isDefault` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `addresses`;

-- CreateTable
CREATE TABLE `OrderAddress` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `address2` VARCHAR(191) NULL,
    `postalCode` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `countryId` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `OrderAddress_orderId_key`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_userAddressId_fkey` FOREIGN KEY (`userAddressId`) REFERENCES `user_addresses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderAddress` ADD CONSTRAINT `OrderAddress_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderAddress` ADD CONSTRAINT `OrderAddress_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
