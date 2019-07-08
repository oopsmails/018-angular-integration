# docker build --rm -f Dockerfile -t angular-integration-dev:v1 .
# OK to run but not hot reload: docker run -it --name adev -p 4301:4301 -p 49153:49153 angular-integration-dev:v1
# Problem: docker run -it --name adev -p 4301:4301 -p 49153:49153 -v //c/Github/angular-integration:/app angular-integration-dev:v1

# base image
FROM node:latest

# install chrome for protractor tests
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
# RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
# RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
RUN mkdir -p /app
WORKDIR /app

RUN npm install -g nodemon

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
# COPY package.json /dockerv/adev/package.json
COPY package.json /app/package.json
RUN ls -la /app

RUN npm install
RUN npm install -g @angular/cli
RUN npm install -g @angular-devkit/build-angular

# add app
COPY . /app

RUN pwd
RUN ls -la

EXPOSE 4301 49153

# start app
# CMD ng serve --host 0.0.0.0 --port 4301
# CMD npm run start
# CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "500"]
CMD ng serve --proxy-config proxy.conf.json --port 4301 --host 0.0.0.0 --poll 1
