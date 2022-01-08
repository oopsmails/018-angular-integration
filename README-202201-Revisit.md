
# Revision 202201

## Front End: 

https://github.com/oopsmails/angular-integration

### Updated to Angular v12

### Removed BootStrap

- Added fixed nav bar


```
npm i

npm start

http://localhost:4300/

```

## Back End:

Run in Virtual Box, using java 8.

### check out

https://github.com/oopsmails/spring-cloud-microservices-all


- Can only run using Java 8
- Run Applications in Sequence, 

```
- Configuration Server

2022-01-08 17:16:24.945  INFO 3839 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8888 (http) with context path ''
2022-01-08 17:16:24.950  INFO 3839 --- [           main] loudMicroservicesConfigServerApplication : Started SpringCloudMicroservicesConfigServerApplication in 6.897 seconds (JVM running for 7.927)


- Eureka Server

2022-01-08 17:18:52.946  INFO 4117 --- [      Thread-10] e.s.EurekaServerInitializerConfiguration : Started Eureka Server
2022-01-08 17:18:52.983  INFO 4117 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8761 (http) with context path ''
2022-01-08 17:18:52.985  INFO 4117 --- [           main] .s.c.n.e.s.EurekaAutoServiceRegistration : Updating port to 8761
2022-01-08 17:18:52.990  INFO 4117 --- [           main] pringCloudMicroservicesEurekaApplication : Started SpringCloudMicroservicesEurekaApplication in 10.797 seconds (JVM running for 11.953)

- Zuul Proxy Server

2022-01-08 17:19:17 - INFO Tomcat started on port(s): 9999 (http) with context path ''
2022-01-08 17:19:17 - INFO Updating port to 9999
2022-01-08 17:19:17 - INFO Started SpringCloudMicroservicesZuulProxyApplication in 14.753 seconds (JVM running for 15.862)


- Auth Server

[01-08-2022 22:19:55] [restartedMain] [category=o.s.b.w.e.t.TomcatWebServer; prio=INFO CorrelationId=;] [UserId=; ] msg=Tomcat started on port(s): 7777 (http) with context path '/uaa'
[01-08-2022 22:19:55] [restartedMain] [category=o.s.c.n.e.s.EurekaAutoServiceRegistration; prio=INFO CorrelationId=;] [UserId=; ] msg=Updating port to 7777
[01-08-2022 22:19:55] [restartedMain] [category=.o.s.c.m.a.SpringCloudMicroservicesAuthApplication; prio=INFO CorrelationId=;] [UserId=; ] msg=Started SpringCloudMicroservicesAuthApplication in 8.774 seconds (JVM running for 9.999)
[01-08-2022 22:24:54] [AsyncResolver-bootstrap-executor-0] [category=c.n.d.s.r.a.ConfigClusterResolver; prio=INFO CorrelationId=;] [UserId=; ] msg=Resolving eureka endpoints via configuration

- SpringCloudMicroservicesEmployeeServiceApplication

[01-08-2022 17:20:31,309 EST-0500] [main] [category=embedded.tomcat.TomcatWebServer; prio=INFO CorrelationId=;] [UserId=; ] msg=Tomcat started on port(s): 18084 (http) with context path ''
[01-08-2022 17:20:31,311 EST-0500] [main] [category=reka.serviceregistry.EurekaAutoServiceRegistration; prio=INFO CorrelationId=;] [UserId=; ] msg=Updating port to 18084
[01-08-2022 17:20:31,321 EST-0500] [main] [category=SpringCloudMicroservicesEmployeeServiceApplication; prio=INFO CorrelationId=;] [UserId=; ] msg=Started SpringCloudMicroservicesEmployeeServiceApplication in 11.599 seconds (JVM running for 13.285)


```

