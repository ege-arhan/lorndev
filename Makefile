redeploy:
	docker compose down
	docker image prune -af
	docker compose up -d lorndev-prod