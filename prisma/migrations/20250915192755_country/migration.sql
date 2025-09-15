-- AlterTable
ALTER TABLE `users` ADD COLUMN `image` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `country` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
