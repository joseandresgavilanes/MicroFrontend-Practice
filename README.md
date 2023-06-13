# Worklist Web

## Run in development environment

```bash
npm run dev
```

## Build image

Build docker image

```shell
docker build --add-host nexusdev.krugercorp.com:192.168.5.17 -t krugerarchitecturedocker.krugercorp.com/kw-legacy-web:1.0.0-SNAPSHOT -f deploy/docker/Dockerfile .
```

**OPTIONAL** - Run the container

```shell
docker run --add-host keycloak.krugercorp.com:192.168.5.17 -it --rm --env-file .env.development --name kw-legacy-web -p 3000:3000 krugerarchitecturedocker.krugercorp.com/kw-legacy-web:1.0.0-SNAPSHOT
```

Push image

```shell
docker push krugerarchitecturedocker.krugercorp.com/kw-legacy-web:1.0.0-SNAPSHOT
```

## Build Chart

**OPTIONAL** Remove previous chart

```shell
rm kw-legacy-web-1.0.0.tgz
```

1) Update dependencies

```shell
# Execute only if necessary update dependency
helm dependency update ./deploy/helm
```

**OPTIONAL** Test if chart has correct configuration

```shell
helm uninstall kw-legacy-web -n sistemaintegralpgedev
helm install kw-legacy-web ./deploy/helm -n sistemaintegralpgedev
helm install kw-legacy-web --dry-run ./deploy/helm -n sistemaintegralpgedev
```

2) Build chart

```shell
helm package ./deploy/helm
```

3) Push chart

```shell
helm nexus-push kruger-architecture kw-legacy-web-1.0.0.tgz -u user -p Password01
```
