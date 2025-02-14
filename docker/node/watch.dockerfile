FROM gcc:14.2.0

WORKDIR /var/www/node

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install sudo nano libjsoncpp-dev inotify-tools -y

RUN curl -sL https://deb.nodesource.com/setup_22.x | bash -
RUN apt-get install nodejs -y

COPY ./.env ./.env
COPY ./.env.local ./.env.local
COPY ./.gitignore ./.gitignore
COPY ./LICENSE ./LICENSE
COPY ./package.json ./package.json
COPY ./README.md ./README.md
COPY ./tsconfig.json ./tsconfig.json
COPY ./yarn.lock ./yarn.lock

RUN npm install -g bun@1.2.0 node-gyp@11.0.0 pkg@5.8.1 yarn@1.22.22
RUN yarn install

EXPOSE 3001