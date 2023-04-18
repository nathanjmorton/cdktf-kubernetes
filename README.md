# Develop applications with CDKTF

This is a companion repository for the Hashicorp [Deploy Applications with CDK for Terraform](https://developer.hashicorp.com/terraform/tutorials/cdktf/cdktf-applications) tutorial.
The Cloud Development Kit for Terraform (CDKTF) allows you to manage Terraform configuration with code in your preferred programming language.

## App

1. Start a local Docker registry to store container images

```tsx
docker run -d --restart always -p "127.0.0.1:5000:5000" --name local-registry registry:2
```

2. use kind to create a kubernetes cluster running in Docker locally

```tsx
kind create cluster --name=cdktf-app --config kind-config.yaml
```

3. verify cluster by listing kind clusters

```tsx
kind get clusters
```

4. use kubectl to print out info about your cluster; context is kind- followed by your cluster name

```tsx
kubectl cluster-info --context=kind-cdktf-app
```

5. create kubeconfig file to allow access to kubernetes cluster

```tsx
kubectl config view --raw --context kind-cdktf-app > kubeconfig.yaml
```

6. attach your local Docker registry to your kind cluster
   1. Docker registry name is local-registry
   2. kind cluster network name is kind
   3. This command puts the local-registry on the kind network
   4. Another way of thinking of this is: the kind kubernetes cluster network has the docker registry attached to it

```tsx
docker network connect kind local-registry
```

7. configure your Kubernetes cluster to use the local registry

```tsx
kubectl apply -f local-registry-configmap.yaml --kubeconfig kubeconfig.yaml
```

8. build and push the container image to the local registry (frontend and backend)

```tsx
cd frontend
yarn deploy
cd ../backend
yarn deploy
```

9.

10. deploy cdktf app stacks separately (install the app dependencies first)

```tsx
cd app
yarn
cdktf deploy app
cdktf deploy app-test
```

### Commands Shortlist

```tsx
cdktf deploy [stack] # deploy stack
cdktf destroy [stack] # destroy stack
kubectl get deployments
kubectl get services
```

### Cleanup

```tsx
cdktf destroy app-test
>approve
cdktf destroy app
>approve
kind delete cluster --name=cdktf-app
docker stop local-registry
docker rm local-registry
```
