Copied from oopsmails/angular-05/integration/README.md


====================================================
**Install Angular and create new project**

ng new integration
cd integration

**Install bootstrap**
npm install bootstrap --save
or
npm install --save bootstrap@next

Open the angular.json file and add ./node_modules/bootstrap/dist/css/bootstrap.min.css to the styles array:

"styles": [ 
    "src/styles.css", 
    "./node_modules/bootstrap/dist/css/bootstrap.min.css" 
],

**Create project structure (as before)**
ng g m core
ng g m shared

ng g c core\components\home
ng g c core\components\navbar-bs
ng g c core\components\not-found

npm i --save @ng-bootstrap/ng-bootstrap
npm i --save @angular/cdk @angular/material @angular/animations hammerjs

----

ng g c shared\common\error-display

ng g m progressing
ng g c progressing\components\courses
ng g c progressing\components\progressing-home

ng g s shared\services\user-token\user-token

====> to use "`import { Course, UserTokens } from '@shared/model';`"
instead of using "`../../../sharded/model`".

or `import { Course, UserTokens } from '@app/shared/model'`;

tsconfig.json:

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

----



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

navbar-bs:

-- routerLink not working: 
need to add RouterModule.forChild([]) in core.module.ts, because using routerLink="...".

-- dropdown not working: 
need to add NgbModule.forRoot().ngModule in shared.module.ts and then add SharedModule
in core.module.ts, because 
<div ngbDropdownMenu ...


=======================================================

====> CrossOrigin: problem
Failed to load http://localhost:8080/backendmock/downloadFile/docx?filename=testDocx.docx: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:4200' is therefore not allowed access. The response had HTTP status code 403.

==> To make localhost:4200 connect to localhost:8080

--> option 1: Server side: Spring boot,

Solution 1:
Application configuration level, SpringBootBackendMockApplication, 
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

Solution 2:
@RestController
@RequestMapping("/backendmock")
@CrossOrigin <-------------------------- add this
public class StreamingResponseBodyController

Solution 3:

response.setHeader("Access-Control-Allow-Origin", "*"); //ok, without WebMvcConfigurer in SpringBootBackendMockApplication

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

[HPM] POST /backendmock/downloadFile/xlsx?filename=testXlsx.xlsx -> http://localhost:8080
[HPM] POST /backendmock/downloadFile/txt?filename=testTxt.txt -> http://localhost:8080

=======================================================
====> Problem: rxjs has no exported member observable

-- Using RxJS 6. Just replace
```import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';```
by
`import { Observable, of } from 'rxjs';`

-- npm install rxjs-compat --save, just for types.
"rxjs-compat": "^6.4.0",




=======================================================

ctrl + alt + o: organize import

