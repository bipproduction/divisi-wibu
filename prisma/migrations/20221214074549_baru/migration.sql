-- CreateTable
CREATE TABLE `Task` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `start` DATETIME(3) NOT NULL,
    `end` DATETIME(3) NOT NULL,
    `progress` INTEGER NULL,
    `type` VARCHAR(191) NULL,
    `hideChildren` BOOLEAN NULL,
    `displayOrder` INTEGER NULL,
    `project` VARCHAR(191) NULL,
    `dependencies` JSON NULL,
    `isDisabled` BOOLEAN NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
