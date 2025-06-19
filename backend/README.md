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

Dans le dossier `backend`, copiez le fichier `.env.example` et renommez-le en `.env`, puis remplissez les champs nécessaires :

Exemple (`.env.example`) :

```env
# Ports
GATEWAY_PORT=8080
LOOTOPIA_PORT=8081
PAYMENT_PORT=8082
LOCATION_PORT=8083
EUREKA_PORT=8088

# Frontend
SERVER_FRONTEND_URL=http://localhost:4200

# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/lootopia_db
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres

# Hibernate
SPRING_JPA_HIBERNATE_DDL_AUTO=update

# PgAdmin
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=admin

# JWT
LOOTOPIA_JWT_SECRET=your_secret_key

# Mail
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=your_email@example.com
MAIL_PASSWORD=your_email_password
```

**Note importante pour l'utilisation d'une bdd locale** :  
👉 Pour `SPRING_DATASOURCE_URL`, utilisez `db` comme nom d'hôte, car tous les services communiquent via le **network Docker lootopia-network**.

---

### 3️⃣ Lancer les conteneurs Docker

Compilez et lancez tous les services :

```bash
make
```

---

### 4️⃣ (Optionnel) Accéder aux logs

Pour suivre les logs en temps réel :

```bash
make logs
```

---

## 📡 Points d'accès

- **Eureka Dashboard** : [http://localhost:8088](http://localhost:8088)
- **API Gateway (entry point)** : [http://localhost:8080](http://localhost:8080)
- **Lootopia via Gateway** : [http://localhost:8080/lootopia/api](http://localhost:8080/lootopia/api)
- **Payment service via Gateway** : [http://localhost:8080/paymentserv/api](http://localhost:8080/paymentserv/api)
- **Location service via Gateway** : [http://localhost:8080/locationserv/api](http://localhost:8080/locationserv/api)
- **PgAdmin** : [http://localhost:8888](http://localhost:8888)

- **Swagger UI** : [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

---

## 🧪 Exemples d'Endpoints de test

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

## ⚙️ Informations supplémentaires sur Docker

- Tous les services utilisent le réseau personnalisé **lootopia-network** pour faciliter la communication.
- Les conteneurs principaux sont :
  - `local_pgdb_lootopia` (PostgreSQL)
  - `pgadmin4_container_lootopia` (PgAdmin)
  - `eureka` (Service Discovery)
  - `lootopia` (Service principal)
  - `location` (Service de localisation)
  - `payment` (Service de paiement)
  - `gateway` (API Gateway)

---

## 🧹 Commandes Makefile utiles

| Commande       | Description                                       |
| -------------- | ------------------------------------------------- |
| `make build`   | Construire les images Docker                      |
| `make up`      | Lancer tous les conteneurs                        |
| `make down`    | Arrêter tous les conteneurs                       |
| `make restart` | Redémarrer tous les services                      |
| `make logs`    | Afficher les logs des services                    |
| `make clean`   | Nettoyer les services (sans toucher db / pgadmin) |
| `make prune`   | Nettoyer toutes les images et volumes inutilisés  |

---

## 📜 Notes

- Assurez-vous que les ports 5432 (si bdd locale), 8080, 8081, 8082, 8083, 8088 et 8888 sont libres sur votre machine avant de démarrer.
- `PgAdmin` sera disponible sur [http://localhost:8888](http://localhost:8888) — connectez-vous avec les credentials définis dans `.env`.

---
