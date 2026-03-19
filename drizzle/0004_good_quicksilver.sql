PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_watchlist` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`movie_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`movie_id`) REFERENCES `movies`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_watchlist`("id", "user_id", "movie_id") SELECT "id", "user_id", "movie_id" FROM `watchlist`;--> statement-breakpoint
DROP TABLE `watchlist`;--> statement-breakpoint
ALTER TABLE `__new_watchlist` RENAME TO `watchlist`;--> statement-breakpoint
PRAGMA foreign_keys=ON;