# Lootopia Project

## 📌 Description

Lootopia est une application Java moderne conçue autour d'une architecture microservices à l'aide de **Spring Boot**, **Eureka** (Service Discovery), **API Gateway**, et **Docker**.  
Elle intègre une base de données **PostgreSQL**, un outil d’administration de base via **PgAdmin**, ainsi qu'un système d'authentification basé sur **JWT**.

---

## 🛠️ Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- [Git](https://git-scm.com/)
- [Docker & Docker Compose](https://www.docker.com/)
- [Java 21](https://jdk.java.net/21/)
- [Maven](https://maven.apache.org/)

---

## 🚀 Installation

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/LePariisien/lootopia-project.git
cd lootopia-project/backend
```

---

### 2️⃣ Configuration des variables d'environnement

Dans le dossier `src/main/resources` de chaque service, copiez le fichier `.env.example` et renommez-le en `.env`, puis remplissez les champs nécessaires :

Exemple (`.env.example`) :

```env
# Ports
GATEWAY_PORT=8080
LOOTOPIA_PORT=8081
EUREKA_PORT=8088

# Frontend
SERVER_FRONTEND_URL=http://localhost:3000
LOOTOPIA_SERVICE_URL=http://localhost:8080/lootopia/api

# Database
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=

SPRING_JPA_HIBERNATE_DDL_AUTO=update

# PgAdmin
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=

# JWT
LOOTOPIA_JWT_SECRET=

# MAIL
MAIL_HOST=
MAIL_PORT=
MAIL_USERNAME=
MAIL_PASSWORD=
```

---

### 3️⃣ Lancer les conteneurs Docker

Démarrez les services de base (PostgreSQL, PgAdmin, etc.) via Docker :

```bash
docker-compose up -d
```

---

### 4️⃣ Lancer les microservices

Dans différents terminaux, lancez les services un par un depuis le dossier `backend` :

#### Eureka Server

```bash
cd eureka
mvn spring-boot:run
```

#### Gateway

```bash
cd gateway
mvn spring-boot:run
```

#### Lootopia Service

```bash
cd lootopia
mvn spring-boot:run
```

---

## 📡 Points d'accès

- **Eureka Dashboard** : [http://localhost:8088](http://localhost:8088)
- **API Gateway (entry point)** : [http://localhost:8080](http://localhost:8080)
- **Lootopia via Gateway** : [http://localhost:8080/lootopia/api](http://localhost:8080/lootopia/api)
- **PgAdmin** : [http://localhost:8888](http://localhost:8888)

- **Swagger UI Lootopia** : [http://localhost:8081/swagger-ui/index.html](http://localhost:8081/swagger-ui/index.html)

---

## 🧪 Endpoints de test

Par exemple :

```http
GET http://localhost:8080/lootopia/api/test/all
```

---

## 🧰 Technologies utilisées

- Spring Boot
- Spring Cloud Gateway
- Spring Cloud Eureka
- PostgreSQL
- Docker / Docker Compose
- Java 21
- Maven
- JWT (authentification)
- Mail (SMTP)

---
