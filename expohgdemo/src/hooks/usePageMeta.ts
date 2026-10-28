import { useEffect } from 'react'
import { applyPageMeta, type PageMetaInput } from '../lib/pageMeta'

export function usePageMeta(meta: PageMetaInput) {
  const { title, description, path, image, noIndex } = meta

  useEffect(() => {
    applyPageMeta({ title, description, path, image, noIndex })
  }, [title, description, path, image, noIndex])
}
