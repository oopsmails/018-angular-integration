Copied from oopsmails/angular-05/integration/README.md


====================================================

**Install Angular and create new project**
```
ng new integration
cd integration
```

**Install bootstrap**
```
npm install bootstrap --save
or
npm install --save bootstrap@next
```

Open the angular.json file and add ./node_modules/bootstrap/dist/css/bootstrap.min.css to the styles array:
```
"styles": [ 
    "src/styles.css", 
    "./node_modules/bootstrap/dist/css/bootstrap.min.css" 
],
```

**Using ngrx store**

```
npm install @ngrx/schematics --save-dev
npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools --save

```

--> npm install @ngrx/entity --save OR yarn add @ngrx/entity   
@ngrx/entity provides an API to manipulate and query entity collections.
- Reduces boilerplate for creating reducers that manage a collection of models.
- Provides performant CRUD operations for managing entity collections.
- Extensible type-safe adapters for selecting entity information.


As stated in the official doc, use shematics for the default ng commands :   
```ng config cli.defaultCollection @ngrx/schematics```

Generate the initial Store in a global AppState (yeah, remove the dry-run option) :   

```
ng generate @ngrx/schematics:store State --root --module app.module.ts -d
ng generate @ngrx/schematics:store State --root --module app.module.ts


ng g action ngrxstore/actions/ExampleCourses -d
ng g action ngrxstore/actions/ExampleCourses

ng g reducer ngrxstore/reducers/ExampleCourses --reducers index.ts --spec false -d
ng g reducer ngrxstore/reducers/ExampleCourses --reducers index.ts --spec false
```

--> if updating an array, then:
Try to use the spread operator because it creates a new array of users and does not mutate the previous array.

users: [...state.users, action.payload]
Or else use @ngrx/entity module for arrays. It's the best way.

--> ngrx entity error typeerror cannot read property 'ids' of undefined

Course object defines courseId as 'id' and it is a string instead of number ..., need to correctly define Adapter in reducer.

```
export const adapter : EntityAdapter<Course> = 
      createEntityAdapter<Course>({
        sortComparer: sortByCourseId,
        selectId: course => course.courseId
    });
```

--> ngfor async
```
<li *ngFor="let course of (beginnerCourses$ | async)">
    {{ course.courseId }} - {{ course.courseType }} : {{ course.courseName }}
</li>
```

--> ngrx NullInjectorError: No provider for Actions!

EffectsModule.forRoot([]),
EffectsModule.forFeature([CourseEffects])

--> Summary:

@Effect(): 
real http calls to get/post/put

Reducer:
reducer(state = initialState, action: ExampleCoursesActions): ExampleCoursesState   
Updating Store based on Action Types
If using ngrx/Entity, then define "adapter"

Action: define Action Types

Selector: 

```
export const selectAllCourses = createSelector(
  selectCoursesState,
  fromExampleCourses.selectAll
);
```


**Dependencies**

```
npm install file-saver --save
npm install @ngx-translate/core --save

-- npm i @uirouter/angular --save
-- npm i @uirouter/sticky-states --save
--> take these out, use ngrx store ....
-- "@uirouter/angular": "^3.0.0",
-- "@uirouter/sticky-states": "^1.5.0",

npm i core-js --save
npm i highcharts --save
npm i lunr --save
npm i web-animations-js --save
```

**Create project structure (as before)**
```
ng g s services\configuration

ng g m core

-- ng g c core\lib\components\home

ng g c core\components\home
ng g c core\components\navbar-bs
ng g c core\components\not-found
ng g c core\components\footer

ng g d core\directives\element-changing
ng g d core\directives\mouseover-color


npm i --save @angular/cdk @angular/material @angular/animations hammerjs

----

ng g m shared
ng g s shared\services\user-token\user-token
ng g s shared\services\window-provider
ng g s shared\services\http-service

ng g m example
ng g c example\components\example-home
ng g c example\components\generic\courses

ng g c example\components\generic\courses\courses-selection
ng g c example\components\generic\courses\courses-list

ng g c example\components\generic\courses\courses-selection\online

ng g c example\components\view-child\joke
ng g c example\components\view-child\joke-list
ng g c example\components\view-child\joke-list-parent
ng g c example\components\generic\employee\employee-list
ng g s example\components\generic\employee\employee
ng g c example\components\generic\employee\oauth-token
ng g c example\components\generic\login\spring-cloud-login
ng g c example\components\blogger
ng g c example\components\rxjs-home
ng g c example\components\card-hosting
ng g c example\components\pagination
ng g c example\components\consuming-http

ng g m sandbox
ng g c sandbox\components\sandbox-home
ng g c sandbox\components\change-detector\live-data
ng g s sandbox\services\data-provider

ng g c sandbox\components\msg-between
ng g c sandbox\components\file-download
ng g c sandbox\components\msg-between\msg-child
ng g c sandbox\components\file-download-iframe
ng g c sandbox\components\svg-circle

ng g s sandbox\services\file-download
ng g s sandbox\services\posts

```

====> Design: see shared.module.ts

