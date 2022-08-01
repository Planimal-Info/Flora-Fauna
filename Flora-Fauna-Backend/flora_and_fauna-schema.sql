CREATE TABLE users (
id          SERIAL PRIMARY KEY,
is_admin    BOOLEAN DEFAULT FALSE,
username    TEXT NOT NULL,
first_name  TEXT NOT NULL,
last_name   TEXT NOT NULL,
email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN EMAIL) > 1),
password    TEXT NOT NULL,
flagged     BOOLEAN DEFAULT FALSE,
strikes     INTEGER DEFAULT 0,
created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE user_posts (
id                  SERIAL PRIMARY KEY, 
photo               BYTEA,
user_post_desc      TEXT NOT NULL,
user_id             INT NOT NULL,
likes               INTEGER DEFAULT 0,
created_at          TIMESTAMP NOT NULL DEFAULT NOW(),
updated_at          TIMESTAMP NOT NULL DEFAULT NOW(),
flagged             BOOLEAN DEFAULT FALSE,
user_post_title     TEXT NOT NULL
);

CREATE TABLE likes (
id              SERIAL PRIMARY KEY,
user_id         INT NOT NULL,
user_post_id    INT NOT NULL
);

CREATE TABLE planimals (
id                  SERIAL PRIMARY KEY,
common_name         TEXT NOT NULL,
scientific_name     TEXT NOT NULL,
taxonomic_group     TEXT NOT NULL,
last_seen           DATE NOT NULL,
image_url           TEXT NOT NULL,
conservation_rate   TEXT NOT NULL
);
