from model import Model

if __name__ == '__main__':
    # Initialize the Model class
    model = Model()

    # Train, save, and evaluate the SVM model
    svm_model = model.svm_classifier()
    model.accuracy(svm_model)
    model.save_model(svm_model, 'models/svm_model.pkl')

    # Train, save, and evaluate the Random Forest model
    rf_model = model.random_forest_classifier()
    model.accuracy(rf_model)
    model.save_model(rf_model, 'models/random_forest_model.pkl')

    # Load and evaluate the saved SVM model
    loaded_model = model.load_model('models/svm_model.pkl')
    model.accuracy(loaded_model)
