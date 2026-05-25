# --- STAGE 1: Base ---
FROM node:22-alpine AS base

# Install libc6-compat for compatibility with some native Node modules inside Alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# --- STAGE 2: Development ---
# Build target for development: docker build --target develop -t frontend:dev .
FROM base AS develop
ENV NODE_ENV=development

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Run next dev with hot-reloading
CMD ["npm", "run", "dev"]


# --- STAGE 3: Production Builder ---
FROM base AS builder
ENV NODE_ENV=production

# Install dependencies (including devDependencies needed for build)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the source code and build
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build


# --- STAGE 4: Production Runner ---
# Build target for production: docker build --target production -t frontend:prod .
FROM base AS production
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy static public assets (logos, icons, etc.)
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache (essential for on-demand ISR)
RUN mkdir .next && chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size (Next.js Standalone mode)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
