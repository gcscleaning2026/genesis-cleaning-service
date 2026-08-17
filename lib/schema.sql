CREATE TABLE IF NOT EXISTS reviews (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  comment     TEXT    NOT NULL,
  rating      INTEGER NOT NULL,
  lang        TEXT    NOT NULL DEFAULT 'en',
  status      TEXT    NOT NULL DEFAULT 'pending',
  ip_hash     TEXT,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
  decided_at  TEXT
);

CREATE INDEX IF NOT EXISTS reviews_status_created ON reviews (status, created_at DESC);

CREATE INDEX IF NOT EXISTS reviews_ip_created ON reviews (ip_hash, created_at DESC);
