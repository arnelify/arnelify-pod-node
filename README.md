<img src="https://static.wikia.nocookie.net/arnelify/images/c/c8/Arnelify-logo-2024.png/revision/latest?cb=20240701012515" style="width:336px;" alt="Arnelify Logo" />

![Arnelify POD for NodeJS](https://img.shields.io/badge/Arnelify%20POD%20for%20NodeJS-1.0.3-yellow) ![NodeJS](https://img.shields.io/badge/NodeJS-24.13.1-green) ![Bun](https://img.shields.io/badge/Bun-1.3.6-green)

## 🚀 About
**Arnelify® POD for NodeJS** - is a BackEnd-framework with UMQT support.

All supported transports:
| **#** | **Protocol** | **Transport** |
| - | - | - |
| 1 | TCP2 | UMQT |
| 2 | UDP | UMQT |

All supported protocols:
| **#** | **Protocol** | **Transport** |
| - | - | - |
| 1 | TCP2 | WebTransport |
| 2 | TCP2 | HTTP 3.0 |
| 3 | TCP1 | WebSocket |
| 4 | TCP1 | HTTP 2.0 |
| 5 | TCP1 | HTTP 1.1 |

## 📋 Minimal Requirements
> Important: It's strongly recommended to use in a container that has been built from the gcc v15.2.0 image.
* CPU: Apple M1 / Intel Core i7 / AMD Ryzen 7
* OS: Debian 11 / MacOS 15 / Windows 10 with <a href="https://learn.microsoft.com/en-us/windows/wsl/install">WSL2</a>.
* RAM: 4 GB

## 📦 Installation
> Important: At the moment, the installer is supported only by the Bun runtime.

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
You can find code examples <a href="https://github.com/arnelify/arnelify-pod-node/blob/main/src/rpc.ts">here</a>.

## ⚖️ MIT License
This software is licensed under the <a href="https://github.com/arnelify/arnelify-pod-node/blob/main/LICENSE">MIT License</a>. The original author's name, logo, and the original name of the software must be included in all copies or substantial portions of the software.

## 🛠️ Contributing
Join us to help improve this software, fix bugs or implement new functionality. Active participation will help keep the software up-to-date, reliable, and aligned with the needs of its users.


## ⭐ Release Notes
Version 1.0.3 - is a BackEnd-framework with UMQT support.

We are excited to introduce the Arnelify POD for NodeJS framework! Please note that this version is raw and still in active development.

Change log:

* UMQT support.
* HTTP 3.0 + WebTransport.
* Security-aware logging with attack detection.
* Compiling code into a binary executable.
* Compatible with Bun and V8.
* Significant refactoring and optimizations.

Please use this version with caution, as it may contain bugs and unfinished features. We are actively working on improving and expanding the framework's capabilities, and we welcome your feedback and suggestions.

## 🔗 Links

* <a href="https://github.com/arnelify/arnelify-pod-cpp">Arnelify POD for C++</a>
* <a href="https://github.com/arnelify/arnelify-pod-node">Arnelify POD for NodeJS</a>
* <a href="https://github.com/arnelify/arnelify-pod-python">Arnelify POD for Python</a>
* <a href="https://github.com/arnelify/arnelify-pod-rust">Arnelify POD for Rust</a>
* <a href="https://github.com/arnelify/arnelify-react-native">Arnelify React Native</a>