{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

fakeBackendProvider


====> to use "`import { Course, UserTokens } from '@shared/model';`"
instead of using "`../../../sharded/model`".

or `import { Course, UserTokens } from '@app/shared/model'`;

tsconfig.json:
```
"baseUrl": "./src",
.... ....
"paths": {
    "@app/*": [
    "app/*"
    ],
    "@core/*": [
    "app/core/*"
    ],
    "@environment/*": [
    "environments/*"
    ],
    "@shared/*": [
    "app/shared/*"
    ],
    "@progressing/*": [
    "app/progressing/*"
    ]
}
```

----

====> Resolving the error "http call in ngOnInit(), seeing undefined error in console"
See, CoursesComponent and courses.component.html

`<ng-container *ngIf="oauthToken">`

====> nav-bar, dropdown not working ...
`npm i --save @ng-bootstrap/ng-bootstrap`

navbar-bs:

-- routerLink not working: 
need to add RouterModule.forChild([]) in core.module.ts, because using routerLink="...".

-- dropdown not working: 
need to add NgbModule.forRoot().ngModule in shared.module.ts and then add SharedModule
in core.module.ts, because 
<div ngbDropdownMenu ...

----
add icon to navigation bar. Since bootstrap dropped glyphicon, so, we need install 
font-awesome.
49:11: 
1. npm i font-awesome --save
2. import it in our global style sheet, style.css
@import "~font-awesome/css/font-awesome.css";
3. bs-navbar.component.html
<i class="fa fa-leaf" aria-hidden="true"></i>

----

====> Any good way to call subscribe inside subscribe? like,
```
this.service.service1().subscribe( res1 => {
  this.service.service1().subscribe( res2 => {
    this.service.service1().subscribe( res3 => {
      this.funcA(res1, res2, res3);
  });
  });
});
```

Answer:

If you can do them all in parallel:
```
forkJoin(
   this.service.service1(), this.service.service2(), this.service.service3()
).subscribe((res) => {
   this.funcA(res[0], res[1], res[2]);
});
```

If each depends on the result of the previous:

```
this.service.service1().pipe(
    flatMap((res1) => this.service.service2(res1)),
    flatMap((res2) => this.service.service3(res2))
).subscribe((res3) => {
    // Do something with res3.
});
```

... and so on. There are many different operators to compose observables.



====> pipe and map, should be used as manipulating returning data ...
```
return this.httpClient.get<Employee[]>(resourceUrl, { headers }).pipe(map((x: any) => {
    return x.substring ....
}));
```


=======================================================

====> CrossOrigin: problem
Failed to load http://localhost:8080/backendmock/downloadFile/docx?filename=testDocx.docx: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:4200' is therefore not allowed access. The response had HTTP status code 403.

==> To make localhost:4200 connect to localhost:8080

--> option 1: Server side: Spring boot,

Solution 1:
Application configuration level, SpringBootBackendMockApplication, 

```
@Bean
public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurerAdapter() {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry
                    .addMapping("/backendmock/**")
                    .allowedOrigins("http://localhost:4200")
                    .allowedMethods("*");
        }
    };
}
```
Solution 2:

```
@RestController
@RequestMapping("/backendmock")
@CrossOrigin <-------------------------- add this
public class StreamingResponseBodyController
```
Solution 3:
```
response.setHeader("Access-Control-Allow-Origin", "*"); //ok, without WebMvcConfigurer in SpringBootBackendMockApplication
```
--> option 2: Client side: Angular,
a. Add proxy.conf.json in the same folder which package.json resides.
b. package.json, script,
"start": "ng serve --proxy-config proxy.conf.json",
c. Define URL ...
 private txtUrl = '/backendmock/downloadFile/txt?filename=testTxt.txt'; // with proxy.conf.json
 vs.
 private pdfUrl = 'http://localhost:8080/backendmock/downloadFile/pdf?filename=testPdf.pdf'; // send directly to server
d. use "npm start" to start server instead of "ng serve"

seeing following in log ...

```
[HPM] POST /backendmock/downloadFile/xlsx?filename=testXlsx.xlsx -> http://localhost:8080
[HPM] POST /backendmock/downloadFile/txt?filename=testTxt.txt -> http://localhost:8080
```

=======================================================

====> Problem: rxjs has no exported member observable

-- Using RxJS 6. Just replace
```
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
```
by
`import { Observable, of } from 'rxjs';`

-- npm install rxjs-compat --save, just for types.
`"rxjs-compat": "^6.4.0",`

====> Problem: Run the mock rest server, /server

==> The script in package.json

--> Windows:
``` "dev": "./node_modules/.bin/ts-node ./server/server.ts > NUL | ng serve --proxy-config proxy.conf.json",```

--> Unix:
 ```"dev": "./node_modules/.bin/ts-node ./server/server.ts > /dev/null | ng serve --proxy-config proxy.conf.json",```

==> Error: ts-node server.ts SyntaxError: Unexpected token import module 2015, 

C:\Github\angular-integration\server\server.ts:1
(function (exports, require, module, __filename, __dirname) { import * as express from 'express';
                                                                     ^
SyntaxError: Unexpected token *
    at new Script (vm.js:80:7)

--> Take out the following line from tslint.json

```"module": "es2015",```


====> Problem: 


=======================================================

**In This Repository**

====> 3 Ways to Pass Async Data to Angular + Child Components
path: 'example/3ways', component: PageThreeWaysComponent

From: https://scotch.io/tutorials/3-ways-to-pass-async-data-to-angular-2-child-components 

====> OAuth2, grand_type: password, with backend Auth Server (Spring Clound)
path: 'example/employees', component: EmployeeListComponent


=======================================================


"dev": "npm run start-watch > /dev/null | npm run wp-server"

"start": "./node_modules/.bin/ng serve  --proxy-config ./proxy.json",
"server": "./node_modules/.bin/ts-node ./server/server.ts",


"dev": "npm run server > /dev/null | npm run start",
"dev": "npm run --silent server | npm run start",


If you're using an UNIX-like environment, just use & as the separator:

"dev": "npm run start-watch & npm run wp-server"


Otherwise if you're interested on a cross-platform solution, you could use npm-run-all module:

"dev": "npm-run-all --parallel start-watch wp-server"


ctrl + alt + o: organize import


