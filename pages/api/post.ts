import type { NextApiRequest, NextApiResponse } from 'next'

export type Data = {
  _id: string
  text: string
}[]

export const itemsCount = 91

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const skip = Math.max(0, parseInt(req.query.skip as string) || 0)
  const take = parseInt(req.query.take as string) || 10

  res.status(200).json([...Array(Math.max(0, Math.min(take, itemsCount - skip)))].map((value, index) => {
    return {
      _id: (skip + index).toString(),
      text: (skip + index + 1).toString()
    }
  }))
}
