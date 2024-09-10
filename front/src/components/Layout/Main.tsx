import { Container } from '@mui/material';


export default function Main({ children }: { children: string | JSX.Element | JSX.Element[] }) {
  return <Container>{children}</Container>;
} 
