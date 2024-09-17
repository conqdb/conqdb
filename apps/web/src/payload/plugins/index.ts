import { cachedPayloadPlugin } from './CachedPayload'
import { S3Storage } from './S3Storage'

export const plugins = [cachedPayloadPlugin, S3Storage]
