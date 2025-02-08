.PHONY: build up down clean rebuild

# Docker Compose のファイル名
DOCKER_COMPOSE_FILE := compose.yml

# サービスの起動（バックグラウンド実行）
up:
	docker compose -f $(DOCKER_COMPOSE_FILE) up -d
# サービスの停止
down:
	docker compose -f $(DOCKER_COMPOSE_FILE) down

# ビルド
build:
	docker compose -f $(DOCKER_COMPOSE_FILE) build

# キャッシュを無効化して再ビルド
rebuild:
	docker compose -f $(DOCKER_COMPOSE_FILE) build --no-cache

# ボリュームを含めて完全に停止
clean:
	docker compose -f $(DOCKER_COMPOSE_FILE) down -v