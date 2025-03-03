<img src="https://static.wikia.nocookie.net/arnelify/images/c/c8/Arnelify-logo-2024.png/revision/latest?cb=20240701012515" style="width:336px;" alt="Arnelify Logo" />

![Arnelify POD for C++](https://img.shields.io/badge/Arnelify%20POD%20for%20C++-0.6.4-yellow) ![C++](https://img.shields.io/badge/C++-2b-red) ![G++](https://img.shields.io/badge/G++-14.2.0-blue) ![NodeJS](https://img.shields.io/badge/NodeJS-22.13.1-green) ![Bun](https://img.shields.io/badge/Bun-1.2.0-green)

## 🚀 About
**Arnelify® POD for NodeJS** - is a BackEnd-framework for creating scalable microservices applications.

## 📋 Minimal Requirements
> Important: It's strongly recommended to use in a container that has been built from the gcc v14.2.0 image.
* CPU: Apple M1 / Intel Core i7 / AMD Ryzen 7
* OS: Debian 11 / MacOS 15 / Windows 10 with <a href="https://learn.microsoft.com/en-us/windows/wsl/install">WSL2</a>.
* RAM: 4 GB

## 📦 Installation
Install to the folder that needs to be created:
```
npx arnelify-pod setup NewProject
```
Go to NewProject folder:
```
cd ./NewProject
```
Create .env:
```
cp ./.env.local ./.env
```
Run container:
```
docker compose up -d --build
docker ps
docker exec -it <CONTAINER ID> bash
```
## 🎉 Usage
Compile & Run production:
```
yarn build && pod/server
```
Run development:
```
yarn watch
```
## 📚 Code Examples
You can find code examples <a href="https://github.com/arnelify/arnelify-pod-node/blob/main/src/routes.ts">here</a>.

## ⚖️ MIT License
This software is licensed under the <a href="https://github.com/arnelify/arnelify-pod-node/blob/main/LICENSE">MIT License</a>. The original author's name, logo, and the original name of the software must be included in all copies or substantial portions of the software.

## 🛠️ Contributing
Join us to help improve this software, fix bugs or implement new functionality. Active participation will help keep the software up-to-date, reliable, and aligned with the needs of its users.


## ⭐ Release Notes
Version 0.6.4 - ORM

We are excited to introduce the Arnelify POD for C++ framework! Please note that this version is raw and still in active development.

Change log:

* Replaced the <a href="https://github.com/v8/v8">Node.js V8</a> engine with <a href="https://github.com/oven-sh/bun">NodeJS Bun</a>.
* Replaced <a href="https://github.com/nodejs/node">node-http</a> with <a href="https://github.com/arnelify/arnelify-server-node">Arnelify Server</a>.
* New <a href="https://github.com/arnelify/arnelify-router-node">Arnelify Router</a>
* New <a href="https://github.com/arnelify/arnelify-broker-node">Arnelify Broker</a>
* New <a href="https://github.com/arnelify/arnelify-orm-node">Arnelify ORM</a>
* Added support for compiling code into a binary executable.
* Significant refactoring and optimizations

Please use this version with caution, as it may contain bugs and unfinished features. We are actively working on improving and expanding the framework's capabilities, and we welcome your feedback and suggestions.

## 🔗 Mentioned

* <a href="https://github.com/arnelify/arnelify-pod-cpp">Arnelify POD for C++</a>
* <a href="https://github.com/arnelify/arnelify-pod-python">Arnelify POD for Python</a>
* <a href="https://github.com/arnelify/arnelify-pod-node">Arnelify POD for NodeJS</a>
* <a href="https://github.com/arnelify/arnelify-react-native">Arnelify React Native</a>