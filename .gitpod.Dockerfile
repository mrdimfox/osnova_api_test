FROM gitpod/workspace-full

RUN apt-get update && apt-get install -y --no-install-recommends \
  nodejs \
  npm \
  && rm -rf /var/lib/apt/lists/*