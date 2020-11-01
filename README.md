# Cloud-Computing-hw3 
# (Hadoop mapreduce log analysis practice)
## Create hadoop files
```bash
hdfs dfs -mkdir /tmp/visitCount
```
```bash
hdfs dfs -copyFromLocal access_log /tmp/visitCount/access_log
```
## Python 
```bash
hadoop \
jar /opt/hadoop/share/hadoop/tools/lib/hadoop-streaming-3.1.2.jar \
-D mapred.map.tasks=3 \
-mapper "python3 $PWD/python/mapper.py" \
-reducer "python3 $PWD/python/reducer.py" \
-input "/tmp/visitCount" \
-output "/tmp/vistCount_outdir"
```
### See result
```
hdfs dfs -cat /tmp/vistCount_outdir/part-00000
```
## Java
### Setup env variable
```bash
export HADOOP_CLASSPATH=$JAVA_HOME/lib/tools.jar
```
### Java compile
```bash
hadoop com.sun.tools.javac.Main visitCount.java
jar cf vc.jar visitCount*.class
```
### Run Hadoop
```bash
hadoop jar vc.jar visitCount /tmp/visit_count/access_log /tmp/visitCountJava_outdir
```
### See result
```bash
hdfs dfs -cat /tmp/visitCountJava_outdir/part-r-00000
```
## Reference
https://github.com/sdwangntu/hadoop-cluster
