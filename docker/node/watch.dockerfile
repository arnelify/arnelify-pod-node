FROM node:20.15.1

WORKDIR /var/www/pod

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install sudo tzdata nano gcc g++ wget gnupg curl zip unzip -y
RUN yarn global add pkg && yarn install

ENV KAFKAJS_NO_PARTITIONER_WARNING=1
ENV TZ=Europe/Kiev

EXPOSE 3001
# EXPOSE 3002
# EXPOSE 8433