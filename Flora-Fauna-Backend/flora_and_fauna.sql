
\echo "Delete and recreate flora and fauna database?"
\prompt "Return for yes or control-C to cancel " answer

DROP DATABASE flora_and_fauna;
CREATE DATABASE flora_and_fauna;
\connect flora_and_fauna;


\i flora_and_fauna-schema.sql;