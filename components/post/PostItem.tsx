import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

export const PostItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(1),
}))