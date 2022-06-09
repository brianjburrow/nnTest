\echo 'Delete and recreate nnTest db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE nntest;
CREATE DATABASE nntest;
\connect nntest

\i nntest-schema.sql
\i nntest-seed.sql

\echo 'Delete and recreate nnTest_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE nntest_test;
CREATE DATABASE nntest_test;
\connect nntest_test

\i nntest-schema.sql
