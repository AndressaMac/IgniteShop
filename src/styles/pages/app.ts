import { styled } from "..";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
})

export const Cart = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '3rem',
  width: '3rem',
  background: '$gray800',
  borderRadius: '6px',

  position: 'relative',
})

export const Items = styled('div', {
  position: 'absolute',
  background: '#1ea483',
  top: '-0.5rem',
  right: '-0.25rem',
  height: '1.25rem',
  width: '1.25rem',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  display: 'flex'
})