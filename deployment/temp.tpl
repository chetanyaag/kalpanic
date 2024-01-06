apiVersion: v1
kind: Service
metadata:
  name: redis
spec:
  selector:
    app: redis
  ports:
    - protocol: TCP
      port: 6379
      targetPort: 6379
---

apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
        - name: redis
          image: redis:7.0.11-alpine

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: chetanyaag/ui:{tag}
        ports:
        - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  selector:
    app: frontend
  ports:
    - protocol: TCP
      port: 3000
      targetPort: 3000
  type: LoadBalancer


---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: restapi-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: restapi
  template:
    metadata:
      labels:
        app: restapi
    spec:
      containers:
      - name: restapi
        image: chetanyaag/restapi:{tag} 
        command: ["gunicorn", "--bind", "0.0.0.0:8000", "tutorial.wsgi"]
        ports:
        - containerPort: 8000

---
apiVersion: v1
kind: Service
metadata:
  name: restapi-service
spec:
  selector:
    app: restapi
  ports:
    - protocol: TCP
      port: 8000
      targetPort: 8000
  type: LoadBalancer



---
apiVersion: v1
kind: Service
metadata:
  name: celery
spec:
  selector:
    app: celery
  ports:
    - protocol: TCP
      port: 80  
      targetPort: 80  
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: celery
spec:
  replicas: 1
  selector:
    matchLabels:
      app: celery
  template:
    metadata:
      labels:
        app: celery
    spec:
      containers:
        - name: celery
          image: chetanyaag/restapi:{tag}  
          command: ["celery", "--app=tutorial", "worker", "-l", "INFO"]

