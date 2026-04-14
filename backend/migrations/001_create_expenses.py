"""
Migration 001 - create expenses table
"""

VERSION = "001"
DESCRIPTION = "create expenses table"


def upgrade(db):
    db.execute_sql("""
        CREATE TABLE IF NOT EXISTS expenses (
            id          INT AUTO_INCREMENT PRIMARY KEY,
            title       VARCHAR(255)  NOT NULL,
            amount      FLOAT         NOT NULL,
            category    VARCHAR(100)  NOT NULL,
            date        DATE          NOT NULL,
            note        TEXT          DEFAULT '',
            created_at  DATETIME      DEFAULT CURRENT_TIMESTAMP
        )
    """)


def downgrade(db):
    db.execute_sql("DROP TABLE IF EXISTS expenses")
