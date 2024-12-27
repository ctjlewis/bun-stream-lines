import { expect, test } from "bun:test"

test("line iterator should iterate as lines are written to stream", async () => {
  const bunLines = 
    Bun
      .$`sleep 1; echo "1"; sleep 1; echo "2"; sleep 1; echo "3";`
      .lines()

  let lastTime = performance.now()
  for await (const line of bunLines) {
    const currentTime = performance.now()
    const delta = currentTime - lastTime
    console.log(`Line: ${line} took ${delta}ms`)
    lastTime = performance.now()
    
    expect(delta).toBeGreaterThan(1_000)
  }
})