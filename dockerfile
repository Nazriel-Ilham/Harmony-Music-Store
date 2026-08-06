# 1. Base Image Node 20 (Alpine)
FROM node:20-alpine AS builder

WORKDIR /app

# Ambil Environment Variable Supabase
ARG SUPABASE_URL
ARG SUPABASE_KEY
ENV SUPABASE_URL=$SUPABASE_URL
ENV SUPABASE_KEY=$SUPABASE_KEY

# Copy seluruh source code
COPY . .

# Install dependensi menggunakan npm (menghindari isu pnpm store)
RUN npm install --legacy-peer-deps

# Build proyek Nuxt 4
RUN npm run build

# 2. Production Stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copy hasil build
COPY --from=builder /app/.output ./.output

ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]