export const MOCK_DELAY = {
  list: 400,
  single: 200,
  mutation: 300,
} as const

export async function mockDelay(ms: number = MOCK_DELAY.list): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}
