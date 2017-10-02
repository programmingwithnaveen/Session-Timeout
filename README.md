# SessionTimeOut

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.0.

## Development server

Start the server using command -  `ng serve`.

## Steps to setup Angular project to monitor idle user

1. Create Angular CLI project
2. Install below mentioned packages

    i. npm install --save @ng-idle/core

    ii. npm install --save @ng-idle/keepalive 

    iii. npm install --save bootstrap@4.0.0-beta
    
    iv. npm install --save @ng-bootstrap/ng-bootstrap

3. Update the angular-cli.json to include Bootstrap CSS



"styles": [
        "styles.css",
        "../node_modules/bootstrap/dist/css/bootstrap.min.css"
      ],

## Refernces

1. https://hackedbychinese.github.io/ng2-idle/
2. http://getbootstrap.com/
3. https://ng-bootstrap.github.io/#/getting-started