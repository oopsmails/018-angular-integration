# 202201: Revisit 

## Upgraded to Angular 12

Keeping Angular 7 branch for further reference

## Removed Bootstrap 4

Keeping B4 branch for further reference

## Upgraded Backend SpringBoot and SpringCloud

### github repo

https://github.com/oopsmails/spring-cloud-microservices-all

### Changes for this revisit

20220112: upgraded to SpringBoot 2.5.5 with SpringCloud 2020.0.4, demolished zuul-server, using spring-gateway in future

- upgraded to SpringBoot 2.5.5
- SpringCloud 2020.0.4
- demolished zuul-server
- using spring-gateway in future



## Run Application

### Front End:

```
npm i
npm start

```

Note: proxy.conf.json, changed from 8888 to 8889, in order to switch from zuul to spring-gateway

### Back End:

- Run app in order
    - config-server
    - eureka-server
    - auth-server, gateway-server, employee-service
    - organization-service, department-service



