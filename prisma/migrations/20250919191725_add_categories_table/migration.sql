/*
  Warnings:

  - You are about to drop the column `category` on the `products` table. All the data in the column will be lost.
  - The values [pc,steam,epic_games] on the enum `products_platform` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `categoryId` to the `products` table without a default value. This is not possible if the table is not empty.

*/

-- First, create the categories table
CREATE TABLE `categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `displayName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `categories_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Insert default categories
INSERT INTO `categories` (`id`, `name`, `displayName`, `description`, `updatedAt`) VALUES
('cat-ps5', 'ps5', 'PlayStation 5', 'Juegos para PlayStation 5', NOW()),
('cat-ps2', 'ps2', 'PlayStation 2', 'Juegos para PlayStation 2', NOW()),
('cat-ps1', 'ps1', 'PlayStation 1', 'Juegos para PlayStation 1', NOW()),
('cat-xbox', 'xbox', 'Xbox', 'Juegos para Xbox', NOW()),
('cat-nintendo', 'nintendo', 'Nintendo', 'Juegos para Nintendo', NOW()),
('cat-pc', 'pc', 'PC', 'Juegos para PC', NOW()),
('cat-retro', 'retro', 'Retro', 'Juegos retro y vintage', NOW());

-- Add the categoryId column with a default value temporarily
ALTER TABLE `products` ADD COLUMN `categoryId` VARCHAR(191);

-- Update existing products to map their old category enum to new categoryId
UPDATE `products` SET `categoryId` = 'cat-ps5' WHERE `category` = 'ps5';
UPDATE `products` SET `categoryId` = 'cat-ps2' WHERE `category` = 'ps2';
UPDATE `products` SET `categoryId` = 'cat-ps1' WHERE `category` = 'ps1';
UPDATE `products` SET `categoryId` = 'cat-xbox' WHERE `category` = 'xbox';
UPDATE `products` SET `categoryId` = 'cat-nintendo' WHERE `category` = 'nintendo';
UPDATE `products` SET `categoryId` = 'cat-pc' WHERE `category` = 'pc';
UPDATE `products` SET `categoryId` = 'cat-retro' WHERE `category` = 'retro';

-- Now make the column NOT NULL
ALTER TABLE `products` MODIFY COLUMN `categoryId` VARCHAR(191) NOT NULL;

-- Drop the old category column and update platform enum
ALTER TABLE `products` DROP COLUMN `category`,
    MODIFY `platform` ENUM('ps5', 'ps4', 'ps3', 'ps2', 'ps1', 'xbox_series_x', 'xbox_series_s', 'xbox_one', 'xbox_360', 'nintendo_switch', 'nintendo_3ds') NOT NULL;

-- Add Foreign Key constraints
ALTER TABLE `user_addresses` ADD CONSTRAINT `user_addresses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add Foreign Key for products -> categories
ALTER TABLE `products` ADD CONSTRAINT `products_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
