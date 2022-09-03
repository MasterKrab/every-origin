const normalizeHeader = (headers: Headers, hasBody?: boolean) => {
  const entries = [...headers.entries()]

  const normalizedHeader: { [key: string]: string } = {}

  entries.forEach(([key, value]) => {
    if (key === 'target-url') return
    if (!hasBody && key.startsWith('content')) return

    normalizedHeader[key] = value
  })
  return normalizedHeader
}

export default normalizeHeader
