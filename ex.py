import pandas as pd

route = input()

# 지시사항을 수행해보세요.
df = pd.read_csv(route)
iris = df[(df['sepal.length'] > 5) & ~(df['petal.length'] < 1.5)]
print(iris)
