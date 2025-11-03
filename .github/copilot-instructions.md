## Purpose
This file gives short, actionable guidance so an AI coding agent can be productive immediately in this repository.

## Big picture (what this repo is)
- This is a small data-engineering project organized as a simple ETL pipeline. Raw/staging/curated folders live under `ETL/` (see `ETL/1_Raw`, `ETL/2_Staging`, `ETL/3_Curated`).
- Transformations are implemented in `Python/Transformation.py` using PySpark and Delta Lake semantics (reads CSV from `/mnt/data/raw/` and writes Delta to `/mnt/data/processed/`).
- A tiny static frontend lives under `docs/` (JSON table viewer) but is decoupled from the ETL pipeline.

## Key files and what they show (quick scan)
- `Python/Transformation.py` — canonical transformation example. It:
  - uses SparkSession (so assume PySpark runtime or Databricks),
  - reads `/mnt/data/raw/customers.csv`, cleans/renames columns to snake_case, converts dates (`to_date`), normalizes status to uppercase, filters missing emails, and writes Delta to `/mnt/data/processed/customers`, then registers a SQL table `customers_cleaned`.
- `ETL/1_Raw`, `ETL/2_Staging`, `ETL/3_Curated` — the intended data lifecycle; place raw ingestion, intermediate outputs, and curated outputs respectively.
- `docs/` (`index.html`, `script.js`, `style.css`) — small UI for viewing/editing JSON; not part of Spark job.

## Runtime & developer workflows (how to run & debug)
- Transformations expect a Spark runtime. Typical commands to run locally if Spark is installed:
  - spark-submit Python/Transformation.py
  - Or run inside a Databricks/EMR job where `/mnt/data` is mounted to cloud storage.
- Data paths are hard-coded to `/mnt/data/...` in the canonical script — when testing locally, either:
  - mount or symlink a local folder at `/mnt/data`, or
  - edit the script to point to `./test-data/raw/customers.csv` for ad-hoc runs (be explicit when changing paths).
- There is no CI or test harness present; expect manual runs and ad-hoc validation. If you add tests, follow the repository layout and keep test artifacts outside `ETL/`.

## Project-specific conventions and patterns
- ETL stages are modeled with numbered folders (1_Raw → 2_Staging → 3_Curated); maintain ordering and immutability of raw data.
- Column naming: transformation standard is snake_case (see `customer_id`, `signup_date` in `Transformation.py`).
- Status normalization: prefer uppercase canonical categories (`ACTIVE`, `INACTIVE`, `UNKNOWN`) — follow this when adding new transforms.
- Delta Lake is the canonical storage format for processed data. New transforms should write Delta using `.write.format("delta")`.
- SQL table registration is used for downstream access (see `spark.sql("CREATE TABLE ... USING DELTA LOCATION '...' ")`).

## Integration points & external dependencies
- PySpark (SparkSession) and Delta Lake runtime are required to execute `Python/Transformation.py` as-is.
- `/mnt/data` paths imply cloud-mounted storage (DBFS, ADLS, S3 mount, etc.). Confirm the target environment mounts the same paths.

## Short examples the agent can use
- To locate the canonical transform: open `Python/Transformation.py` and look for `spark.read.option("header", True).csv("/mnt/data/raw/customers.csv")`.
- To add a new staged output, write to `ETL/2_Staging` or create a new Delta under `/mnt/data/processed/<name>` and register it with `spark.sql`.

## What NOT to change without human review
- Don't alter `/mnt/data` hard-coded paths in production jobs unless you also update deployment/run instructions and mounts.
- Don't change the Delta table location or table names that downstream jobs expect (e.g., `customers_cleaned`) without coordinating consumers.

## Where to look next (for a human or agent needing more context)
- `Python/Transformation.py` — primary example to copy for new transforms.
- `ETL/` directories — where to place outputs for each stage.
- `docs/` — examples of simple static UI code (JS/HTML patterns used in the repo).

If anything here is unclear or you want more specifics (run commands for your environment, sample test data, or a CI plan), tell me what target runtime you plan to use (local Spark, Databricks, EMR) and I will expand these instructions.
