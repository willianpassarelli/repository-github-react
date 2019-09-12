import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  svg {
    width: 50px;
    height: 50px;
    color: #fff;
    animation: ${rotate} 2s linear infinite;
  }
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const IssueLabel = styled.span`
  flex: 1;
  background: ${props => `#${props.color}`};
  color: #fff;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 600;
  height: 20px;
  padding: 3px 4px;
  margin-left: 10px;
`;

export const IssueFilter = styled.div`
  display: flex;
  height: 40px;
  padding: 10px 10px;
  background: #f8f8f8;
  border-radius: 4px;
  border: 1px solid #eee;
  margin-bottom: 10px;

  button {
    border: 0;
    outline: 0;
    margin: 0px 5px;
    background: transparent;
    font-size: 14px;
    color: #868686;

    &:nth-child(${props => props.active + 1}) {
      color: #7159c1;
      font-weight: bold;
    }
  }
`;

export const IssuePage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  svg {
    transition: opacity 0.25s ease-out;
    color: #7159c1;
    width: 25px;
    height: 25px;
    margin: 0 10px;
    cursor: pointer;

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.35;
    }
  }

  span {
    font-size: 14px;
    font-weight: 700;
  }
`;
