---
title: "Hyperparamter Tuning"
date: 2025-06-13
permalink: /post/2025/06/tuning
category: 
    - ML
tags:
    - hyperparamter-tuning, tuning, optuna, data-science,
---

References: 
- [Hyperparamter-tuning](https://medium.com/@dharmateja522/hyperparameter-tuning-in-data-science-a-comprehensive-guide-to-optimizing-your-models-ffb52a1f8c72)
- [Optuna-Medium](https://medium.com/@mdshah930/master-hyperparameter-optimization-with-optuna-a-complete-guide-89971b799b0a)
- [GeeksforGeeks](https://www.geeksforgeeks.org/deep-learning/hyperparameter-tuning-with-optuna-in-pytorch/)

  
### Why do we need hyperparamater tuning?
- Training a model on a dataset means to find the value of the parameters of the model (weights and biases).
- But there are paramters that decide on how the model finds these values, and these are called hyperparameters.
- Hyperparameters are called “hyper” parameters because they are parameters about the parameters.
- The main aim of hyperparameter tuning is to maximize the model's performance on unseen (test or validation) data by finding the optimal set of hyperparameters.
- A poor choice of hyperparameters can lead to overfitting (model too complex) or underfitting (model too simple). 
- The right tuning strikes a balance, enabling the model to learn patterns without memorizing noise.
- So the important question here is how to avoid overfitting and underfitting.
 
### Implementing Hyperparameter Tuning With Optuna
- Integrating Optuna with PyTorch involves defining an objective function that wraps the model training and evaluation process.
- The objective function is then used to suggest hyperparameters and optimize them over multiple trials.

Let's tune the Mambular model from OpenTabular. 

- For optuna, we need to define a trial defining what type of values we want to be tested for hyperparameter testing. Here, we use a `dataclass` to define the hyperparamter space to check.
- Therefore, we need an extra `suggest_from_space` function. 

First, lets define the opt_space 
```
from dataclasses import dataclass
from typing import Tuple

@dataclass
class MambularOptSpace:
    n_layers: Tuple = ("int", 1, 1, 8)  # (type, step, low, high)
    dropout: Tuple = ("uniform", 0.0, 0.5)
    lr: Tuple = ("loguniform", 1e-5, 0.01)
```

Define the 'suggest_from_space' method.
```

def suggest_from_space(trial, space):
    params = {}
    
    for key, val in space.__dict__.items():
        if isinstance(val, tuple):
            dist_type = val[0]

            if dist_type == "int":
                # ("int", low, high, step)
                _, low, high, step = val
                params[key] = trial.suggest_int(key, low, high, step=step)

            elif dist_type == "float":
                # ("float", low, high)
                _, low, high = val
                params[key] = trial.suggest_float(key, low, high)

            elif dist_type == "logfloat":
                # ("logfloat", low, high)
                _, low, high = val
                params[key] = trial.suggest_float(key, low, high, log=True)

            elif dist_type == "discrete_float":
                # ("discrete_float", low, high, step)
                _, low, high, step = val
                params[key] = trial.suggest_float(key, low, high, step=step)

            elif dist_type == "categorical":
                # ("categorical", [choice1, choice2, ...])
                _, choices = val
                params[key] = trial.suggest_categorical(key, choices)

            elif dist_type == "bool":
                # ("bool",)
                params[key] = trial.suggest_categorical(key, [True, False])

            elif dist_type == "uniform":
                # ("uniform", low, high) same as float
                _, low, high = val
                params[key] = trial.suggest_float(key, low, high)

            elif dist_type == "loguniform":
                # ("loguniform", low, high) same as logfloat
                _, low, high = val
                params[key] = trial.suggest_float(key, low, high, log=True)

            elif dist_type == "discrete_uniform":
                # ("discrete_uniform", low, high, step) same as discrete_float
                _, low, high, step = val
                params[key] = trial.suggest_float(key, low, high, step=step)

            else:
                raise ValueError(f"Unknown distribution type: {dist_type}")
        else:
            # Fixed value
            params[key] = val

    return params
```

Lets define the dataset we are going to use:
```
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Load California Housing dataset
data = fetch_california_housing(as_frame=True)
X, y = data.data, data.target
# Drop NAs
X = X.dropna()
y = y[X.index]
# Standard normalize features and target
y = StandardScaler().fit_transform(y.values.reshape(-1, 1)).ravel()
# Train-test-validation split
X_train, X_temp, y_train, y_temp = train_test_split(
    X, 
    y, 
    test_size=0.5, 
    random_state=42
)
X_val, X_test, y_val, y_test = train_test_split(
    X_temp, 
    y_temp, 
    test_size=0.5, 
    random_state=42
)
```

Now, lets define the objective function that is required for optuna to hypertune a model. 
```

def objective(trial):
    space = MambularOptSpace()
    params = suggest_from_space(trial, space)
    
    # Example: you need to define your MLP and training loop here.
    # For illustration, we use a dummy accuracy based on the params.
    model = MambularRegressor(n_layers=params['n_layers'], dropout=params['dropout'])
    model.fit(
        X_train[:10], 
        y_train[:10], 
        max_epochs=5, 
        lr=params['lr'], 
        )
    
    result = model.evaluate(X_test[:10], y_test[:10])
    print(result)
    return result['Mean Squared Error']

```

Now, lets hyper-tune. 
```
study = optuna.create_study(direction="maximize")
study.optimize(objective, n_trials=5)

print("Best parameters:", study.best_params)
print('Study:', study.best_trial)

```

Output:
```
>>> [I 2025-06-13 03:53:50,697] Trial 4 finished with value: 1.332045286538851 and parameters: {'n_layers': 1, 'dropout': 0.13551730476199408, 'lr': 9.853899618653575e-05}. Best is trial 3 with value: 1.3332390289912481.
{'Mean Squared Error': 1.332045286538851}
Best parameters: {'n_layers': 1, 'dropout': 0.2016131265256661, 'lr': 0.00016399390919922383}
Study: FrozenTrial(number=3, state=1, values=[1.3332390289912481], datetime_start=datetime.datetime(2025, 6, 13, 3, 53, 49, 254362), datetime_complete=datetime.datetime(2025, 6, 13, 3, 53, 49, 975476), params={'n_layers': 1, 'dropout': 0.2016131265256661, 'lr': 0.00016399390919922383}, user_attrs={}, system_attrs={}, intermediate_values={}, distributions={'n_layers': IntDistribution(high=1, log=False, low=1, step=8), 'dropout': FloatDistribution(high=0.5, log=False, low=0.0, step=None), 'lr': FloatDistribution(high=0.01, log=True, low=1e-05, step=None)}, trial_id=3, value=None)
```

