FROM gcc:15.2.0

WORKDIR /var/www/node

ENV TZ=Europe/Kiev
ENV RUSTUP_HOME=/usr/local/rustup
ENV CARGO_HOME=/usr/local/cargo
ENV PATH=/usr/local/cargo/bin:$PATH

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install sudo nano python3-setuptools libjsoncpp-dev inotify-tools -y
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs \
  | sh -s -- -y --no-modify-path --default-toolchain 1.92.0  
RUN curl -sL https://deb.nodesource.com/setup_24.x | bash -
RUN apt-get install nodejs -y

RUN npm install -g bun@1.3.6 pkg@5.8.1 yarn@1.22.22
RUN npm install -g typescript@5.9.3 neon-cli@0.10.1

EXPOSE 4433