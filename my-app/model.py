import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import confusion_matrix
import pickle


class Model:

    def __init__(self):
        self.name = ''
        path = '.dataset/depressionDataset.csv'  # Ensure this path is correct
        df = pd.read_csv(path)
        df = df[['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'class']]

        # Handling Missing Data
        for col in df.columns:
            df[col] = df[col].fillna(df[col].mode()[0])

        self.split_data(df)

    def split_data(self, df):
        x = df.iloc[:, :-1].values
        y = df.iloc[:, -1].values
        x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.4, random_state=24)
        self.x_train = x_train
        self.x_test = x_test
        self.y_train = y_train
        self.y_test = y_test

    def svm_classifier(self):
        self.name = 'SVM Classifier'
        classifier = SVC()
        return classifier.fit(self.x_train, self.y_train)

    def decision_tree_classifier(self):
        self.name = 'Decision Tree Classifier'
        classifier = DecisionTreeClassifier()
        return classifier.fit(self.x_train, self.y_train)

    def random_forest_classifier(self):
        self.name = 'Random Forest Classifier'
        classifier = RandomForestClassifier()
        return classifier.fit(self.x_train, self.y_train)

    def naive_bayes_classifier(self):
        self.name = 'Naive Bayes Classifier'
        classifier = GaussianNB()
        return classifier.fit(self.x_train, self.y_train)

    def knn_classifier(self):
        self.name = 'KNN Classifier'
        classifier = KNeighborsClassifier()
        return classifier.fit(self.x_train, self.y_train)

    def accuracy(self, model):
        predictions = model.predict(self.x_test)
        cm = confusion_matrix(self.y_test, predictions)
        accuracy = (cm[0][0] + cm[1][1]) / cm.sum()
        print(f"{self.name} has an accuracy of {accuracy * 100:.2f}%")

    def save_model(self, model, filename):
        """Saves the trained model to a file."""
        with open(filename, 'wb') as file:
            pickle.dump(model, file)
        print(f"{self.name} saved to {filename}!")

    def load_model(self, filename):
        """Loads a model from a file."""
        with open(filename, 'rb') as file:
            model = pickle.load(file)
        print(f"Model loaded from {filename}!")
        return model
