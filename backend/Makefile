# Variables
DOCKER_COMPOSE = docker-compose
ENV_FILE = .env

# Commandes principales
.PHONY: build up down restart logs clean prune

## Tout
make: clean build up

## Construire tous les conteneurs
build:
	@echo "🔧 Construction des services Docker..."
	$(DOCKER_COMPOSE) --env-file $(ENV_FILE) build

## Lancer tous les conteneurs en arrière-plan
up:
	@echo "🚀 Lancement des services..."
	$(DOCKER_COMPOSE) --env-file $(ENV_FILE) up -d

## Arrêter tous les conteneurs
down:
	@echo "🛑 Arrêt des services..."
	$(DOCKER_COMPOSE) --env-file $(ENV_FILE) down

## Redémarrer les services
restart: down up

## Afficher les logs
logs:
	@echo "📜 Logs des services..."
	$(DOCKER_COMPOSE) --env-file $(ENV_FILE) logs -f

## Nettoyer les images/conteneurs non utilisés, sauf db et pgadmin
clean:
	@echo "🧹 Nettoyage des conteneurs, images et volumes (sauf db et pgadmin)..."
	$(DOCKER_COMPOSE) --env-file $(ENV_FILE) stop lootopia location eureka gateway
	$(DOCKER_COMPOSE) --env-file $(ENV_FILE) rm -f lootopia location eureka gateway

## Afficher l'aide
help:
	@echo "🔧 Makefile pour la gestion des conteneurs Docker"
	@echo "Utilisation : make [cible]"
	@echo ""
	@echo "Cibles disponibles :"
	@echo "  build   : Construire tous les conteneurs"
	@echo "  up      : Lancer tous les conteneurs en arrière-plan"
	@echo "  down    : Arrêter tous les conteneurs"
	@echo "  restart  : Redémarrer les services"
	@echo "  logs    : Afficher les logs des services"
	@echo "  clean   : Nettoyer les images/conteneurs non utilisés, sauf db et pgadmin"
	@echo "  prune   : Supprimer toutes les images et volumes non utilisés"
	@echo "  help    : Afficher cette aide"
	@echo ""