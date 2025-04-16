---
title: "Building Neural Networks from Scratch"
date: "2024-01-15"
author: "Jay Wyawhare"
tags: ["AI", "Neural Networks", "Python"]
excerpt: "Understanding neural networks by implementing them from scratch"
readingTime: "18 min"
---

# Building Neural Networks from Scratch

Learn how to implement neural networks using only NumPy.

## Forward Propagation

```python
def forward_prop(self, X):
    self.Z1 = np.dot(X, self.W1) + self.b1
    self.A1 = self.sigmoid(self.Z1)
    self.Z2 = np.dot(self.A1, self.W2) + self.b2
    self.A2 = self.sigmoid(self.Z2)
    return self.A2
```

## Backpropagation Implementation

Detailed implementation and mathematics...
