export async function* handleSteamData(response) {
  const utf8Decoder = new TextDecoder("utf-8")
  const reader = response.body.getReader()
  let { value: chunk, done: readerDone } = await reader.read()
  chunk = chunk ? utf8Decoder.decode(chunk) : ""
  const newline = /\r?\n/gm
  let startIndex = 0
  while (true) {
    const result = newline.exec(chunk)
    if (!result) {
      if (readerDone) break
      const remainder = chunk.substr(startIndex);
      ({ value: chunk, done: readerDone } = await reader.read())
      chunk = remainder + (chunk ? utf8Decoder.decode(chunk) : "")
      startIndex = newline.lastIndex = 0
      continue
    }
    yield chunk.substring(startIndex, result.index)
    startIndex = newline.lastIndex
  }
  if (startIndex < chunk.length) {
    // Last line didn't end in a newline char
    yield chunk.substr(startIndex)
  }
}