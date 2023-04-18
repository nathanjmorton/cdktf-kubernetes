import "cdktf/lib/testing/adapters/jest";
import { Testing } from "cdktf";
import * as kubernetes from "@cdktf/provider-kubernetes";
import {
  KubernetesWebAppDeployment,
  KubernetesNodePortService,
  SimpleKubernetesWebApp,
} from "../constructs";

describe("Our CDKTF Constructs", () => {
  describe("KubernetesWebAppDeployment", () => {
    it("should contain a deployment resource", () => {
      expect(
        Testing.synthScope((scope) => {
          new KubernetesWebAppDeployment(scope, "myapp-frontend-dev", {
            image: "nginx:latest",
            replicas: 4,
            app: "myapp",
            component: "frontend",
            environment: "dev",
          });
        })
      ).toHaveResource(kubernetes.deployment.Deployment);
    });
  });
  describe("KubernetesNodePortService", () => {
    it("should contain a service resource", () => {
      expect(
        Testing.synthScope((scope) => {
          new KubernetesNodePortService(scope, "myapp-frontend-dev", {
            port: 30001,
            app: "myapp",
            component: "frontend",
            environment: "dev",
          });
        })
      ).toHaveResource(kubernetes.service.Service);
      // export interface KubernetesNodePortServiceConfig {
      //   readonly port: number;
      //   readonly app: string;
      //   readonly component: string;
      //   readonly environment: string;
      // }
    });
  });
  describe("SimpleKubernetesWebApp", () => {
    it("should contain a Service resource", () => {
      expect(
        Testing.synthScope((scope) => {
          new SimpleKubernetesWebApp(scope, "myapp-frontend-dev", {
            image: "nginx:latest",
            replicas: 4,
            app: "myapp",
            component: "frontent",
            environment: "dev",
            port: 30001,
          });
        })
      ).toHaveResource(kubernetes.service.Service);
    });
    it("should contain a Deployment resource", () => {
      expect(
        Testing.synthScope((scope) => {
          new SimpleKubernetesWebApp(scope, "myapp-frontend-dev", {
            image: "nginx:latest",
            replicas: 4,
            app: "myapp",
            component: "frontent",
            environment: "dev",
            port: 30001,
          });
        })
      ).toHaveResource(kubernetes.deployment.Deployment);
    });
  });
});
