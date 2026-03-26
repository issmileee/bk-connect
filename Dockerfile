# Build stage with optimal caching
FROM node:20-alpine AS builder

WORKDIR /app

# Install build-time dependencies for Prisma
RUN apk add --no-cache python3 py3-setuptools make g++

# Copy package manifests first for better layer caching
COPY package*.json package-lock.json ./
COPY prisma ./prisma
RUN npm config set fetch-timeout 600000 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set fetch-retries 5 && \
    npm ci

# Copy application source
COPY . .

# Generate Prisma Client and build Next.js application
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production stage - minimal image
FROM node:20-alpine AS runner
WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache tini

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nextjs
USER nextjs

# Copy only necessary files from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/tsconfig.json ./

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

# Start command with Prisma migration deployment
CMD ["tini", "--", "sh", "-c", "npx prisma db push --accept-data-loss && npm start"]