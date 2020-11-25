import sys
import os
SPARK_HOME = "/spark/" # Set this to wherever you have compiled Spark
os.environ["SPARK_HOME"] = SPARK_HOME # Add Spark path
os.environ["SPARK_LOCAL_IP"] = "127.0.0.1" # Set Local IP
sys.path.append( SPARK_HOME + "/python") # Add python files to Python Path


from pyspark.mllib.classification import LogisticRegressionWithSGD
import numpy as np
from pyspark import SparkConf, SparkContext
from pyspark.mllib.regression import LabeledPoint


def getSparkContext():
    """
    Gets the Spark Context
    """
    conf = (SparkConf()
         .setMaster("local") # run on local
         .setAppName("Logistic Regression") # Name of App
         .set("spark.executor.memory", "1g")) # Set 1 gig of memory
    sc = SparkContext(conf = conf) 
    return sc

def mapper(line):
    """
    Mapper that converts an input line to a feature vector
    """    
    feats = line.strip().split(",") 
    # labels must be at the beginning for LRSGD
    label = float(feats[len(feats) - 1])
    feats = feats[: len(feats) - 1]
    # feats.insert(0,label)
    features = np.array([ float(feature) for feature in feats ]) # need floats
    return [features, label]

sc = getSparkContext()

# Load and parse the data
data = sc.textFile("./data_banknote_authentication.txt")
parsedData = data.map(mapper)

y = parsedData.map(lambda p: p[1]).collect()
# print (y)

# print (parsedData.collect()[:10])
# exit(0)

def sigmoid(z):
    z = np.clip(z, -99, 99999999)
    res = 1 / (1.0 + np.exp(-z))
    return res

currLoss = 100000000
b = 0  # initial b
w = np.zeros(4)  # initial w
lr = 0.0001  # learning rate
iteration = 15000
count = 0
b_lr = 1e-20
w_lr = np.zeros(0)
lamda = 0
    # Iterations

prev_acc = 0
for i in range(iteration):
    w_grad = parsedData.map(lambda p: -np.dot((p[1] - sigmoid(np.dot(p[0], w) + b)), p[0])).reduce(lambda x,y: x+y)
    b_grad = parsedData.map(lambda p: -np.sum(sigmoid(np.dot(p[0], w) + b))).reduce(lambda x,y: x+y)

    w -= w_grad * lr
    b -= b_grad * lr
    if i % 1 == 0:
	predict = parsedData.map(lambda p: sigmoid(np.dot(p[0], w) + b)).collect()
    	acc = parsedData.filter(lambda p: int(np.where(sigmoid(np.dot(p[0], w) + b) >= 0.5, 1, 0)) == int(p[1])).count() / float(parsedData.count())
	f = parsedData.map(lambda p: np.where((sigmoid(np.dot(p[0], w) + b) >= 0.5), 1, 0)).collect()
	result = np.where(np.array(predict) >= 0.5, 1, 0)
	# print (result)
	print 'current acc: ' + str(acc)
	if acc < prev_acc:
	     break
	prev_acc = acc
print 'final acc: ' + str(prev_acc)
