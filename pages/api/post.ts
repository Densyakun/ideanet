import type { NextApiRequest, NextApiResponse } from 'next'

export type Data = {
  _id: string
  text: string
}[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const skip = parseInt(req.query.skip as string) || 0
  const take = parseInt(req.query.take as string) || 10

  res.status(200).json([...Array(take)].map((value, index) => {
    return {
      _id: (skip + index).toString(),
      text: (skip + index).toString()
    }
  }))
}
