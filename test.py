# Databricks Notebook: Modular Data Engineering Starter

# COMMAND ----------

# Load sample data
df = spark.read.csv("/databricks-datasets/samples/population.csv", header=True, inferSchema=True)
display(df)

# COMMAND ----------

# Basic transformation
df_clean = df.dropna().filter(df["Population"] > 1000000)
df_clean.createOrReplaceTempView("cleaned_population")

# COMMAND ----------

# SQL query
%sql
SELECT Country, Population FROM cleaned_population ORDER BY Population DESC LIMIT 10

# COMMAND ----------

# Save to Delta Lake
df_clean.write.format("delta").mode("overwrite").save("/tmp/cleaned_population_delta")
