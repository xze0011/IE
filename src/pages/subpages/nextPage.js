import styled from 'styled-components';
import {Link}  from 'react-router-dom';

export const Wrapper = styled.div`
  background: white;
  height: 80px;
  position: fixed;
  top: 50%;
  left:50%
  transform: translate(-50%,-50%);
`;

export const link = styled(Link)`
    display: block;
    width: 250px;
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    text-decoration: none;
    background: #333;
    text-align: center;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: 3px solid #333;
    transition: all .35s;
    
    &:hover {
        border: 3px solid #2ecc71;
        right: -25%;
        width: 200px;
        background: transparent;
        color: #2ecc71;
      }
`;






