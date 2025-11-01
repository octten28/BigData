# What This Script Does
# Cleans and renames columns for consistency
# Converts string dates to proper `DateType`
# Normalizes status values to uppercase categories
# Filters out invalid rows (missing email)
# Saves the result as a Delta table for downstream analytics

from pyspark.sql import SparkSession
from pyspark.sql.functions import col, to_date, when, lower

# Initialize Spark session
spark = SparkSession.builder.appName("DataTransformationPipeline").getOrCreate()

# Load raw data from a CSV file in DBFS or cloud storage
raw_df = spark.read.option("header", True).csv("/mnt/data/raw/customers.csv")

# Step 1: Clean column names
cleaned_df = raw_df.select(
    col("CustomerID").alias("customer_id"),
    col("Name").alias("name"),
    col("Email").alias("email"),
    col("SignupDate").alias("signup_date"),
    col("Status").alias("status")
)

# Step 2: Convert date string to DateType
cleaned_df = cleaned_df.withColumn("signup_date", to_date(col("signup_date"), "yyyy-MM-dd"))

# Step 3: Normalize status values
cleaned_df = cleaned_df.withColumn(
    "status",
    when(lower(col("status")) == "active", "ACTIVE")
    .when(lower(col("status")) == "inactive", "INACTIVE")
    .otherwise("UNKNOWN")
)

# Step 4: Filter out rows with missing email
filtered_df = cleaned_df.filter(col("email").isNotNull())

# Step 5: Write transformed data to Delta Lake
filtered_df.write.format("delta").mode("overwrite").save("/mnt/data/processed/customers")

# Optional: Register as a table for SQL access
spark.sql("DROP TABLE IF EXISTS customers_cleaned")
spark.sql("CREATE TABLE customers_cleaned USING DELTA LOCATION '/mnt/data/processed/customers'")

